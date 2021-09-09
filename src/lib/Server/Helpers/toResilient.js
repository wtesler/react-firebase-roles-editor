/**
 * Adds common network failure logic to a request.
 */
export default function toResilient () {
  return function (request) {
    request.timeout({
      response: 30000,
      deadline: 60000,
    });

    const isDevelopment = () => {
      return process.env.NODE_ENV === "development";
    }

    if (!isDevelopment) {
      request.retry(3);
    }

    return request;
  };
};
