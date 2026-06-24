"use server";

import { serverMutation } from "../core/server";

export const updateUser = async (data, email) => {
  const resData = await serverMutation(`/api/users/${email}`, "PATCH", data);
  return resData;
};
