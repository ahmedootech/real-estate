import mongoose from 'mongoose';
import { transformDocument } from '../../services/mongoose-utils';

interface PropertyAttr {
  title: string;
  description: string;
  category: string;
  type: string;
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
  imageURLs?: { path: string }[];
  arModelUrl?: { path: string };
  neighborhood?: {
    overview: string;
    amenities: {
      parks: string;
      schools: string;
      shopping: string;
      restaurants: string;
      entertainment: string;
    };
    transportation: {
      publicTransit: string;
      majorHighways: string[];
    };
    safety: {
      crimeRate: string;
      policeStations: string;
      fireStations: string;
    };
  };
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
    category: {
      type: String,
      required: true,
      ref: 'Category',
    },
    type: {
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
        ref: 'State',
      },
      lga: {
        type: String,
        required: true,
        ref: 'Lga',
      },
      ward: {
        type: String,
        required: true,
        ref: 'Ward',
      },
      area: {
        type: String,
        required: true,
        ref: 'Area',
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
    status: {
      type: String,
      default: 'Available',
    },
    neighborhood: {
      overview: {
        type: String,
      },
      amenities: {
        parks: String,
        schools: String,
        shopping: String,
        restaurants: String,
        entertainment: String,
      },
      transportation: {
        publicTransit: String,
        majorHighways: String,
      },
      safety: {
        crimeRate: String,
        policeStations: String,
        fireStations: String,
      },
    },
    imageURLs: [{ path: String }],
    arModelUrl: { path: String },
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
