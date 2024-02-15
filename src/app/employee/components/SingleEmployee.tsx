"use client";

import React from "react";

// mui
import {
  Avatar,
  Card,
  Container,
  IconButton,
  Stack,
  Typography,
  alpha,
} from "@mui/material";

// components
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import Iconify from "src/components/iconify";

// mock data
import { _socials } from "src/data/mock";

// types
import { IEmployee } from "src/types/employee";

/**
 * This component represents the UI for displaying information of a single employee.
 * It includes the employee's avatar, name, role, and social media icons.
 */

const SingleEmployee = ({ employee }: { employee: IEmployee | null }) => (
  <Container maxWidth="lg">
    <CustomBreadcrumbs
      heading="List"
      links={[
        { name: "Employees", href: "/" },
        { name: `${employee?.firstName} ${employee?.lastName}` },
      ]}
      action={[]}
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    />
    <Card
      sx={{
        py: 5,
        display: "flex",
        position: "relative",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Avatar
        alt={employee?.firstName}
        src=""
        sx={{ width: 64, height: 64, mb: 3 }}
      />

      <Typography
        variant="body2"
        sx={{ color: "text.secondary", mb: 1, mt: 0.5 }}
      >
        {`${employee?.firstName} ${employee?.lastName}`}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", mb: 1, mt: 0.5 }}
      >
        {employee?.role}
      </Typography>

      <Stack alignItems="center" justifyContent="center" direction="row">
        {_socials.map((social) => (
          <IconButton
            key={social.name}
            sx={{
              color: social.color,
              "&:hover": {
                bgcolor: alpha(social.color, 0.08),
              },
            }}
          >
            <Iconify icon={social.icon} />
          </IconButton>
        ))}
      </Stack>
    </Card>
  </Container>
);

export default SingleEmployee;
