import { Router } from 'express';
import Hotel from '../../../models/Hotel';
import { InvalidParamsError } from '../common/error';
import { successResponse } from '../common/responses';
import { verifyRefreshTokenMiddleware, verifyTokenMiddleware } from '../middlewares/authMiddlewares';
import hotelService from '../services/hotel.service';
import asyncHandler from '../utils/asyncHandler';

const hotelRouter = Router();

//get list
hotelRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const dataRes =  await hotelService.get({})
    return res.json(dataRes)
  })
);

//create hotel
hotelRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const { image , codeHotel, nameHotel , address, introduce ,title} = req.body;
    console.log("create hotel ")
    if (!image || !codeHotel || !nameHotel || !address || !introduce || !title ) throw new InvalidParamsError();
    const dataRes =  await  hotelService.create({ image , codeHotel, nameHotel , address, introduce ,title})
    return res.json(dataRes)
  })
);

//update hotel
hotelRouter.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const {id} =  req.params;
    const resBody: Hotel = req.body
    console.log('Id',id);
    const data =  await hotelService.update({id: id, update:resBody})
    return res.json(data)
  })
);

//delete hotel
hotelRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const {id} =  req.params;
    const resBody: Hotel = req.body
    const data = await hotelService.delete({id: id, update: req.body})
    return res.status(200).json("delete success")
  })
);

export default hotelRouter;