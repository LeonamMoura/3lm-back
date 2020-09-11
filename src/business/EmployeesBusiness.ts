import { IdGenerator } from "../services/IdGenerator";
import { EmployeesDatabase } from "../data/EmployeesDatabase";
import { Authenticator } from "../services/Authenticator";

export class EmployeesBusiness {

    async registerEmployee(
        token: string,
        name: string,
        surname: string,
        office: string,
        birth_date: string,
        salary: number,
        url: string
    ): Promise<any> {

        const authenticator = new Authenticator();
        const authenticationData = authenticator.verify(token);

        if (!authenticationData) {
            throw new Error("Token Inválido!")
        }

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

    async deleteEmployee(token: string, id: string): Promise<string> {
        const authenticator = new Authenticator();
        const authenticationData = authenticator.verify(token);

        if (!authenticationData) {
            throw new Error("Token Inválido!")
        }

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
        token: string,
        id: string,
        name: string,
        surname: string,
        office: string,
        birth_date: string,
        salary: number
    ): Promise<any> {
        const authenticator = new Authenticator();
        const authenticationData = authenticator.verify(token);

        if (!authenticationData) {
            throw new Error("Token Inválido!")
        }

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

    async getAllEmployees(token: string): Promise<any> {
        const authenticator = new Authenticator();
        const authenticationData = authenticator.verify(token);

        if (!authenticationData) {
            throw new Error("Token Inválido!")
        }

        const employeesDataBase = new EmployeesDatabase();
        const result = await employeesDataBase.getAllEmployees()

        return result;

    }

    async getEmployeeById(token: string, id: string): Promise<any> {
        const authenticator = new Authenticator();
        const authenticationData = authenticator.verify(token);

        if (!authenticationData) {
            throw new Error("Token Inválido!")
        }

        if (!id) {
            throw new Error("Não encontramos nenhum funcionário com este ID =(");
        };

        const employeesDataBase = new EmployeesDatabase();
        const result = await employeesDataBase.getEmployeeById(id);

        return result;
    }
}