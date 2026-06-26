import { serverFetch } from "../core/server";

export const getPassengerTransactions = async (email) => {
  if (!email) return [];
  return await serverFetch(`/api/payments/passenger/${email}`);
};
