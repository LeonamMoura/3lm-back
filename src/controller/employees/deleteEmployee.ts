import { Request, Response } from "express";
import { BaseDatabase } from "../../data/BaseDatabase";
import { EmployeesBusiness } from "../../business/EmployeesBusiness";

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const { id } = req.params

    const employeeBusiness = new EmployeesBusiness();
    await employeeBusiness.deleteEmployee(token, id)

    res.status(200).send({
      message: "Funcionário deletado!"
    })

  } catch (error) {
    res.status(400).send({
      error: error.message
    })
  }
  await BaseDatabase.destroyConnection();
}