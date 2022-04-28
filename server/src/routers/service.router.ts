import { Router } from 'express';
import Service from '../../../models/Service';
import { InvalidParamsError } from '../common/error';
import { successResponse } from '../common/responses';
import { verifyRefreshTokenMiddleware, verifyTokenMiddleware } from '../middlewares/authMiddlewares';
import serviceService from '../services/service.service';
import asyncHandler from '../utils/asyncHandler';

const serviceRouter = Router();

//get list
serviceRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const dataRes =  await serviceService.get({})
    return res.json(dataRes)
  })
);

//create service
serviceRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, price} = req.body;
    if (!name || !price  ) throw new InvalidParamsError();
    const dataRes =  await  serviceService.create({ name, price})
    return res.json(dataRes)
  })
);

//update service
serviceRouter.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const {id} =  req.params;
    const resBody: Service = req.body
    console.log('Id',id);
    const data =  await serviceService.update({id: id, update:resBody})
    return res.json(data)
  })
);

//delete service
serviceRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const {id} =  req.params;
    const resBody: Service = req.body
    const data = await serviceService.delete({id: id, update: req.body})
    return res.status(200).json("delete success")
  })
);

export default serviceRouter;