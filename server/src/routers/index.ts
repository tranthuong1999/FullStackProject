// import { registerRoomModelName } from '../models/RegisterRoom';
import { Router } from 'express';
import authRouter from './auth.router';
import userRouter from './user.router';
import customerRouter from './customer.router';
import roomRouter from './room.router';
import accountRouter from './account.router';
import registerRoomRouter from './registerRoom.router';
import hotelRouter from './hotel.router';
import serviceRouter from './service.router';
import transactionRouter from './transaction.router';


const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);

router.use('/customer', customerRouter);
router.use('/account' , accountRouter)
router.use('/registerroom' , registerRoomRouter)
router.use('/room' , roomRouter)
router.use('/hotel' ,hotelRouter )
router.use('/service' , serviceRouter)
router.use('/transaction' ,transactionRouter)


export default router;