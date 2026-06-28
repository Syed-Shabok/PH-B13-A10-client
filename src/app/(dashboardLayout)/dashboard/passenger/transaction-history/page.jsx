import DashboardHeading from "@/components/dashboard/DashboardHeading";
import { getUserSession } from "@/lib/core/session";
import { getPassengerTransactions } from "@/lib/api/payments";
import TransactionHistoryClient from "./TransactionHistoryClient";

export default async function TransactionHistoryPage() {
  const user = await getUserSession();

  // Fetch transactions securely using the session email
  let transactions = await getPassengerTransactions(user?.email);

  // Strict validation to prevent ChunkLoad or mapping errors
  if (!Array.isArray(transactions)) {
    console.error("Failed to load transaction history array:", transactions);
    transactions = [];
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#091624] px-6 py-12 relative overflow-hidden transition-colors duration-300">
      <DashboardHeading
        title="Transaction History"
        description="Review your past billing receipts, payment statuses, and ticket expenditures."
      />

      {/* Client layout section */}
      <TransactionHistoryClient transactions={transactions} />

      {/* Matching Background Ambient Glow Objects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00ADB5]/10 dark:bg-[#124170]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#67C090]/10 dark:bg-[#AAFFC7]/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
