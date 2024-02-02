import { formatInTimeZone } from "date-fns-tz";
//import { sub } from "date-fns";
import { Legacy } from "./api/brainly";


export default class TimeFns {
  tz: string;

  constructor() {
    Legacy.ReferenceData()
      .then(({ data }) => {
        this.tz = data.config.timezone;
      });
  }

  getNow() {
    return this.convertToTZ(new Date() + "", this.tz);
  }
  filterByTime(arr, fromDate: Date, toDate: Date) {
    return arr.filter(item => {
      let itemDate = this.convertToTZ(item["created"], this.tz);
      if (fromDate < itemDate && toDate > itemDate) {
        return item;
      }
    });
  }
  convertToTZ(date: string, tz: string) {
    return new Date(
      formatInTimeZone(
        new Date(date),
        tz,
        "yyyy-MM-dd HH:mm:ss"
      )
    );
  }
} 