import { Request, Response } from "express";
import { BaseDatabase } from "../../data/BaseDatabase";
import { ManagerBusiness } from "../../business/ManagerBusiness";

export const registerManager = async (req: Request, res: Response) => {
  try {

    const { name, email, password } = req.body;

    const managerBusiness = new ManagerBusiness();
    const result = await managerBusiness.registerManager(name, email, password)

    res.status(200).send({
      message: 'Manager registrado com sucesso!',
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