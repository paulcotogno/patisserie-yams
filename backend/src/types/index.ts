export interface CustomerType extends Document {
  email: string;
  firstName: string;
  lastName: string;
  launches: Array<{
    dices: number[],
    pastries: number,
    gain: Array<string>
  }>;
}

export interface PastryType extends Document {
  name: string;
  image: string;
  stock: number;
  quantityLeft: number;
}