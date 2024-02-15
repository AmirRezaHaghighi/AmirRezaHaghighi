import { createSlice } from "@reduxjs/toolkit";
import {
  addEmployee,
  deleteEmployee,
  editEmployee,
  fetchEmployees,
} from "src/api/employee";
import { IEmployee } from "src/types/employee";

interface EmployeeState {
  employees: IEmployee[];
  loading: boolean;
  error: string;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: "",
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEmployees.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.loading = false;
      state.employees = action.payload;
      state.error = "";
    });
    builder.addCase(fetchEmployees.rejected, (state, action) => {
      state.loading = false;
      state.employees = [];
      state.error = action.error.message || "";
    });

    builder.addCase(addEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.employees.push(action.payload);
      state.error = "";
    });
    builder.addCase(addEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });

    builder.addCase(editEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.employees = state.employees.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
      state.error = "";
    });
    builder.addCase(editEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });

    builder.addCase(deleteEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.employees = state.employees.filter((ele) => ele.id !== id);
      }
      state.error = "";
    });
    builder.addCase(deleteEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });
  },
});

export default employeeSlice.reducer;
