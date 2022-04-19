import { Router } from 'express';
import { InvalidParamsError } from '../common/error';
import { successResponse } from '../common/responses';
import { verifyRefreshTokenMiddleware, verifyTokenMiddleware } from '../middlewares/authMiddlewares';
import customerService from '../services/customer.service';
import asyncHandler from '../utils/asyncHandler';

const customerRouter = Router();

//create customer
customerRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, email, address, cccd } = req.body;
    if (!name || !email || !address || !cccd ) throw new InvalidParamsError();
    return await customerService.create({ name, email, address, cccd})
  })
);

//update customer
customerRouter.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const {id} =  req.params;
    console.log('Id',id);
    return await customerService.update({id: id, update: req.body})
  })
);

export default customerRouter;
