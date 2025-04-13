"use client";

import React from "react";

type InitialValuesProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
};

const InitialValues: InitialValuesProps = {
  currentStep: 1,
  setCurrentStep: () => undefined,
  loading: false,
};

const authContext = React.createContext(InitialValues);

const { Provider } = authContext;

export const AuthContextProvider = ({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading: boolean;
}) => {
  const [currentStep, setCurrentStep] = React.useState<number>(
    InitialValues.currentStep,
  );

  const values = {
    currentStep,
    setCurrentStep,
    loading,
  };

  return <Provider value={values}>{children}</Provider>;
};

export const useAuthContextHook = () => {
  const state = React.useContext(authContext);

  return state;
};
