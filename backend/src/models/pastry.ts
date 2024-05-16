import { Schema, model } from 'mongoose';
import { PastryType } from '../types';

const pastrySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  quantityLeft: {
    type: Number,
    required: true
  }
});

const Pastry = model<PastryType>('Pastry', pastrySchema);

export default Pastry;
