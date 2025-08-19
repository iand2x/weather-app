/**
 * Type guard to check if an error object has a message property
 */
export const isErrorWithMessage = (
  error: unknown
): error is { message: string } => {
  return (
    error !== null &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string" &&
    error.message.length > 0
  );
};

/**
 * Safely extract error message from unknown error type
 */
export const getErrorMessage = (error: unknown): string => {
  if (isErrorWithMessage(error)) {
    return error.message;
  }
  return "Unable to fetch weather data. Please try again.";
};
