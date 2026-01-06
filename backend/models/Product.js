import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      sparse: true
    },
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String
    },
    category: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      enum: ['men', 'women', 'unisex'],
      default: 'unisex'
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
