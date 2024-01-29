import mongoose from 'mongoose';

interface AreaAttr {
  id: string;
  ward_id: string;
  name: string;
}

type AreaDoc = AreaAttr | mongoose.Document;
interface AreaModel extends mongoose.Model<AreaDoc> {
  build(attrs: AreaAttr): AreaDoc;
}

const areaSchema = new mongoose.Schema({
  id: { type: String, required: true },
  ward_id: { type: String, required: true },
  name: { type: String, required: true },
});

areaSchema.statics.build = (attrs: AreaAttr) => {
  return new Area(attrs);
};

const Area = mongoose.model<AreaDoc, AreaModel>('Area', areaSchema);

export { Area };
