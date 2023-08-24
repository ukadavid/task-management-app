import express from "express";
import { createTask } from "../../controller/TaskController/createTask";
import { updateTask } from "../../controller/TaskController/updateTask";
import { deleteTask } from "../../controller/TaskController/deleteTask";
import { markTask } from "../../controller/TaskController/markTask";
import { assignTask } from "../../controller/TaskController/assignTask";
import { searchTask } from "../../controller/TaskController/searchTask";
import { sortTask } from "../../controller/TaskController/sortTask";

const router = express.Router();

router.post("/createTask", createTask);
router.put("/:taskId", updateTask);
router.put("/:taskId/assign", assignTask);
router.patch("/:taskId", markTask);
router.get("/readTask", searchTask);
router.get("/sortTask", sortTask);
router.delete("/:taskId", deleteTask);

export default router;
