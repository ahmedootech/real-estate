import mongoose from 'mongoose';
import { transformDocument } from '../../services/mongoose-utils';

interface PropertyAttr {
  title: string;
  description: string;
  price: number;
  address: {
    state: string;
    lga: string;
    ward: string;
    area: string;
    houseNoStreet: string;
  };
  bedrooms: number;
  toilets: number;
  sittingRooms: number;
  agent: string;
}

interface PropertyDoc extends PropertyAttr, mongoose.Document {}

interface PropertyModel extends mongoose.Model<PropertyDoc> {
  build(attrs: PropertyAttr): PropertyDoc;
}

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    address: {
      state: {
        type: String,
        required: true,
      },
      lga: {
        type: String,
        required: true,
      },
      ward: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
      houseNoStreet: {
        type: String,
        required: true,
      },
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    toilets: {
      type: Number,
      required: true,
    },
    sittingRooms: {
      type: Number,
      required: true,
    },
    agent: {
      type: String,
      ref: 'Staff',
      required: true,
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

propertySchema.statics.build = (attrs: PropertyAttr) => {
  return new Property(attrs);
};

const Property = mongoose.model<PropertyDoc, PropertyModel>(
  'Property',
  propertySchema
);

export { Property };
