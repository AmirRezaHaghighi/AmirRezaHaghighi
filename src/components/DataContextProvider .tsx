"use client"

import React from "react";

// Import the Redux store
import { Provider } from "react-redux";
import store from "src/store";

const DataContextProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);
export default DataContextProvider;
