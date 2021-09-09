import * as queryString from 'query-string';

/**
 * Static helpers which make it easier to work with URLs.
 */
export class URLHelper {

  /**
   * Get last part of path i.e. "123" from "kk.com/p/123".
   * @param location A react-router location object.
   * @returns Last part of path
   */
  static getPathEnd(location) {
    return URLHelper.toSegments(location).pop();
  }

  /**
   * Does the url look like "somedomain/something/someId ?
   */
  static hasId(location) {
    return URLHelper.toSegments(location).length > 1;
  }

  /**
   * Gets the search object or the empty object {} if it doesn't exist.
   * @param location A react-router location object.
   * @returns An object. Never returns null/undefined.
   */
  static getSearchObject(location) {
    let params = queryString.parse(location.search);
    if (!params) {
      params = {};
    }
    return params;
  }

  static toSegments(location) {
    return location.pathname.split('/').filter(c => c);
  }

  static toNormalPath(location) {
    let path = location.pathname;
    if (path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    return path;
  }

  /**
   * If given a location that has query parameters, returns path without query parameters.
   */
  static getPathPart(location) {
    const normalPath = URLHelper.toNormalPath(location);
    const split = normalPath.split('?').filter(c => c);
    return split[0];
  }

  /**
   * Extracts the full url minus the query parameters
   */
  static getFullPathPart() {
    const fullUrl = window.location.href;
    const split = fullUrl.split('?').filter(c => c);
    return split[0];
  }

  static addQueryParam(param, value, location, history) {
    const params = URLHelper.getSearchObject(location);
    params[param] = value;

    history.push({
      pathname: location.pathname,
      search: queryString.stringify(params)
    });
  }

  static removeQueryParam(param, location, history) {
    const params = URLHelper.getSearchObject(location);
    delete params[param];

    history.push({
      pathname: location.pathname,
      search: queryString.stringify(params)
    });
  }
}
