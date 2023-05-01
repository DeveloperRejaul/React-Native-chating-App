import moment from "moment";

export class Time {
  static timeDiff(time) {
    const createdAt = moment(time);
    const currentTime = moment();
    const timeDiff = currentTime.diff(createdAt);
    return `${
      moment.duration(timeDiff).humanize() === "a few seconds"
        ? "Now"
        : moment.duration(timeDiff).humanize() + " ago"
    } `;
  }
}
