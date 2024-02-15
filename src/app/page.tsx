"use client"
import { Provider } from "react-redux";
import EmployeeListView from "./components/EmployeeListView";
import store from "@/store";
import { ReactNode } from "react";

export default function Home() {
  return (
    <DataProvider>
      <EmployeeListView />
    </DataProvider>
  );
}

const DataProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
