import express from "express"
import { getChatHistory } from "../../../controllers/HR/Chat/index.js"

const ChatRoute = express.Router()

ChatRoute.get('/Chathistroy',getChatHistory)

export default ChatRoute