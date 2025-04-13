"use client";

import React from "react";

type InitialValuesProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  onGenerateOTP?: (
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>,
  ) => Promise<void>;
};

const InitialValues: InitialValuesProps = {
  currentStep: 1,
  setCurrentStep: () => undefined,
  loading: false,
  error: null,
  setError: () => undefined,
  onGenerateOTP: undefined,
};

const authContext = React.createContext(InitialValues);

const { Provider } = authContext;

export const AuthContextProvider = ({
  children,
  loading,
  error = null,
  setError = () => undefined,
  onGenerateOTP,
}: {
  children: React.ReactNode;
  loading: boolean;
  error?: string | null;
  setError?: React.Dispatch<React.SetStateAction<string | null>>;
  onGenerateOTP?: (
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>,
  ) => Promise<void>;
}) => {
  const [currentStep, setCurrentStep] = React.useState<number>(
    InitialValues.currentStep,
  );

  const values = {
    currentStep,
    setCurrentStep,
    loading,
    error,
    setError,
    onGenerateOTP,
  };

  return <Provider value={values}>{children}</Provider>;
};

export const useAuthContextHook = () => {
  const state = React.useContext(authContext);

  return state;
};
