"use client";

import { ReactNode } from "react";

// Import the Redux store
import { Provider } from "react-redux";
import store from "src/store";

// pages
import EmployeeListView from "./employee/page";
//--------------------


/**
 * The Home component renders the EmployeeListView component wrapped within the DataProvider.
 * @returns {JSX.Element} The JSX representation of the Home component.
 */

export default function Home() {
  return (
    <DataProvider>
      <EmployeeListView />
    </DataProvider>
  );
}


/**
 * The DataProvider component wraps the children components with the Redux store provider.
 * It ensures that the Redux store is available to all components within its hierarchy.
 * @param {Object} props - The properties passed to the DataProvider component.
 * @param {ReactNode} props.children - The child components to be wrapped by the DataProvider.
 * @returns {JSX.Element} The JSX representation of the DataProvider component.
 */

const DataProvider = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);
