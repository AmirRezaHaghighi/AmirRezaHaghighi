import React, { FC } from "react";
import * as yup from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import { addEmployee, editEmployee } from "@/api/employee";
import { v4 as uuidv4 } from "uuid";
import { IEmployee } from "@/types/employee";
//----------------------------------

interface AddEmployeeModalProps {
  open: boolean;
  handleClose: () => void;
  data: IEmployee | undefined;
}

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  role: yup.string().required("Role is required"),
});

const AddEmployeeModal: FC<AddEmployeeModalProps> = ({
  open,
  handleClose,
  data,
}) => {
  const Id = data?.id;
  const formik = useFormik({
    initialValues: {
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      role: data?.role || "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (Id) {
        await editEmployee({ id: Id, ...values });
      } else {
        await addEmployee({ id: uuidv4(), ...values });
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
          handleClose();
        },
      }}
    >
      <DialogTitle>{Id ? "Edit" : "Add"} Employee</DialogTitle>
      <DialogContent>
        <form>
          <Stack spacing={2}>
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
      <DialogActions>
        <LoadingButton variant="contained" loading={false} type="submit">
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
