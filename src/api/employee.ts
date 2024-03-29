import { createAsyncThunk } from "@reduxjs/toolkit";
import { IEmployee } from "src/types/employee";

const baseURL = "https://65d4046a522627d50109c101.mockapi.io/api/";

export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async () => {
    const res = await fetch(`${baseURL}/employee`, { cache: "no-store" });
    const employees = await res.json();
    return employees as IEmployee[];
  }
);

export const addEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (employee: IEmployee, { rejectWithValue }) => {
    const response = await fetch(`${baseURL}/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editEmployee = createAsyncThunk(
  "employee/editEmployee",
  async (employee: IEmployee, { rejectWithValue }) => {
    const response = await fetch(`${baseURL}/employee/${employee.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (id: string, { rejectWithValue }) => {
    const response = await fetch(`${baseURL}/employee/${id}`, {
      method: "DELETE",
    });
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getEmployees = async (): Promise<IEmployee[] | null> => {
  const res = await fetch(`${baseURL}/employee`, {
    cache: "no-store",
  });
  try {
    const employees = await res.json();
    return employees as IEmployee[];
  } catch {
    console.log("error");
    return null;
  }
};

export const getEmployee = async (id: string): Promise<IEmployee | null> => {
  const res = await fetch(`${baseURL}/employee/${id}`, {
    cache: "no-store",
  });
  try {
    const employee = await res.json();
    return employee as IEmployee;
  } catch {
    console.log("error");
    return null;
  }
};
