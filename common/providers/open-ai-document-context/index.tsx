"use client";

import { OpenAIDocument } from "@/lib/mongoose/models/types";
import { createContext, useContext, useState } from "react";
import useUserDocumentContext from "../user-document-context";

type OpenAIDocumentContextType = {
  openAIDocument?: OpenAIDocument;
  isLoading?: boolean;
  userDocID?: string;
};

const openAIDocumentContext = createContext<OpenAIDocumentContextType>({
  openAIDocument: undefined,
  isLoading: false,
  userDocID: undefined,
});

export const Provider = openAIDocumentContext.Provider;

export const OpenAIDocumentProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [openAIDocument] = useState<OpenAIDocument | undefined>(undefined);
  const [isLoading] = useState<boolean>(false);
  const { userDocID } = useUserDocumentContext();

  return (
    <Provider
      value={{
        openAIDocument,
        isLoading,
        userDocID,
      }}
    >
      {children}
    </Provider>
  );
};

const useOpenAIDocumentContext = () => {
  const context = useContext(openAIDocumentContext);
  if (!context) {
    throw new Error(
      "useOpenAIDocumentContext must be used within a OpenAIDocumentProvider",
    );
  }
  return context;
};

export default useOpenAIDocumentContext;
