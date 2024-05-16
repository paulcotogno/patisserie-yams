import { Schema, model } from 'mongoose';
import { ICustomer } from '../types';

const customerSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  launchs: {
    type: Array,
    required: true,
    default: []
  }
});

const Customer = model<ICustomer>('Customer', customerSchema);

export default Customer;
