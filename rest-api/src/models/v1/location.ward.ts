import mongoose from 'mongoose';

interface WardAttr {
  id: string;
  lga_id: string;
  state_id: string;
  name: string;
}

type WardDoc = WardAttr | mongoose.Document;
interface WardModel extends mongoose.Model<WardDoc> {
  build(attrs: WardAttr): WardDoc;
}

const wardSchema = new mongoose.Schema({
  id: { type: String, required: true },
  lga_id: { type: String, required: true },
  state_id: { type: String, required: true },
  name: { type: String, required: true },
});

wardSchema.statics.build = (attrs: WardAttr) => {
  return new Ward(attrs);
};

const Ward = mongoose.model<WardDoc, WardModel>('Ward', wardSchema);

export { Ward };
