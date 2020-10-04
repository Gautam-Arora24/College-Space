import React, { useState, createContext, useContext } from "react";

const Context = createContext();
const { Provider } = Context;

// const store = {};

const useAppState = () => useContext(Context);

export { Provider, useAppState };
