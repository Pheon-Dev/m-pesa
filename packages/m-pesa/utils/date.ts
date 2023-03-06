export function doubleDigits(number: number) {
  if (number.toString().length <= 1) return "0" + number;
  return number;
}

export function dateDigits(date?: string, separator?: string) {
  let customDate = !date || date === "now" ? new Date() : new Date(date);

  const sep = separator ? separator : "";
  const timeSep = separator ? ":" : "";

  const YYYY = customDate.getFullYear();
  const MM = doubleDigits(customDate.getMonth() + 1);
  const DD = doubleDigits(customDate.getDate());
  const HH = doubleDigits(customDate.getHours());
  const mm = doubleDigits(customDate.getMinutes());
  const ss = doubleDigits(customDate.getSeconds());

  const newDate = YYYY + sep + MM + sep + DD;
  const time = HH + timeSep + mm + timeSep + ss;

  return newDate + " " + time;
}

export function date(when?: string, separator?: string) {
  const customDate = !when || when === "now" ? new Date() : new Date(when);

  const sep = separator ? separator : "";

  const YYYY = customDate.getFullYear();
  const MM = doubleDigits(customDate.getMonth() + 1);
  const DD = doubleDigits(customDate.getDate());

  const newDate = YYYY + sep + MM + sep + DD;

  return newDate;
}

export function time(when?: string, separator?: string) {
  let customDate = !when || when === "now" ? new Date() : new Date(when);

  const sep = separator ? ":" : "";

  const HH = doubleDigits(customDate.getHours());
  const mm = doubleDigits(customDate.getMinutes());
  const ss = doubleDigits(customDate.getSeconds());

  const time = HH + sep + mm + sep + ss;

  return time;
}

export function dateTime(when?: string, separator?: string) {
  const sep = separator ? ":" : "";

  return date(when, separator) + sep + time(when, separator);
}
