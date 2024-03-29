import express from "express";

import {
	postMessage,
	getConversations,
	getMessages,
	deleteConversation,
} from "../controllers/messageController";
import { verifyToken } from "../middleware/verifyToken";

const route = express.Router();

route.post("/message", verifyToken, postMessage);

route.get("/conversations", verifyToken, getConversations);

route.get("/messages/:id", verifyToken, getMessages);

route.delete("/conversation/:id", verifyToken, deleteConversation);
export default route;
