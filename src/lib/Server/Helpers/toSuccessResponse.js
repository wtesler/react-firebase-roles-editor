/**
 * Return the server response if everything is OK or throws an error.
 */
export default function toSuccessResponse(networkResponse) {
  const serverResponse = JSON.parse(networkResponse.text);
  const code = serverResponse.code;
  if (code !== 200) {
    throw serverResponse;
  }
  return serverResponse;
};