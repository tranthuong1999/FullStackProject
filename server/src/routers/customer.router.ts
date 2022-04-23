import { Router } from 'express';
import Customer from '../../../models/Customer';
import { InvalidParamsError } from '../common/error';
import { successResponse } from '../common/responses';
import { verifyRefreshTokenMiddleware, verifyTokenMiddleware } from '../middlewares/authMiddlewares';
import asyncHandler from '../utils/asyncHandler';
import CustomerService from '../services/customer.service';

const customerRouter = Router();

//get list
customerRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const dataRes =  await CustomerService.get({})
    return res.json(dataRes)
  })
);

//create Customer
customerRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const {name ,address ,cccd ,email ,sdt ,isMale } = req.body;
    if (!name || !address || !cccd || !email || !sdt   || !isMale ) throw new InvalidParamsError();
    const dataRes =  await  CustomerService.create({name ,address ,cccd ,email ,sdt ,isMale})
    return res.json(dataRes)

  })
);

//update Customer
customerRouter.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const {id} =  req.params;
    const resBody: Customer = req.body
    console.log('Id',id);
    const data =  await CustomerService.update({id: id, update:resBody})
    return res.json(data)
  })
);

//delete Customer
customerRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const {id} =  req.params;
    const resBody: Customer = req.body
    const data = await CustomerService.delete({id: id, update: req.body})
    return res.status(200).json("delete success")
  })
);

export default customerRouter;