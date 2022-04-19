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
    console.log('Create customer router name:',name);
    console.log('Create customer router email:',email);
    console.log('Create customer router address:',address);
    console.log('Create customer router cccd:',cccd);
    if (!name || !email || !address || !cccd ) throw new InvalidParamsError();
    await customerService.create({ name, email, address, cccd})
    // const { accessToken, refreshToken, ...response } = data;
    // const cookieOptions = { httpOnly: true };
    // if (process.env.SECURED_ENDPOINT) Object.assign(cookieOptions, { secure: true });
    // if (process.env.SAME_SITE) Object.assign(cookieOptions, { sameSite: process.env.SAME_SITE });
    // if (process.env.COOKIE_DOMAIN) Object.assign(cookieOptions, { domain: process.env.COOKIE_DOMAIN });
    // res.cookie('x-access-token', accessToken, { ...cookieOptions, maxAge: 1000 * 60 * 60 * 24 * 365 });
    // res.cookie('x-refresh-token', refreshToken, { ...cookieOptions, maxAge: 1000 * 60 * 60 * 24 * 365 });
    // return successResponse(res, response);
  })
);


export default customerRouter;
