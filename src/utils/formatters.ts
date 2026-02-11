export function formatFunding(amount: number | null): string {
  if (amount === null) return 'Unknown';

  if (amount >= 1_000_000_000) {
    return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  }
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(0)}M`;
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(0)}K`;
  }
  return `$${amount}`;
}

export function formatYear(year: number | null): string {
  if (year === null) return 'Unknown';
  return year.toString();
}

export function formatYearRange(
  foundedYear: number | null,
  shutdownYear: number | null
): string {
  const founded = formatYear(foundedYear);
  const shutdown = formatYear(shutdownYear);
  return `${founded} - ${shutdown}`;
}
