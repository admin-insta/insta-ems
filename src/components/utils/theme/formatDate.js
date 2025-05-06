// src/utils/formatDate.js
import { format } from 'date-fns';

/**
 * Formats an ISO date string to 'dd MMM yyyy' (e.g., "20 Apr 2025").
 * @param {string | Date} date - The date to format.
 * @param {string} dateFormat - Optional format string.
 * @returns {string} Formatted date string.
 */
const formatDate = (date, dateFormat = 'dd MMM yyyy') => {
  if (!date) return '';
  try {
    return format(new Date(date), dateFormat);
  } catch (error) {
    console.error('Invalid date:', date);
    return '';
  }
};
export default formatDate
