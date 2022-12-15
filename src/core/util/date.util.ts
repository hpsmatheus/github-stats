import { getDate, getMonth, getYear } from 'date-fns';
export default class DateUtil {
  public static toString(date: Date): string {
    const day = getDate(date);
    const month = getMonth(date);
    const year = getYear(date);
    return `${year}-${month}-${day}T00:00:00Z`;
  }
}
