"use client";

import { useState } from "react";
import { Button, AlertDialog } from "@heroui/react";

import toast from "react-hot-toast";
import {
  FaShieldAlt,
  FaUserTie,
  FaUser,
  FaBan,
  FaExclamationTriangle,
} from "react-icons/fa";
import { markVendorAsFraud, updateUserRole } from "@/lib/api/admin";

export default function ManageUsersClient({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [processingId, setProcessingId] = useState(null);

  // Handle Role Changes
  const handleRoleChange = async (id, newRole) => {
    try {
      setProcessingId(id);
      const res = await updateUserRole(id, newRole);

      if (res.modifiedCount > 0 || res.matchedCount > 0) {
        toast.success(`User promoted to ${newRole}`);
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role: newRole } : u)),
        );
      } else {
        toast.error("Role update failed.");
      }
    } catch (error) {
      toast.error("Network error occurred.");
    } finally {
      setProcessingId(null);
    }
  };

  // Handle Fraud Marking
  const handleMarkFraud = async (id) => {
    try {
      setProcessingId(id);
      const res = await markVendorAsFraud(id);

      if (res.success) {
        toast.success("Vendor marked as fraud. Tickets hidden.");
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, isBlocked: true } : u)),
        );
      } else {
        toast.error("Failed to mark as fraud.");
      }
    } catch (error) {
      toast.error("Network error occurred.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="mt-8 w-full overflow-x-auto rounded-[2rem] border border-[#1a3d61] bg-[#102226]/40 backdrop-blur-xl shadow-2xl custom-scrollbar">
      <table className="w-full text-left text-sm text-zinc-300 min-w-[900px]">
        <thead className="bg-[#0b1d30]/90 text-[10px] uppercase font-black text-[#00ADB5] tracking-widest border-b border-[#1a3d61]">
          <tr>
            <th className="px-6 py-5 rounded-tl-[2rem]">User Identity</th>
            <th className="px-6 py-5">Current Role</th>
            <th className="px-6 py-5">Security Status</th>
            <th className="px-6 py-5 text-right rounded-tr-[2rem]">
              Access Controls
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1a3d61]/50">
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-white/5 transition-colors">
              {/* Identity */}
              <td className="px-6 py-5 align-middle">
                <p className="font-bold text-white text-base tracking-wide">
                  {user.name}
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">{user.email}</p>
              </td>

              {/* Role Badge */}
              <td className="px-6 py-5 align-middle">
                <RoleBadge role={user.role} />
              </td>

              {/* Security Status */}
              <td className="px-6 py-5 align-middle">
                {user.isBlocked ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-full">
                    <FaBan size={10} /> Fraudulent
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#AAFFC7]/10 border border-[#AAFFC7]/20 text-[#AAFFC7] text-[10px] font-black uppercase tracking-widest rounded-full">
                    <FaShieldAlt size={10} /> Clear
                  </span>
                )}
              </td>

              {/* Action Controls */}
              <td className="px-6 py-5 align-middle text-right">
                <div className="flex items-center justify-end gap-3">
                  {/* Make Vendor (No alert required per instructions) */}
                  {user.role !== "vendor" &&
                    user.role !== "admin" &&
                    !user.isBlocked && (
                      <Button
                        size="sm"
                        isLoading={processingId === user._id}
                        onPress={() => handleRoleChange(user._id, "vendor")}
                        className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500 hover:text-white font-bold uppercase tracking-widest text-[10px] rounded-lg"
                      >
                        Make Vendor
                      </Button>
                    )}

                  {/* Make Admin (With Alert Dialog) */}
                  {user.role !== "admin" && !user.isBlocked && (
                    <AlertDialog>
                      <Button
                        size="sm"
                        isLoading={processingId === user._id}
                        className="bg-[#00ADB5]/10 text-[#00ADB5] border border-[#00ADB5]/30 hover:bg-[#00ADB5] hover:text-[#091624] font-bold uppercase tracking-widest text-[10px] rounded-lg"
                      >
                        Make Admin
                      </Button>
                      <AlertDialog.Backdrop className="bg-black/80 backdrop-blur-md">
                        <AlertDialog.Container>
                          <AlertDialog.Dialog className="bg-[#0b1d30] border border-[#1a3d61] shadow-2xl sm:max-w-[400px] rounded-3xl">
                            <AlertDialog.CloseTrigger className="text-zinc-400 hover:text-white" />
                            <AlertDialog.Header>
                              <AlertDialog.Icon className="text-[#00ADB5]" />
                              <AlertDialog.Heading className="text-white font-black text-xl">
                                Grant Admin Privileges?
                              </AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                              <p className="text-zinc-400 text-sm">
                                This will grant{" "}
                                <strong className="text-white">
                                  {user.name}
                                </strong>{" "}
                                full administrative access. They will be able to
                                manage all tickets, users, and advertisements.
                              </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                              <Button
                                slot="close"
                                className="bg-white/5 text-white font-bold rounded-xl"
                              >
                                Cancel
                              </Button>
                              <Button
                                slot="close"
                                onPress={() =>
                                  handleRoleChange(user._id, "admin")
                                }
                                className="bg-[#00ADB5] hover:bg-[#009299] text-[#091624] font-black rounded-xl"
                              >
                                Confirm Admin
                              </Button>
                            </AlertDialog.Footer>
                          </AlertDialog.Dialog>
                        </AlertDialog.Container>
                      </AlertDialog.Backdrop>
                    </AlertDialog>
                  )}

                  {/* Mark as Fraud (With Alert Dialog - Only for Vendors) */}
                  {user.role === "vendor" && !user.isBlocked && (
                    <AlertDialog>
                      <Button
                        size="sm"
                        isLoading={processingId === user._id}
                        className="bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white font-bold uppercase tracking-widest text-[10px] rounded-lg"
                      >
                        Mark Fraud
                      </Button>
                      <AlertDialog.Backdrop className="bg-black/80 backdrop-blur-md">
                        <AlertDialog.Container>
                          <AlertDialog.Dialog className="bg-[#102226] border border-red-500/30 shadow-2xl shadow-red-500/10 sm:max-w-[400px] rounded-3xl">
                            <AlertDialog.CloseTrigger className="text-zinc-400 hover:text-white" />
                            <AlertDialog.Header>
                              <AlertDialog.Icon className="text-red-500">
                                <FaExclamationTriangle size={24} />
                              </AlertDialog.Icon>
                              <AlertDialog.Heading className="text-red-500 font-black text-xl mt-2">
                                Mark Vendor as Fraud?
                              </AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                              <p className="text-zinc-400 text-sm">
                                Are you sure you want to flag{" "}
                                <strong className="text-white">
                                  {user.name}
                                </strong>{" "}
                                as fraudulent?
                                <br />
                                <br />
                                This will immediately{" "}
                                <strong>hide all of their tickets</strong> from
                                the platform and revoke their ability to add new
                                listings. This action is severe.
                              </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                              <Button
                                slot="close"
                                className="bg-white/5 text-white font-bold rounded-xl"
                              >
                                Cancel
                              </Button>
                              <Button
                                slot="close"
                                onPress={() => handleMarkFraud(user._id)}
                                className="bg-red-500 hover:bg-red-600 text-white font-black rounded-xl"
                              >
                                Flag as Fraud
                              </Button>
                            </AlertDialog.Footer>
                          </AlertDialog.Dialog>
                        </AlertDialog.Container>
                      </AlertDialog.Backdrop>
                    </AlertDialog>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Helper for Role Badges
function RoleBadge({ role }) {
  if (role === "admin") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00ADB5]/10 text-[#00ADB5] border border-[#00ADB5]/30 text-[10px] font-black uppercase tracking-widest rounded-md">
        <FaShieldAlt size={10} /> Admin
      </span>
    );
  }
  if (role === "vendor") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-[10px] font-black uppercase tracking-widest rounded-md">
        <FaUserTie size={10} /> Vendor
      </span>
    );
  }
  // Default User
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-500/10 text-zinc-400 border border-zinc-500/30 text-[10px] font-black uppercase tracking-widest rounded-md">
      <FaUser size={10} /> User
    </span>
  );
}
