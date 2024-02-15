"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "src/store";
import EmployeeListView from "./pages/EmployeeListView";

export default function Home() {
  return (
    <DataProvider>
      <EmployeeListView />
    </DataProvider>
  );
}

const DataProvider = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);
