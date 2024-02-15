import React, { FC } from "react";
// YUP
import * as yup from "yup";
// mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

// package
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { useSnackbar } from "notistack";

// store
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "src/store/slices";

// types
import { IEmployee } from "src/types/employee";

// api
import { addEmployee, editEmployee } from "src/api/employee";

//----------------------------------

// Props
interface AddEmployeeModalProps {
  open: boolean;
  handleClose: () => void;
  data: IEmployee | undefined;
}

// validation schema
const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  role: yup.string().required("Role is required"),
});

/**
 * This component represents a modal for adding or editing employee information.
 * It uses Formik for form management and Yup for form validation.
 */

const AddEmployeeModal: FC<AddEmployeeModalProps> = ({
  open,
  handleClose,
  data,
}) => {
  // Extract data from props
  const Id = data?.id;

  // Redux hooks for dispatch and state selection
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const employees = useSelector((state: RootState) => state.employee);

  // snack bar
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      role: data?.role || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      if (Id) {
        dispatch(editEmployee({ id: Id, ...values }));
        enqueueSnackbar("Employee Info Updated Successfully");
        handleClose();
      } else {
        dispatch(addEmployee({ id: uuidv4(), ...values }));
        enqueueSnackbar("New Employee Created Successfully");
        handleClose();
      }
    },
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          formik.handleSubmit();
        },
      }}
    >
      <DialogTitle>{Id ? "Edit" : "Add"} Employee</DialogTitle>
      <DialogContent>
        <form>
          <Stack spacing={2} sx={{ py: 1 }}>
            <TextField
              id="firstName"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />

            <TextField
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />

            <FormControl fullWidth>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                id="role"
                name="role"
                value={formik.values.role}
                label="Role"
                onChange={formik.handleChange}
                error={formik.touched.role && Boolean(formik.errors.role)}
              >
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="employee">Employee</MenuItem>
              </Select>
              <FormHelperText color="error">
                {formik.touched.role && formik.errors.role}
              </FormHelperText>
            </FormControl>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2}}>
        <LoadingButton
          variant="contained"
          loading={employees.loading}
          type="submit"
        >
          {Id ? "Edit" : "Add"}
        </LoadingButton>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployeeModal;
