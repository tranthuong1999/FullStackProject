import { Router } from 'express';
import authRouter from './auth.router';
import userRouter from './user.router';
import customerRouter from './customer.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/customer', customerRouter);

export default router;