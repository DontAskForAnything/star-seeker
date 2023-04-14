/**
 * Check if the given string is a valid date in the format YYYY-MM-DD.
 * @param dateString A string representing a date in the format YYYY-MM-DD.
 * @returns True if dateString is a valid date, false otherwise.
 */
function isValidDate(dateString: string) {
  // Check if dateString is null, undefined or empty
  if (!dateString) return false;

  // Use regular expression to check the format of the dateString
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;

  // Split the dateString into year, month and day and validate each
  const [year, month, day] = dateString.split("-");
  if (Number(month) < 1 || Number(month) > 12) return false;

  // Create a date object from the dateString and validate the day
  const dateObj = new Date(dateString);
  if (Number(day) !== dateObj.getUTCDate()) return false;

  // Return true if dateString is a valid date
  return true;
}

/**
 * Get the current date as a string in the format YYYY-MM-DD.
 * @returns A string representing the current date in the format YYYY-MM-DD.
 */
function currentDay(): string {
  // Get the current date and format it as YYYY-MM-DD
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Format a given date object as a string in the format YYYY-MM-DD HH:MM in UTC time.
 * @param date A date object to be formatted.
 * @returns A string representing the date in the format YYYY-MM-DD HH:MM.
 */
function timeFormatter(date: Date): string {
  // Format a date object as YYYY-MM-DD HH:MM in UTC time
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export { isValidDate, currentDay, timeFormatter };
