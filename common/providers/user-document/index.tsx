"use client";

import { UserDocument } from "@/lib/mongoose/models/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUser } from "@clerk/nextjs";
import { RecommendationItem } from "@/lib/actions/recommendations/types";
import getFavorites from "@/lib/actions/get-favorites";

type FavoritesType = {
  userDocID: string;
  googlePlaceID: string;
  googlePlaceDataCache: RecommendationItem;
  favorite: boolean;
};

type UserDocumentContextType = {
  userDocument?: UserDocument;
  isLoading?: boolean;
  userDocID?: string;
  favorites?: RecommendationItem[];
  isFavoriteSelector: (googlePlaceID: string) => boolean;
};

const userDocumentContext = createContext<UserDocumentContextType>({
  userDocument: undefined,
  favorites: [],
  isLoading: false,
  userDocID: undefined,
  isFavoriteSelector: () => false,
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
  const [didTry, setDidTry] = useState<boolean>(false);
  const userID = user?.primaryEmailAddress?.emailAddress;
  const [favorites, setFavorites] = useState<FavoritesType[]>([]);

  useEffect(() => {
    if (isLoading || userDocument || !userID || didTry) return; // Prevents re-fetching if already loaded

    // This is where you would fetch the user document from your API or context
    // and set it in the context. For now, it's just a placeholder.
    const fetchUserDocument = async () => {
      try {
        if (isLoading) return;
        setIsLoading(true);
        setDidTry(true);
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

        const { data } = await response.json();
        setUserDocument(data);
        const favoritesResponse = await getFavorites(data?._id?.toString());
        setFavorites(
          favoritesResponse?.data?.map(
            ({
              favorite,
              userDocID,
              googlePlaceID,
              googlePlaceDataCache = "",
            }) => {
              return {
                userDocID: userDocID.toString(),
                googlePlaceID,
                favorite,
                googlePlaceDataCache: JSON.parse(googlePlaceDataCache),
              };
            },
          ) || [],
        );
      } catch (error) {
        console.error("Error fetching user document:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDocument();
  }, [isLoading, userID, userDocument, didTry]);

  const isFavoriteSelector = useCallback(
    (googlePlaceID: string) => {
      if (favorites && favorites.length) {
        return favorites.some((fav) => fav.googlePlaceID === googlePlaceID);
      }
      return false;
    },
    [favorites],
  );

  console.log("favororits", favorites);
  return (
    <Provider
      value={{
        isFavoriteSelector,
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
