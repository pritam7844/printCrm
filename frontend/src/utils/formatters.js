export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);

export const formatShortDate = (date) =>
  new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short'
  }).format(new Date(date));

export const getDeadlineStatus = (deadline) => {
  const now = new Date('2026-05-29T00:00:00+05:30');
  const due = new Date(deadline);
  const days = Math.ceil((due - now) / 86400000);

  if (days < 0) return { label: 'Overdue', colorClass: 'bg-system-redLight text-system-red', days };
  if (days <= 2) return { label: 'Due soon', colorClass: 'bg-system-amberLight text-system-amber', days };
  return { label: 'On track', colorClass: 'bg-system-greenLight text-system-green', days };
};
