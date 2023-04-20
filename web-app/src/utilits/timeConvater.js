import moment from "moment/moment";

export class Time {
  static MsToClock(timestamp) {
    const localTime = moment(timestamp).format("LTS");
    return localTime;
  }
}
