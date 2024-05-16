import { Schema, model } from 'mongoose';
import { CustomerType } from '../types';

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
  launches: {
    type: Array,
    required: true,
    default: []
  }
});

const Customer = model<CustomerType>('Customer', customerSchema);

export default Customer;
