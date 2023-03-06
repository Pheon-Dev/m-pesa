
const doubleDigits = (number: number) => {
  if (number.toString().length <= 1) return "0" + number;
  return number;
}

const date = (when?: string, separator?: string) => {
  const customDate = !when || when === "now" ? new Date() : new Date(when);

  const sep = separator ? separator : "";

  const YYYY = customDate.getFullYear();
  const MM = doubleDigits(customDate.getMonth() + 1);
  const DD = doubleDigits(customDate.getDate());

  const newDate = YYYY + sep + MM + sep + DD;

  return newDate;
}

const time = (when?: string, separator?: string) => {
  let customDate = !when || when === "now" ? new Date() : new Date(when);

  const sep = separator ? ":" : "";

  const HH = doubleDigits(customDate.getHours());
  const mm = doubleDigits(customDate.getMinutes());
  const ss = doubleDigits(customDate.getSeconds());

  const time = HH + sep + mm + sep + ss;

  return time;
}

export const DateTime = (when?: string, separator?: string) => {
  const sep = separator ? ":" : "";

  return date(when, separator) + sep + time(when, separator);
}
