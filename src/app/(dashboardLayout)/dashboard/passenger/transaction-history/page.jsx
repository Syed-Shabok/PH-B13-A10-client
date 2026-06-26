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
    <div className="p-6 relative overflow-hidden min-h-screen">
      <DashboardHeading
        title="Transaction History"
        description="Review your past billing receipts, payment statuses, and ticket expenditures."
      />

      <TransactionHistoryClient transactions={transactions} />
    </div>
  );
}
