/**
 * Validates an email address format
 * @param email Email address to validate
 * @returns Boolean indicating if the email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

/**
 * Validates phone number format
 * @param phone Phone number to validate
 * @returns Boolean indicating if the phone number is valid
 */
export const isValidPhone = (phone: string): boolean => {
  // Basic validation - customize as needed
  const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/;
  return phoneRegex.test(phone);
};