"use client";

import { UserDocument } from "@/lib/mongoose/models/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

type UserDocumentContextType = {
  userDocument?: UserDocument;
  isLoading?: boolean;
  userDocID?: string;
};

const userDocumentContext = createContext<UserDocumentContextType>({
  userDocument: undefined,
  isLoading: false,
  userDocID: undefined,
});

export const Provider = userDocumentContext.Provider;

export const UserDocumentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [userDocument, setUserDocument] = useState<UserDocument | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userID = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    if (isLoading || userDocument || !userID) return; // Prevents re-fetching if already loaded
    // This is where you would fetch the user document from your API or context
    // and set it in the context. For now, it's just a placeholder.
    const fetchUserDocument = async () => {
      try {
        // Simulate an API call
        const response = await fetch(
          `/api/users/user-docs?clerkUserID=${encodeURIComponent(userID)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const data = await response.json();
        setUserDocument(data);
      } catch (error) {
        console.error("Error fetching user document:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDocument();
  }, [isLoading, userID, userDocument]);

  return (
    <Provider
      value={{
        userDocument,
        isLoading,
        userDocID: userDocument?._id?.toString(),
      }}
    >
      {children}
    </Provider>
  );
};

const useUserDocumentContext = () => {
  const context = useContext(userDocumentContext);
  if (!context) {
    throw new Error(
      "useUserDocumentContext must be used within a UserDocumentProvider",
    );
  }
  return context;
};

export default useUserDocumentContext;
