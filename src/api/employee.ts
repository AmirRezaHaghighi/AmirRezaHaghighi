import { IEmployee } from "@/types/employee";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = "http://localhost:3001";

export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async () => {
    const res = await fetch(`${baseURL}/employees`, { cache: "no-store" });
    const employees = await res.json();
    return employees as IEmployee[];
  }
);

// export const getEmployee = async (id: string) => {
//   try {
//     const res = await fetch(`${baseURL}/employees/${id}`, {
//       cache: "no-store",
//     });
//     const employee = await res.json();
//     return employee as IEmployee;
//   } catch {
//     console.log("f");
//   }
// };

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
    const response = await fetch(`${baseURL}/employees/${employee.id}`, {
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
    const response = await fetch(`${baseURL}/employees/${id}`, {
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
