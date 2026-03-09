// ============================================================
// useLoanNotifications.js
// ============================================================
import { useMemo } from "react";

export const WARNING_DAYS = 2; // H-2 → kuning

export function getDaysUntilDue(returnDateStr) {
  const due = new Date(returnDateStr);
  due.setHours(0, 0, 0, 0);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.ceil((due - now) / (1000 * 60 * 60 * 24));
}

export function getLoanUrgency(loan) {
  const days = getDaysUntilDue(loan.return_date);
  if (days < 0) return { level: "overdue", days, daysOverdue: Math.abs(days) };
  if (days <= WARNING_DAYS) return { level: "warning", days, daysLeft: days };
  return { level: "safe", days };
}

/**
 * @param {Array}  transactions  - array transaksi lengkap
 * @param {string} userId        - currentUser.id, misal "u001"
 */
export function useLoanNotifications(transactions, userId) {
  return useMemo(() => {
    const activeLoans = transactions.filter(
      (t) =>
        t.user_id === userId &&
        t.status === "ACTIVE" &&
        t.type === "BORROW"       // skip MAINTENANCE
    );

    const urgentLoans = activeLoans
      .map((t) => ({ ...t, urgency: getLoanUrgency(t) }))
      .filter((t) => t.urgency.level !== "safe")
      .sort((a, b) => a.urgency.days - b.urgency.days);

    const overdueCount = urgentLoans.filter((t) => t.urgency.level === "overdue").length;
    const warningCount = urgentLoans.filter((t) => t.urgency.level === "warning").length;
    const badgeCount   = overdueCount + warningCount;
    const badgeLevel   = overdueCount > 0 ? "overdue" : warningCount > 0 ? "warning" : "safe";

    return { urgentLoans, overdueCount, warningCount, badgeCount, badgeLevel };
  }, [transactions, userId]);
}