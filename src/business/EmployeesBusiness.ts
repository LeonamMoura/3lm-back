import { IdGenerator } from "../services/IdGenerator";
import { EmployeesDatabase } from "../data/EmployeesDatabase";

export class EmployeesBusiness {

    async registerEmployee(
        name: string,
        surname: string,
        office: string,
        birth_date: string,
        salary: number,
        url: string
    ): Promise<any> {

        if (!name || !surname || !office || !birth_date || !salary) {
            throw new Error('Insira todas as informações necessárias para o cadastro');
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generateId();

        const employeesDataBase = new EmployeesDatabase();
        const result = await employeesDataBase.registerEmployee(
            id,
            name,
            surname,
            office,
            birth_date,
            salary,
            url
        );

        return result
    }

    /******************************************************************************/

    async deleteEmployee(id: string): Promise<string> {
        if (id === null) {
            throw new Error("Informe nos params o id do funcionário que deseja deletar")
        }

        const employeesDataBase = new EmployeesDatabase();
        const result = await employeesDataBase.deleteEmployeeById(id)

        if (!result) {
            throw new Error("Este ID não existe!")
        }

        return result;
    }

    /******************************************************************************/

    async editEmployee(
        id: string,
        name: string,
        surname: string,
        office: string,
        birth_date: string,
        salary: number
    ): Promise<any> {
        if (id === null) {
            throw new Error("Informe nos params o id do funcionário que deseja editar")
        }

        const employeesDataBase = new EmployeesDatabase();
        const result = await employeesDataBase.editEmployeeById(id, name, surname, office, birth_date, salary)

        if (!result) {
            throw new Error("Este ID não existe!")
        }

        return result;
    }

    /******************************************************************************/

    async getAllEmployees(): Promise<any> { // Ainda falta receber o token do manager
        const employeesDataBase = new EmployeesDatabase();
        const result = await employeesDataBase.getAllEmployees()

        return result;

    }

    async getEmployeeById(id: string): Promise<any> {
        if (!id) {
            throw new Error("Não encontramos nenhum funcionário com este ID =(");
        };

        const employeesDataBase = new EmployeesDatabase();
        const result = await employeesDataBase.getEmployeeById(id);

        return result;
    }
}