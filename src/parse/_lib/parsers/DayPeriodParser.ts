import type { UTCDateMini } from '@date-fns/utc/date/mini'
import type { LocaleDayPeriod, Match } from '../../../locale/types'
import { Parser } from '../Parser'
import type { ParseFlags, ParseResult } from '../types'
import { dayPeriodEnumToHours } from '../utils'

// in the morning, in the afternoon, in the evening, at night
export class DayPeriodParser extends Parser<LocaleDayPeriod> {
  priority = 80

  parse(
    dateString: string,
    token: string,
    match: Match
  ): ParseResult<LocaleDayPeriod> {
    switch (token) {
      case 'B':
      case 'BB':
      case 'BBB':
        return (
          match.dayPeriod(dateString, {
            width: 'abbreviated',
            context: 'formatting',
          }) ||
          match.dayPeriod(dateString, {
            width: 'narrow',
            context: 'formatting',
          })
        )
      case 'BBBBB':
        return match.dayPeriod(dateString, {
          width: 'narrow',
          context: 'formatting',
        })
      case 'BBBB':
      default:
        return (
          match.dayPeriod(dateString, {
            width: 'wide',
            context: 'formatting',
          }) ||
          match.dayPeriod(dateString, {
            width: 'abbreviated',
            context: 'formatting',
          }) ||
          match.dayPeriod(dateString, {
            width: 'narrow',
            context: 'formatting',
          })
        )
    }
  }

  set(
    date: UTCDateMini,
    _flags: ParseFlags,
    value: LocaleDayPeriod
  ): UTCDateMini {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0)
    return date
  }

  incompatibleTokens = ['a', 'b', 't', 'T']
}
