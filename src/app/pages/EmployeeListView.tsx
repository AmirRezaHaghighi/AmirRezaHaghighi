"use client";

import react, { useEffect } from "react";

// mui
import { Container, Skeleton, Stack } from "@mui/material";
import { useDispatch , useSelector } from "react-redux";

// Import types and selectors from the Redux store slices
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "src/store/slices";
import { fetchEmployees } from "src/api/employee";

// component
import EmployeeList from "./EmployeeList";


/**
 * This component represents the view for displaying a list of employees.
 * It fetches employee data from the Redux store and renders either a loading skeleton
 * or the list of employees based on the loading state.
 */

export default function EmployeeListView() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const employees = useSelector((state: RootState) => state.employee);
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <>
      {employees.loading ? (
        <Container maxWidth="lg">
          <Stack
            direction="column"
            spacing={1}
            sx={{
              my: { xs: 3, md: 5 },
            }}
          >
            {[...Array(7)].map((_, index) => (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={51}
                key={index}
              />
            ))}
          </Stack>
        </Container>
      ) : (
        <EmployeeList employees={employees.employees} />
      )}
      {!employees.loading && employees.error && <div>{employees.error}</div>}
    </>
  );
}
