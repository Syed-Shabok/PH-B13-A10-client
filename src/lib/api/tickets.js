import { serverFetch } from "../core/server";

export const getUserMadeTickets = async (email) => {
  const result = await serverFetch(`/api/tickets/${email}`);
  //   console.log("getUserMadeTickets result: ", result);

  return result;
};
