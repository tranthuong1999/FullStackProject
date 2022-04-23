import { Router } from 'express';
import RegisterRoom from '../../../models/RegisterRoom';
import { InvalidParamsError } from '../common/error';
import { successResponse } from '../common/responses';
import { verifyRefreshTokenMiddleware, verifyTokenMiddleware } from '../middlewares/authMiddlewares';
import registerRoomService from '../services/registerRoom.service';
import asyncHandler from '../utils/asyncHandler';

const registerRoomRouter = Router();

//get list
registerRoomRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const dataRes =  await registerRoomService.get({})
    return res.json(dataRes)
  })
);

//create registerroom

registerRoomRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const { idClient, idRoom ,idAccount ,status,start,end, total , pay } = req.body;
    if (!idClient || !idRoom || !idAccount || !status || !start   || !end || !total || !pay ) throw new InvalidParamsError();
    const dataRes =  await  registerRoomService.create({idClient, idRoom ,idAccount ,status,start,end, total , pay})
    return res.json(dataRes)
  })
);

//update registerroom
registerRoomRouter.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const {id} =  req.params;
    const resBody: RegisterRoom = req.body
    console.log('Id',id);
    const data =  await registerRoomService.update({id: id, update:resBody})
    return res.json(data)
  })
);

//delete registerroom
registerRoomRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const {id} =  req.params;
    const resBody: RegisterRoom = req.body
    const data = await registerRoomService.delete({id: id, update: req.body})
    return res.status(200).json("delete success")
  })
);

export default registerRoomRouter;