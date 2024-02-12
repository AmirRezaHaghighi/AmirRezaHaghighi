import react from "react";
import { getAllEmployees } from "@/api/employee";
import EmployeeList from "./EmployeeList";

export default async function EmployeeListView() {
  const employees = await getAllEmployees();

  return <EmployeeList employees={employees}/>;
}
