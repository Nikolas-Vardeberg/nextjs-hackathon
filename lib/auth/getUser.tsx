import { auth } from "@clerk/nextjs/server";
import { cache } from "react";

/**
 * This function is used to get the Auth object from clerk.
 * This is only to be used in server components and is memoized for subsequent calls within the same request.
 * @returns The Auth object.
 */
export const getUser = cache(async () => await auth());
