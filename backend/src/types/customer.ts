import type { Document } from 'mongoose';

interface ICustomer extends Document {
  email: string;
  firstName: string;
  lastName: string;
  launchs: Array<{
    dices: number[],
    pastries: number,
    gain: Array<string>
  }>;
}

export type {
  ICustomer
}