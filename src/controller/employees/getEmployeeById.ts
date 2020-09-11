import { Request, Response } from "express";
import { BaseDatabase } from "../../data/BaseDatabase";
import { EmployeesBusiness } from "../../business/EmployeesBusiness";

export const getEmployeeById = async (req: Request, res: Response) => {
  try {

    const { id } = req.params

    const employeeBusiness = new EmployeesBusiness();
    const result = await employeeBusiness.getEmployeeById(id)

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