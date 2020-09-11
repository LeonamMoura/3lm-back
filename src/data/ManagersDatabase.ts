import { BaseDatabase } from "./BaseDatabase";

export class ManagersDatabase extends BaseDatabase {
  private static TABLE_NAME: string = 'managers';

  async registerManager(id: string, name: string, email: string, password: string): Promise<void> {
    await this.getConnection()
      .insert({ id, name, email, password })
      .into(ManagersDatabase.TABLE_NAME)

  }

  async getManagerByEmail(email: string): Promise<any> {
    const result = await this.getConnection()
      .select('*')
      .from(ManagersDatabase.TABLE_NAME)
      .where({ email })

    return result[0]
  }

}