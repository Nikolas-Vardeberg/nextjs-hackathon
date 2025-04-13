import { redirect } from "next/navigation";
import { getUser } from "./getUser";

/**
 * This function is used to require authentication for a page.
 * It will redirect to the sign-in page if the user is not authenticated.
 * @returns The user object if the user is authenticated.
 */
export const requireAuth = async () => {
  const user = await getUser();

  if (!user.userId) {
    redirect("/sign-in");
  }

  return user;
};
