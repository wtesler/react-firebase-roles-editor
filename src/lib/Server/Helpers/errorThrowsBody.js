/**
 * If the request has an error response, we throw the error's body.
 */
export default function errorThrowsBody(endpoint, e) {
  if (e.response && e.response.body) {
    const body = e.response.body;
    body.endpoint = endpoint;
    body.code = e.response.statusCode;
    throw body;
  } else {
    e.endpoint = endpoint;
    throw e;
  }
};
