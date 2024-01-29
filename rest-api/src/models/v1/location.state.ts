import mongoose from 'mongoose';

interface StateAttr {
  id: string;
  name: string;
}

type StateDoc = StateAttr | mongoose.Document;
interface StateModel extends mongoose.Model<StateDoc> {
  build(attrs: StateAttr): StateDoc;
}

const stateSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
});

stateSchema.statics.build = (attrs: StateAttr) => {
  return new State(attrs);
};

const State = mongoose.model<StateDoc, StateModel>('State', stateSchema);

export { State };
