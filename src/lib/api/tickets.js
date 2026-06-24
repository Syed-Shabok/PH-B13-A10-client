import { serverFetch } from "../core/server";

export const getAllTickets = async () => {
  const result = await serverFetch(`/api/tickets`);
  return result;
};

export const getUserMadeTickets = async (email) => {
  const result = await serverFetch(`/api/tickets/${email}`);
  //   console.log("getUserMadeTickets result: ", result);

  return result;
};
