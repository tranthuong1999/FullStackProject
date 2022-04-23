import { Router } from 'express';
import Room from '../../../models/Room';
import { InvalidParamsError } from '../common/error';
import { successResponse } from '../common/responses';
import { verifyRefreshTokenMiddleware, verifyTokenMiddleware } from '../middlewares/authMiddlewares';
import roomService from '../services/room.service';
import asyncHandler from '../utils/asyncHandler';

const roomRouter = Router();

//get list
roomRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const dataRes =  await roomService.get({})
    return res.json(dataRes)
  })
);

//create account
roomRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, idLocation , isStatus , price , idHotel } = req.body;
    if (!name || !idLocation || !isStatus || !price || !idHotel ) throw new InvalidParamsError();
    const dataRes =  await  roomService.create({ name, idLocation , isStatus , price , idHotel})
    return res.json(dataRes)
  })
);

//update account
roomRouter.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const {id} =  req.params;
    const resBody: Room = req.body
    console.log('Id',id);
    const data =  await roomService.update({id: id, update:resBody})
    return res.json(data)
  })
);

//delete account
roomRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const {id} =  req.params;
    const resBody: Room = req.body
    const data = await roomService.delete({id: id, update: req.body})
    return res.status(200).json("delete success")
  })
);

export default roomRouter;