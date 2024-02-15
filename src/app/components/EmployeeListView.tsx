"use client";

import react, { useEffect } from "react";
import { fetchEmployees } from "@/api/employee";
import EmployeeList from "./EmployeeList";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/store/slices";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Container, Skeleton, Stack } from "@mui/material";
import EmptyContent from "@/components/empty-content/empty-content";

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
