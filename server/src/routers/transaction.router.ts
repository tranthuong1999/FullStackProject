import { Router } from 'express';
import Transaction from '../../../models/Transaction';
import { InvalidParamsError } from '../common/error';
import { successResponse } from '../common/responses';
import { verifyRefreshTokenMiddleware, verifyTokenMiddleware } from '../middlewares/authMiddlewares';
import transactionService from '../services/transaction.service';
import asyncHandler from '../utils/asyncHandler';

const transactionRouter = Router();

//get list
transactionRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const dataRes =  await transactionService.get({})
    return res.json(dataRes)
  })
);

//create transaction
transactionRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const { idRegisterRoom , idAccount ,idService , quantity ,byTime} = req.body;
    if (!idRegisterRoom || !idAccount || !idService || !quantity || !byTime ) throw new InvalidParamsError();
    const dataRes =  await  transactionService.create({  idRegisterRoom , idAccount ,idService , quantity ,byTime})
    return res.json(dataRes)
  })
);

//update transaction
transactionRouter.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const {id} =  req.params;
    const resBody: Transaction = req.body
    console.log('Id',id);
    const data =  await transactionService.update({id: id, update:resBody})
    return res.json(data)
  })
);

//delete transaction
transactionRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const {id} =  req.params;
    const resBody: Transaction = req.body
    const data = await transactionService.delete({id: id, update: req.body})
    return res.status(200).json("delete success")
  })
);

export default transactionRouter;