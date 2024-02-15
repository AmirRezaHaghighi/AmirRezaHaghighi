import { Container } from "@mui/material";
import { getEmployee, getEmployees } from "src/api/employee";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import { paths } from "src/routes/path";
import { IEmployee } from "src/types/employee";
import SingleEmployee from "../components/SingleEmployee";

export async function generateStaticParams() {
  const employees = await getEmployees();
  if (!employees) return [];

  return employees.map((employee: IEmployee) => ({
    id: employee.id,
  }));
}

export default async function EmployeeDetailsHomePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const employee = await getEmployee(id);

  return <SingleEmployee employee={employee} />;
}
