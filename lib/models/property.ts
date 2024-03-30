import { Document } from "mongodb";
import { Schema, model, models } from "mongoose";
export interface IProperty extends Document {
  name: string;
  type: string;
  description?: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode?: string;
  };
  surface: number;
  beds: number;
  baths: number;
  amenities: string[];
  rates: {
    nightly?: number;
    weekly?: number;
    monthly?: number;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images: File[];
  is_featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const PropertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipcode: {
        type: String,
      },
    },
    surface: {
      type: Number,
      required: true,
    },
    beds: {
      type: Number,
      required: true,
    },
    baths: {
      type: Number,
      required: true,
    },
    amenities: [{ type: String }],
    rates: {
      nightly: {
        type: Number,
      },
      weekly: {
        type: Number,
      },
      monthly: {
        type: Number,
      },
    },
    seller_info: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    images: [{ type: String }],
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Property = models.Property || model("Property", PropertySchema);
export default Property;
