"use client";

import react, { useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";

import { ThunkDispatch } from "@reduxjs/toolkit";
import { Container, Skeleton, Stack } from "@mui/material";
import { RootState } from "src/store/slices";
import { fetchEmployees } from "src/api/employee";
import EmployeeList from "./EmployeeList";

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
