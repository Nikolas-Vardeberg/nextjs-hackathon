"use client";

import React from "react";
import { useAuthContextHook } from "../../../providers/use-auth-context";

export const AuthError = () => {
  const { error } = useAuthContextHook();

  console.log("error", error);

  if (!error) return null;

  return (
    <div className="w-full p-3 mt-2 text-sm text-red-500 bg-red-50 rounded-md">
      {error}
    </div>
  );
};
