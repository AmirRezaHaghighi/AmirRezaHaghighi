import React from "react";
import { AppBar, Container, Toolbar } from "@mui/material";
import { HEADER } from "./config-layout";

const Header = () => (
  <AppBar sx={{ boxShadow: "none" }} position="sticky">
    <Toolbar
      disableGutters
      sx={{
        height: {
          xs: HEADER.H_MOBILE,
          md: HEADER.H_DESKTOP,
        },
      }}
    >
      <Container
        sx={{
          height: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Header</h1>
      </Container>
    </Toolbar>
  </AppBar>
);

export default Header;
