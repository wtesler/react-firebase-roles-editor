import toResilient from './Helpers/toResilient';
import toSuccessResponse from './Helpers/toSuccessResponse';
import errorThrowsBody from './Helpers/errorThrowsBody';
import toAuthorized from './Helpers/toAuthorized';

const request = require('superagent');

export class ServerClient {
  static READ_USER_ROLES = 'readUserRolesAuthorized';
  static UPDATE_USER_ROLE = 'updateUserRolesAuthorized';

  host = null; // Set in RolesScreen.js from a prop.

  constructor(loginManager) {
    this.loginManager = loginManager;
  }

  destruct() {
  }

  async readUserRoles(pageToken = undefined, claim = null, email = null, requests) {
    const endpoint = ServerClient.READ_USER_ROLES;

    const idToken = await this._getIdToken();

    const req = request
      .get(this.host + endpoint)
      .query({
        pageToken: pageToken,
        claim: claim,
        email: email,
      })
      .use(toResilient())
      .use(toAuthorized(idToken));

    if (requests) {
      requests.add(req);
    }

    try {
      const networkResponse = await req;
      const serverResponse = toSuccessResponse(networkResponse);
      const users = serverResponse.users;
      return users;
    } catch (e) {
      errorThrowsBody(endpoint, e);
    }
  }

  async updateUserRole(uid, roles, requests) {
    const endpoint = ServerClient.UPDATE_USER_ROLE;

    const idToken = await this._getIdToken();

    const req = request
      .post(this.host + endpoint)
      .send({
        uid: uid,
        roles: roles,
      })
      .use(toResilient())
      .use(toAuthorized(idToken));

    if (requests) {
      requests.add(req);
    }

    try {
      const networkResponse = await req;
      toSuccessResponse(networkResponse);
    } catch (e) {
      errorThrowsBody(endpoint, e);
    }
  }

  async _getIdToken() {
    const user = await this.loginManager.awaitUser();
    if (!user) {
      return null;
    }
    return user.getIdToken(false);
  }
}