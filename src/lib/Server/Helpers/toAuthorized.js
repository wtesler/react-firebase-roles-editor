/**
 * Adds the proper authorization headers to a request.
 */
export default function toAuthorized(authToken) {
  return function (request) {
    request.set('Authorization', 'Bearer ' + authToken);
    return request;
  };
};