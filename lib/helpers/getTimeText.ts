// Updated getTimeLabel function in getTimeText.ts
import {
  isToday,
  isYesterday,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  startOfDay
} from 'date-fns'

export function getTimeLabel(date: Date): string {
  const now = new Date()
  // Normalize dates to start of day for accurate comparison
  const todayStart = startOfDay(now)
  const dateStart = startOfDay(date)

  if (isToday(dateStart)) return 'today'
  if (isYesterday(dateStart)) return 'yesterday'

  const daysAgo = differenceInDays(dateStart,todayStart)
  if (daysAgo == 1) return 'yesterday'
  if (daysAgo === 2) return '2 days ago'
  if (daysAgo < 7) return `${daysAgo} days ago`
  if (daysAgo < 30) return '7 days ago'

  const monthsAgo = differenceInMonths(dateStart,todayStart)
  if (monthsAgo === 1) return '1 month ago'
  if (monthsAgo <= 11) return `${monthsAgo} months ago`

  const yearsAgo = differenceInYears(dateStart,todayStart)
  if (yearsAgo === 1) return '1 year ago'
  if (yearsAgo <= 5) return `${yearsAgo} years ago`

  return '5+ years ago'
}