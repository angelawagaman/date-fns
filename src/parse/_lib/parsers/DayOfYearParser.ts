import type { UTCDateMini } from '@date-fns/utc/date/mini'
import type { Match } from '../../../locale/types'
import { numericPatterns } from '../constants'
import { Parser } from '../Parser'
import type { ParseFlags, ParseResult } from '../types'
import { isLeapYearIndex, parseNDigits, parseNumericPattern } from '../utils'

export class DayOfYearParser extends Parser<number> {
  priority = 90

  subpriority = 1

  parse(dateString: string, token: string, match: Match): ParseResult<number> {
    switch (token) {
      case 'D':
      case 'DD':
        return parseNumericPattern(numericPatterns.dayOfYear, dateString)
      case 'Do':
        return match.ordinalNumber(dateString, { unit: 'date' })
      default:
        return parseNDigits(token.length, dateString)
    }
  }

  validate(date: Date, value: number): boolean {
    const year = date.getUTCFullYear()
    const isLeapYear = isLeapYearIndex(year)
    if (isLeapYear) {
      return value >= 1 && value <= 366
    } else {
      return value >= 1 && value <= 365
    }
  }

  set(date: UTCDateMini, _flags: ParseFlags, value: number): UTCDateMini {
    date.setMonth(0, value)
    date.setHours(0, 0, 0, 0)
    return date
  }

  incompatibleTokens = [
    'Y',
    'R',
    'q',
    'Q',
    'M',
    'L',
    'w',
    'I',
    'd',
    'E',
    'i',
    'e',
    'c',
    't',
    'T',
  ]
}
