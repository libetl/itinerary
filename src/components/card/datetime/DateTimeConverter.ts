const fakeDate = "2000-01-15";
const fakeDateTime = `${fakeDate}T12:00:00.000`;
const currentLocale = () => navigator.languages?.[0] ?? navigator.language;

const zeroPad = (value: number) => (value < 10 ? "0" : "") + value;

export const dateAsText: (
  date: Itinerary.Date,
  format?: string,
  dontDisplayYears?: boolean
) => string = (date, format, dontDisplayYears) => {
  const nativeDate = new Date(Date.UTC(date.year, date.month - 1, date.day));
  return new Intl.DateTimeFormat(currentLocale(), {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: format || dontDisplayYears ? undefined : "numeric",
  }).format(nativeDate);
};

export const diffBetweenTimezones: (
  timezone?: string,
  diffTimezone?: string
) => Itinerary.Time = (timezone, diffTimezone) => {
  const timezoneDate = new Date(
    `${fakeDateTime}${timezone ?? "+00:00"}`
  ).getTime();
  const diffTimezoneDate = new Date(
    `${fakeDateTime}${diffTimezone ?? "+00:00"}`
  ).getTime();
  const minutes = (timezoneDate - diffTimezoneDate) / 60e3;
  return { hour: minutes / 60, minutes: minutes % 60 };
};

export const timezoneDiffToUtcOffset: (
  timezoneDiff: Itinerary.Time
) => string = ({ hour: diffInHours, minutes: diffInMinutes }) =>
  `${diffInHours >= 0 ? "+" : "-"}${zeroPad(Math.abs(diffInHours))}:${zeroPad(
    diffInMinutes
  )}`;

export const timeAsText: (
  time: Itinerary.Time,
  timezone?: string,
  diffTimezone?: string
) => string = (time, timezone, diffTimezone) => {
  const date = new Date(
    `${fakeDate}T${zeroPad(time.hour)}:${zeroPad(
      time.minutes
    )}:00.000${timezoneDiffToUtcOffset(
      diffBetweenTimezones(timezone, diffTimezone)
    )}`
  );
  return new Intl.DateTimeFormat(currentLocale(), {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const datetimeAsText: (
  date: Itinerary.Date,
  time: Itinerary.Time,
  timezone?: string
) => string = (date, time, timezone) => {
  const nativeDate = new Date(
    `${date.year}-${zeroPad(date.month - 1)}-${zeroPad(date.day)}T${time.hour}:${
      time.minutes
    }:00.000${timezone ?? "+00:00"}`
  );
  return new Intl.DateTimeFormat(currentLocale(), {
    dateStyle: "full",
    timeStyle: "long",
  }).format(nativeDate);
};

export const diffDates: (
  date: Itinerary.Date,
  diffDate: Itinerary.Date,
  diffPlusOneDay?: boolean
) => number = (date, diffDate, diffPlusOneDay) =>
  (new Date(`${date.year}-${zeroPad(date.month)}-${zeroPad(date.day)}T00:00:00.000Z`).getTime() +
    (diffPlusOneDay ? 864e5 : 0) -
    new Date(
      `${diffDate.year}-${zeroPad(diffDate.month)}-${zeroPad(diffDate.day)}T00:00:00.000Z`
    ).getTime()) /
  864e5;

export const diffDateTimes: (
  date: Itinerary.Date,
  diffDate: Itinerary.Date,
  time: Itinerary.Time,
  diffTime: Itinerary.Time,
  timezone?: string,
  diffTimezone?: string,
  diffPlusOneDay?: boolean
) => string = (
  date,
  diffDate,
  time,
  diffTime,
  timezone,
  diffTimezone,
  diffPlusOneDay
) => {
  const time1 =
    new Date(
      `${date.year}-${zeroPad(date.month)}-${zeroPad(date.day)}T${zeroPad(time.hour)}:${zeroPad(
        time.minutes
      )}:00.000${timezone ?? "+00:00"}`
    ).getTime() + (diffPlusOneDay ? 864e5 : 0);
  const time2 = new Date(
    `${diffDate.year}-${zeroPad(diffDate.month)}-${zeroPad(diffDate.day)}T${zeroPad(diffTime.hour)}:${
      zeroPad(diffTime.minutes)
    }:00.000${diffTimezone ?? "+00:00"}`
  ).getTime();
  const diff = time1 - time2;
  const inSeconds = diff / 1e3;
  const seconds = Math.floor(inSeconds % 60);

  const inMinutes = inSeconds / 60;
  const minutes = Math.floor(inMinutes % 60);

  const inHours = inMinutes / 60;
  const hours = Math.floor(inHours % 24);

  const days = Math.floor(inHours / 24);

  const relativeTimeFormat = new Intl.RelativeTimeFormat(currentLocale(), {
    numeric: "auto",
  });

  return [
    ...(days < 1 ? [] : relativeTimeFormat.formatToParts(days, "days")),
    ...(hours < 1 ? [] : relativeTimeFormat.formatToParts(hours, "hours")),
    ...(minutes < 1 ? [] : relativeTimeFormat.formatToParts(minutes, "minutes")),
    ...(seconds < 1 ? [] : relativeTimeFormat.formatToParts(seconds, "seconds")),
  ].map(obj => obj.value).join(" ");
};
