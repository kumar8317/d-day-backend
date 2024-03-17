import { Request, Response } from "express";
import { Route, handleErrorResponse } from "../../../express-server-lib";
import { data } from "./data";
import * as Logger from "../../../utils/logger";
import axios from "axios";

const logger = Logger.default("Push-API");
export const createWebhook: Route = {
  isRoute: true,
  path: "/",
  method: "post",
  handlers: [
    async (req: Request, res: Response): Promise<void> => {
      try {
        console.log("qq", req.headers);
        const resourceId = req.headers["x-goog-resource-id"];
        const channelToken = req.headers["x-goog-channel-token"];
        const channelId = req.headers["x-goog-channel-id"];
        const resourceState = req.headers["x-goog-resource-state"];

        if (resourceState === "sync") {
          res.status(200).send();
          return;
        }

        const calendarData = {
          timeMin: new Date().toISOString(),
          orderBy: "startTime",
        };

        //push calendar data using FCM
        await pushEvent(calendarData)
        res.status(200).send("Webhook recieved");
        return;
      } catch (error) {
        logger.fatal("error,", error);
        return handleErrorResponse(<Error>error, res);
      }
    },
  ],
  
};
let messageIdEvent = ''
const pushEvent = async (calendarData:{timeMin:string,orderBy:string}) => {
  const data = JSON.stringify({
    to: "APA91bETvaQLs7GIQLBWlOQmIJDSSvdOutH5qsmys8rn0cLszmH8BOEF7ElHo5iLwFUrwXzJ8d23stS3niTT7Y1PLul-K1gbkhoWcCE9D5DDrSRFrW5_iCN--wTqLlY9IbB60TO9BlTvkh37zsqGk6bZ_hzMhLYOQA",
    notification: {
        calendarData
    }
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://fcm.googleapis.com/fcm/send",
    headers: {
      Authorization:
        "key=AAAAthpA65w:APA91bF127cSTw0sQXKElS6fBr8CrIHlk8bSfvATUjnc9XSuKdr1W1MINYQ3J4g1s96MrkRB_xssJbtELdKyrNLjkvTz0v5Rlk6dcnKVbMu3T6fDmytkLLU_g95rLqWcneLvWPvPuJcS",
      "Content-Type": "application/json",
    },
    data: data,
  };

  const response = await axios.request(config);
  const messageID = response.data.results[0].message_id;
  messageIdEvent = messageID;
  console.log(response.data);
};
