import { Router, Request, Response } from 'express';
import { Pastry } from '../models';

const router = Router();

router.get('/list', async (req: Request, res: Response) => {
  try {
    const pastries = await Pastry.find();
    if (!pastries) {
      return res.status(404).json({ pastries: 'Aucune patisserie.' });
    }
    res.json(pastries);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

export default router;