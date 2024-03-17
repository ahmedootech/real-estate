import mongoose from 'mongoose';
import { transformDocument } from '../../services/mongoose-utils';

interface CategoryAttr {
  name: string;
  description?: string;
}

interface CategoryDoc extends CategoryAttr, mongoose.Document {}
interface CategoryModel extends mongoose.Model<CategoryDoc> {
  build(attrs: CategoryAttr): CategoryDoc;
}

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
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

categorySchema.statics.build = (attrs: CategoryAttr) => {
  return new Category(attrs);
};

const Category = mongoose.model<CategoryDoc, CategoryModel>(
  'Category',
  categorySchema
);

export { Category };
