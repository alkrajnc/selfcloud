const days = [
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type DateFormat = "short" | "long";

export function getDayName(id: number, format?: DateFormat) {
  return days[id];
}
export function getMonthName(id: number, format?: DateFormat) {
  if (format === "long") {
    return months[id];
  }
  return months[id]?.substring(0, 3);
}
