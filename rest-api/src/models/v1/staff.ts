import mongoose from 'mongoose';
import { transformDocument } from '../../services/mongoose-utils';
import { PasswordManager } from '../../services/password-manager';

export interface StaffAttrs {
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  address: string;
  role: string;
  username: string;
  password: string;
  status?: string;
  type?: string;
  jwt?: string;
}
interface StaffDoc extends StaffAttrs, mongoose.Document {}

interface StaffModel extends mongoose.Model<StaffDoc> {
  build(attrs: StaffAttrs): StaffDoc;
}

const staffSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Neutral'],
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'Staff',
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    type: {
      type: String,
      enum: ['Default', 'Custom'],
      default: 'Custom',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        transformDocument(ret);
      },
    },
  }
);

staffSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await PasswordManager.toHash(this.get('password'));
    this.set('password', hashedPassword);
  }
  done();
});
staffSchema.statics.build = (attrs: StaffAttrs) => {
  return new Staff(attrs);
};

const Staff = mongoose.model<StaffDoc, StaffModel>('Staff', staffSchema);

export { Staff };
