import { Request, Response } from "express";
import { BaseDatabase } from "../../data/BaseDatabase";
import { EmployeesBusiness } from "../../business/EmployeesBusiness";

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;

    const employeeBusiness = new EmployeesBusiness();
    const result = await employeeBusiness.getAllEmployees(token);

    res.status(200).send(
      result
    );


  } catch (e) {
    res.status(400).send({
      message: e.message
    })
  }
  await BaseDatabase.destroyConnection();
};