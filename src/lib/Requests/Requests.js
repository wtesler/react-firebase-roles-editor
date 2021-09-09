/**
 * Handles the lifecycle of `superagent` requests.
 * Ensures that the request is aborted if the component is unmounted.
 *
 * Accessible as `props.requests` when using `withSubscription`.
 */
export class Requests {
  requests = [];

  add(request) {
    this.requests.push(request);
    request.on('end', () => {
      this.requests = this.requests.filter(r => r !== request);
    });
  }

  unmount() {
    for (const request of this.requests) {
      request.abort();
    }
    this.requests = [];
  }
}
