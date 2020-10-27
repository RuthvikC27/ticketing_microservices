import express, { Request, Response } from 'express';
import { requireAuth, currentUser } from '@rc27tickets/common';

const router = express.Router();

router.post("/api/tickets", currentUser, requireAuth, (req: Request, res: Response) => {
  res.status(201).send({});
})

export { router as createTicketRouter }