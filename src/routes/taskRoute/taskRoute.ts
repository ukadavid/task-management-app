import express from "express";
import { createTask } from "../../controller/taskController/createTask";
import { updateTask } from "../../controller/taskController/updateTask";
import { deleteTask } from "../../controller/taskController/deleteTask";
import { markTask } from "../../controller/taskController/markTask";
import { assignTask } from "../../controller/taskController/assignTask";
import { searchTask } from "../../controller/taskController/searchTask";
import { sortTask } from "../../controller/taskController/sortTask";

const router = express.Router();

router.post("/createTask", createTask);
router.put("/:taskId", updateTask);
router.put("/:taskId/assign", assignTask);
router.patch("/:taskId", markTask);
router.get("/searchTask", searchTask);
router.get("/sortTask", sortTask);
router.delete("/:taskId", deleteTask);

export default router;
