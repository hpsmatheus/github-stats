import { getDate, getMonth, getYear, parseISO } from 'date-fns';
export default class DateUtil {
  public static toString(date: string): string {
    const value = parseISO(date);
    const day = getDate(value);
    const month = getMonth(value) + 1;
    const year = getYear(value);
    return `${year}-${month}-${day}T00:00:00Z`;
  }
}
