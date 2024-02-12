import { IEmployee } from "@/types/employee";

const baseURL = "http://localhost:3001";

export const getAllEmployees = async () => {
  try {
    const res = await fetch(`${baseURL}/employees`, { cache: "no-store" });
    const employees = await res.json();
    return employees as IEmployee[];
  } catch {
    console.log("f");
  }
};

export const getEmployee = async (id: string) => {
  try {
    const res = await fetch(`${baseURL}/employees/${id}`, {
      cache: "no-store",
    });
    const employee = await res.json();
    return employee as IEmployee;
  } catch {
    console.log("f");
  }
};

export const addEmployee = async (employee: IEmployee) => {
  try {
    const res = await fetch(`${baseURL}/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });
    const newEmployee = await res.json();
    return newEmployee as IEmployee;
  } catch {
    console.log("f");
  }
};

export const editEmployee = async (employee: IEmployee) => {
  try {
    const res = await fetch(`${baseURL}/employees/${employee.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });
    const newEmployee = await res.json();
    return newEmployee as IEmployee;
  } catch {
    console.log("f");
  }
};

export const deleteEmployee = async (id: string) => {
  try {
    await fetch(`${baseURL}/employees/${id}`, {
      method: "DELETE",
    });
  } catch {
    console.log("f");
  }
};
