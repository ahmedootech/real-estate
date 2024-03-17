import mongoose from 'mongoose';
import { transformDocument } from '../../services/mongoose-utils';
import { InspectionStatus } from '../../common/types';

interface InspectionAttr {
  property: string;
  date: Date;
  time: string;
  message: string;
  agent: string;
  prospect: string;
  status?: string;
}

interface InspectionDoc extends InspectionAttr, mongoose.Document {}
interface InspectionModel extends mongoose.Model<InspectionDoc> {
  build(attrs: InspectionAttr): InspectionDoc;
}

const inspectionSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    message: { type: String },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
      required: true,
    },
    prospect: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      default: InspectionStatus['Not Visited'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        transformDocument(ret);
      },
    },
  }
);

inspectionSchema.pre('find', function () {
  this.populate({
    path: 'property',
    select: 'address title',
    populate: [
      { path: 'address.state', model: 'State' },
      { path: 'address.lga', model: 'Lga' },
      { path: 'address.ward', model: 'Ward' },
      { path: 'address.area', model: 'Area' },
    ],
  });
});

inspectionSchema.statics.build = (attrs: InspectionAttr) => {
  return new Inspection(attrs);
};

const Inspection = mongoose.model<InspectionDoc, InspectionModel>(
  'Inspection',
  inspectionSchema
);

export { Inspection };
