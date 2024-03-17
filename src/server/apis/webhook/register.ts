import { Request, Response } from "express";
import { Route, handleErrorResponse } from "../../../express-server-lib";
import * as Logger from '../../../utils/logger';
import { data } from "./data";
const logger = Logger.default("Register-API");

export const registerUser:Route = {
    isRoute: true,
    path: "/register",
    method: "post",
    handlers: [
        async(req:Request,res: Response):Promise<void> => {
            try {
                console.log('regsiter body',req.body);
                const {token,registration_id} = req.body
                data.push({
                    token,
                    registration_id
                })
                console.log('data',data)
                res.status(200).json({message:'Success'})
            } catch (error) {
                logger.fatal("error,", error);
                return handleErrorResponse(<Error> error,res);
            }
        }
    ]
}