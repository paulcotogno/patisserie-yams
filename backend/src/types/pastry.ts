import type { Document } from 'mongoose';

interface IPastry extends Document {
  name: string;
  image: string;
  stock: number;
  quantityLeft: number;
}

export type {
  IPastry
}