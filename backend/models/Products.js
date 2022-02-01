const { Schema, model } = require("mongoose")

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'please enter product name']
  },
  description: {
    type: String,
    required: [true, 'please enter description']
  },
  price: {
    type: Number,
    required: [true, 'please enter price'],
    maxlength: [8, 'Price cannot exceed 8 figures']
  },
  rating: {
    type: Number,
    default: 0
  },
  images: [{
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
  }],
  category: {
    type: String,
    required: [true, 'please enter category'],
  },
  stock: {
    type: Number,
    required: [true, 'please mention stock'],
    maxlength: [4, 'stock cannot exceed 4 figures'],
    default: 1,
  },
  reviews: [
    {
      user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true
      },
      name: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        require: true
      },
      comments: {
        type: String,
        required: true
      },
    },

  ],
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  noOfReviews: {
    type: Number,
    default: 0,
  }
})

module.exports = model('products', ProductSchema);