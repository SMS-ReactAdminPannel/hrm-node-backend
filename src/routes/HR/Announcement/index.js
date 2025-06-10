import express from "express"
import { AnnouncementCreate, AnnouncementDelete, AnnouncementGetAll, AnnouncementGetOne, AnnouncementUpdateWithUUID } from "../../../controllers/HR/Announcement/index.js";

const AnnouncementRouter = express.Router();
AnnouncementRouter.post("/create", AnnouncementCreate)
AnnouncementRouter.get("/get/:id",AnnouncementGetOne)
AnnouncementRouter.get("/getall",AnnouncementGetAll)
AnnouncementRouter.put("/update/:id",AnnouncementUpdateWithUUID)
AnnouncementRouter.delete("/delete/:id",AnnouncementDelete)
export default AnnouncementRouter