import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { ManagersDatabase } from "../data/ManagersDatabase";

export class ManagerBusiness {

  async registerManager(name: string, email: string, password: string): Promise<string> {

    function validateEmail(email: string) {
      const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      return re.test(String(email).toLowerCase());
    };

    if (!name || !email || !password) {
      throw new Error("Preencha todos os campos!");
    };

    if (password.length < 6) {
      throw new Error("Senha deve possuír no mínimo 6 caracteres");
    };

    if (!validateEmail(email)) {
      throw new Error("Insira um e-mail válido!");
    };

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const hashManager = new HashManager();
    const hashedPassword = await hashManager.hash(password);

    const managersDatabase = new ManagersDatabase();
    await managersDatabase.registerManager(id, name, email, hashedPassword);

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id })

    return token;
  }

  async loginManager(email: string, password: string): Promise<string> {

    if (!email || !password) {
      throw new Error("Preencha todos os campos!");
    };

    const managersDatabase = new ManagersDatabase();
    const user = await managersDatabase.getManagerByEmail(email);

    const hashManager = new HashManager();
    const isPasswordCorrect = await hashManager.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Senha incorreta!");
    };

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id: user.id });

    return token;
  }

}