import type { UTCDateMini } from '@date-fns/utc/date/mini'
import type { Match } from '../../../locale/types'
import setISOWeek from '../../../setISOWeek/index'
import startOfISOWeek from '../../../startOfISOWeek/index'
import { numericPatterns } from '../constants'
import { Parser } from '../Parser'
import type { ParseFlags, ParseResult } from '../types'
import { parseNDigits, parseNumericPattern } from '../utils'

// ISO week of year
export class ISOWeekParser extends Parser<number> {
  priority = 100

  parse(dateString: string, token: string, match: Match): ParseResult<number> {
    switch (token) {
      case 'I':
        return parseNumericPattern(numericPatterns.week, dateString)
      case 'Io':
        return match.ordinalNumber(dateString, { unit: 'week' })
      default:
        return parseNDigits(token.length, dateString)
    }
  }

  validate(_date: Date, value: number): boolean {
    return value >= 1 && value <= 53
  }

  set(date: UTCDateMini, _flags: ParseFlags, value: number): UTCDateMini {
    return startOfISOWeek(setISOWeek(date, value))
  }

  incompatibleTokens = [
    'y',
    'Y',
    'u',
    'q',
    'Q',
    'M',
    'L',
    'w',
    'd',
    'D',
    'e',
    'c',
    't',
    'T',
  ]
}
