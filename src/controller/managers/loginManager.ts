import { Request, Response } from "express";
import { BaseDatabase } from "../../data/BaseDatabase";
import { ManagerBusiness } from "../../business/ManagerBusiness";

export const loginManager = async (req: Request, res: Response) => {
  try {

    const { email, password } = req.body;

    const managerBusiness = new ManagerBusiness();
    const result = await managerBusiness.loginManager(email, password)

    res.status(200).send({
      message: 'login realizado com sucesso!',
      token: result
    });


  } catch (e) {
    console.log("errou")
    res.status(400).send({
      message: e.message
    });
  };
  await BaseDatabase.destroyConnection();
};