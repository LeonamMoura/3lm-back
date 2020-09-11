import { Response, Request } from "express";
import { BaseDatabase } from "../../data/BaseDatabase";
import { EmployeesBusiness } from "../../business/EmployeesBusiness";



export const editEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, surname, office, birth_date, salary } = req.body;

    const employeeBusiness = new EmployeesBusiness();
    const result = await employeeBusiness.editEmployee(id, name, surname, office, birth_date, salary)

    res.status(200).send({
      result
    })
  } catch (error) {
    res.status(400).send({
      error: error.message
    })
  };

  await BaseDatabase.destroyConnection()
};
