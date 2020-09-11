import express from "express";
import { registerEmployee } from "../controller/employees/registerEmployee";
import { deleteEmployee } from "../controller/employees/deleteEmployee";
import { editEmployee } from "../controller/employees/editEmployee"
import { getAllEmployees } from "../controller/employees/getAllEmployees";
import { getEmployeeById } from "../controller/employees/getEmployeeById";

export const employeesRouter = express.Router();

employeesRouter.get("/", getAllEmployees);
employeesRouter.get("/:id", getEmployeeById);

employeesRouter.put("/register", registerEmployee);
employeesRouter.put("/edit/:id", editEmployee);

employeesRouter.delete("/delete/:id", deleteEmployee);