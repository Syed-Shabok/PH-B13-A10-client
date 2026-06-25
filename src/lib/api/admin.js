import { serverFetch, serverMutation } from "../core/server";

// --- Users ---
export const getAllUsers = async () => {
  return await serverFetch("/api/users");
};

export const updateUserRole = async (id, role) => {
  return await serverMutation(`/api/users/role/${id}`, "PATCH", { role });
};

export const markVendorAsFraud = async (id) => {
  return await serverMutation(`/api/users/fraud/${id}`, "PATCH", {});
};

// --- Tickets ---
export const getAllTicketsForAdmin = async () => {
  return await serverFetch("/api/tickets/all");
};

export const updateTicketStatus = async (id, status) => {
  return await serverMutation(`/api/tickets/${id}`, "PATCH", { status });
};

export const toggleTicketAdvertisement = async (id, isAdvertised) => {
  return await serverMutation(`/api/tickets/${id}/advertise`, "PATCH", {
    isAdvertised,
  });
};
