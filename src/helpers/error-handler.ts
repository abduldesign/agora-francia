import { toast } from 'react-toastify';
export const handleApiErrors = (
  error: any, // Adjust the type based on your actual error response
  router: any
): string => {
  if (error.response) {
    const { data } = error.response;

    if (data && data.status === 'Failed' && data.errors && data.errors.length > 0) {
      const errorMessages = data.errors.map((errorItem:any) => {
        const { error_code, message } = errorItem;

        switch (error_code) {
          case 'EMAIL_NOT_VERIFIED':
            // Redirect the user to the verification page
            router.push('/user/register-confirm');
            break;

          // Add more cases for other error codes if needed

          default:
            console.error(`Unhandled error code: ${error_code}`);
            break;
        }

        // Display a toast with the error message
        toast.error(message);

        // Return the error message for further handling if necessary
        return message;
      });

      // You can also return or log the error messages array for further handling if necessary
      return errorMessages.join('\n');
    }
  }

  console.error('An unexpected error occurred:', error);

  // Return a generic error message
  const genericErrorMessage = 'An unexpected error occurred. Please try again.';
  toast.error(genericErrorMessage);

  return genericErrorMessage;
};
