import { BaseDatabase } from "./BaseDatabase";

export class EmployeesDatabase extends BaseDatabase {
  private static TABLE_NAME: string = 'employees';

  async registerEmployee(
    id: string,
    name: string,
    surname: string,
    office: string,
    birth_date: string,
    salary: number,
    url: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        name,
        surname,
        office,
        birth_date,
        salary,
        url

      }).into(EmployeesDatabase.TABLE_NAME);
  }

  async getEmployeeById(id: string): Promise<any> {
    const result = await this.getConnection()
      .select('*')
      .from(EmployeesDatabase.TABLE_NAME)
      .where({ id });
    return result[0]
  }

  async deleteEmployeeById(id: string): Promise<any> {
    const result = await this.getConnection()
      .delete("*")
      .from(EmployeesDatabase.TABLE_NAME)
      .where({ id })

    return result;
  }

  async editEmployeeById(
    id: string,
    name: string,
    surname: string,
    office: string,
    birth_date: string,
    salary: number
  ): Promise<any> {
    const result = await this.getConnection()
      .from(EmployeesDatabase.TABLE_NAME)
      .update({
        name: name,
        surname: surname,
        office: office,
        birth_date: birth_date,
        salary: salary,
      })
      .where({ id })
    return result
  }

  async getAllEmployees(): Promise<any> {
    const result = await this.getConnection()
      .select('*')
      .from(EmployeesDatabase.TABLE_NAME)

    return result;
  }
}