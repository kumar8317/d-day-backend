import { Request, Response } from "express";
import { Route, Routing, handleErrorResponse, sendDataResponse } from '../../../express-server-lib';
import * as Logger from '../../../utils/logger';
import { registerUser } from "./register";
import { createWebhook } from "./push";
const logger = Logger.default("Webhook-API");



const exampleRouting: Routing = {
  isRoute: false,
  url: '',
  childRoutes: [
    createWebhook,
   registerUser
  ],
};

export default exampleRouting;