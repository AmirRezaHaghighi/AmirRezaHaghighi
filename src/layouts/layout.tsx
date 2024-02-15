"use client";

import { Box, CssBaseline } from "@mui/material";
import { SnackbarProvider } from "src/components/snackbar";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 1 }}>
      <CssBaseline />
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 11, md: 21 },
        }}
      >
        <SnackbarProvider> {children}</SnackbarProvider>
      </Box>
      <Footer />
    </Box>
  );
}
