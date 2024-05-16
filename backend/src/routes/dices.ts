import { Router, Request, Response } from 'express';
import { Customer, Pastry } from '../models';
import { authenticateToken } from '../middleware/auth';
import { launchDices, bestCombination } from '../utils/dices';
import { getRandomElements } from '../utils';

const router = Router();

router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const customer = await Customer.findById(userId);
    if (!customer) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    if(customer.launchs.length > 2) {
      return res.status(400).json({ message: 'Vous avez déjà joué 3 fois.' });
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

    customer.launchs.push(launch);
    await customer.save();
    
    res.json(launch);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

export default router;