import { Request, Response } from "express";
import { BaseDatabase } from "../../data/BaseDatabase";
import { EmployeesBusiness } from "../../business/EmployeesBusiness";

export const registerEmployee = async (req: Request, res: Response) => {
  try {

    const token = req.headers.authorization as string

    const { name, surname, office, birth_date, salary, url } = req.body

    const employeeBusiness = new EmployeesBusiness();
    await employeeBusiness.registerEmployee(token, name, surname, office, birth_date, salary, url);

    res.status(200).send({
      message: 'Funcionário registrado com sucesso!'
    });


  } catch (e) {
    res.status(400).send({
      message: e.message
    })
  }
  await BaseDatabase.destroyConnection();
};