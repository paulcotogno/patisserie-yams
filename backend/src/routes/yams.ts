import { Router, Request, Response } from 'express';
import { Customer, Pastry } from '../models';
import { authenticateToken } from '../middleware/auth';
import { launchDices, bestCombination } from '../utils/Yams';

const router = Router();

function getRandomElements<T>(arr: T[], numElements: number): T[] {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numElements);
}

router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const customerId = req.body.customerId;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if(customer.launches.length > 2) {
      return res.status(400).json({ message: 'You have already played 3 times.' });
    }

    if(customer.launches.filter((launch) => launch.pastries > 0).length > 0) {
      return res.status(400).json({ message: 'You have already won' });
    }

    const dices = launchDices();
    const pastries = bestCombination(dices)

    const pastriesWithQuantity = await Pastry.find({ quantityLeft: { $gt: 0 } });

    const randomPastries = getRandomElements(pastriesWithQuantity, pastries);

    const launch: {
      dices: number[],
      pastries: number,
      gain: string[]
    } = { dices: dices, pastries: pastries, gain: [] }

    for (const pastry of randomPastries) {
      launch.gain.push(pastry.name);
      pastry.quantityLeft -= 1;
      await pastry.save();
    }

    customer.launches.push(launch);
    await customer.save();
    
    res.json(launch);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;