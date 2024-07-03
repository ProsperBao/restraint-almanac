import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

/**
 * Calculate the date of a specific solar term in a given year.
 * @param year The year.
 * @param termIndex The index of the solar term (0-23).
 * @returns The date of the solar term.
 */
export function calculateTermDate(year: number, termIndex: number): Dayjs {
  const baseDate = dayjs(`${year}-01-06`).add(termIndex * 15.2, 'days')
  return baseDate
}

/**
 * Calculate the day of the year for a given date.
 * @param date The date.
 * @returns The day of the year.
 */
export function getDayOfYear(date: Dayjs): number {
  const startOfYear = dayjs(`${date.year()}-01-01`)
  return date.diff(startOfYear, 'day') + 1
}

/**
 * Calculate the number of days between two dates.
 * @param startDate The start date.
 * @param endDate The end date.
 * @returns The number of days between the two dates.
 */
export function calculateDaysBetween(startDate: Dayjs, endDate: Dayjs): number {
  return Math.abs(endDate.startOf('day').diff(startDate.startOf('day'), 'days'))
}

/**
 * Get the solar term information for a given date.
 * @param date The date.
 * @returns The solar term information (index of the term and whether it is the term day).
 */
export function getTermInfo(date: Dayjs): [number, number] | null {
  try {
    const year = date.year()
    const dayOfYear = getDayOfYear(date) - 1
    let termIndex = 0
    let isTermDay = 0

    for (let i = 0; i < 24; i++) {
      const termDate = calculateTermDate(year, i)
      const termDayOfYear = getDayOfYear(termDate)

      if (termDayOfYear > dayOfYear) {
        termIndex = i
        isTermDay = 0
        break
      }
      else if (termDayOfYear === dayOfYear) {
        termIndex = i
        isTermDay = 1
        break
      }
    }

    const totalTermsBeforeDate = termIndex + (year - 1900) * 24 - 24
    return [totalTermsBeforeDate, isTermDay]
  }
  catch (e) {
    return null
  }
}

/**
 * Calculate the Ganzhi fields for a given date.
 * @param date The date.
 * @returns The Ganzhi fields.
 */
export function calculateFields(date: Dayjs): string {
  const fields: [string, string] = ['-1', '-1']
  const termInfo = getTermInfo(date)

  if (termInfo && termInfo.length === 2) {
    const [totalTerms, isTermDay] = termInfo
    let offsetDayCount = Math.floor(totalTerms % 2 === 0 ? totalTerms / 2 : totalTerms / 2 + 1)

    if (isTermDay > 0 && totalTerms % 2 === 0)
      offsetDayCount += 1

    const baseDate = dayjs('1901-01-01')
    const daysSinceBaseDate = calculateDaysBetween(baseDate, date)
    fields[0] = `${(15 + daysSinceBaseDate) % 60}`
    fields[1] = `${Math.floor(Math.abs((5 + daysSinceBaseDate - offsetDayCount) % 12))}`
  }

  return `${fields[1]}-${fields[0]}`
}
