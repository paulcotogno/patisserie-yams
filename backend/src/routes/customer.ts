import { Router, Request, Response } from 'express';
import { Customer } from '../models';
import { authenticateToken } from '../middleware/auth';
import type { CustomerType } from '../types';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName } = req.body as CustomerType;

    let customer = await Customer.findOne({ email });
    if (customer) {
      return res.status(400).json({ message: 'Ce client existe déjà.' });
    }
    customer = new Customer({ email, firstName, lastName });
    await customer.save();

    const token = jwt.sign({ customerId: customer._id }, process.env.JWT_SECRET as string);
    res.status(201).json({ message: 'Client enregistré avec succès.', token });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

router.get('/me', authenticateToken, async (req: Request, res: Response) => {
  try {
    const customerId = req.body.customerId;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    res.json(customer);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

router.get('/getRewardCustomer', async (req: Request, res: Response) => {
  try {
    const email = req.query.email;

    if(!email) return res.status(402).json({ message: 'Email non renseigné' });

    const customer = await Customer.findOne({email: email});

    if(!customer) return res.status(404).json({ message: 'User not found' });

    res.json(customer)
  } catch (err: any) {
    console.log(err);
    res.status(500).send('Server error')
  }
})

export default router;