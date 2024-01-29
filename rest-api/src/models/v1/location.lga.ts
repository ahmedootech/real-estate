import mongoose from 'mongoose';

interface LgaAttr {
  id: string;
  state_id: string;
  name: string;
}

type LgaDoc = LgaAttr | mongoose.Document;
interface LgaModel extends mongoose.Model<LgaDoc> {
  build(attrs: LgaAttr): LgaDoc;
}

const lgaSchema = new mongoose.Schema({
  id: { type: String, required: true },
  state_id: { type: String, required: true },
  name: { type: String, required: true },
});

lgaSchema.statics.build = (attrs: LgaAttr) => {
  return new Lga(attrs);
};

const Lga = mongoose.model<LgaDoc, LgaModel>('Lga', lgaSchema);

export { Lga };
