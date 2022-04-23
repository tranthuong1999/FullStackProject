import { Router } from 'express';
import Account from '../../../models/Account';
import { InvalidParamsError } from '../common/error';
import { successResponse } from '../common/responses';
import { verifyRefreshTokenMiddleware, verifyTokenMiddleware } from '../middlewares/authMiddlewares';
import accountService from '../services/account.service';
import asyncHandler from '../utils/asyncHandler';

const accountRouter = Router();

//get list
accountRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const dataRes =  await accountService.get({})
    return res.json(dataRes)
  })
);

//create account
accountRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, sdt , dateOfBird ,password , idPosition} = req.body;
    if (!name || !sdt || !dateOfBird || !password || !idPosition ) throw new InvalidParamsError();
    const dataRes =  await  accountService.create({ name, sdt , dateOfBird , password , idPosition})
    return res.json(dataRes)
  })
);

//update account
accountRouter.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const {id} =  req.params;
    const resBody: Account = req.body
    console.log('Id',id);
    const data =  await accountService.update({id: id, update:resBody})
    return res.json(data)
  })
);

//delete account
accountRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const {id} =  req.params;
    const resBody: Account = req.body
    const data = await accountService.delete({id: id, update: req.body})
    return res.status(200).json("delete success")
  })
);

export default accountRouter;