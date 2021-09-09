import toResilient from './Helpers/toResilient';
import toSuccessResponse from './Helpers/toSuccessResponse';
import errorThrowsBody from './Helpers/errorThrowsBody';
import toAuthorized from './Helpers/toAuthorized';
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';

const request = require('superagent');

export class ServerClient {
  static READ_USER_ROLES = 'readUserRolesAuthorized';
  static UPDATE_USER_ROLE = 'updateUserRoleAuthorized';

  host = null; // Set in RolesScreen.js from a prop.

  constructor() {
    this.firebaseAuth = getAuth();

    let outerResolve;
    this.userPromise = new Promise((resolve, reject) => {
      outerResolve = resolve;
    });

    this.firebaseListenerCancellable = onAuthStateChanged(this.firebaseAuth, user => {
      this.user = user;
      outerResolve();
    });
  }

  destruct() {
    this.firebaseListenerCancellable();
  }

  async getIdToken() {
    await this.userPromise;
    if (!this.user) {
      return null;
    }
    return this.user.getIdToken(false);
  }

  async readUserRoles(requests) {
    const endpoint = ServerClient.READ_USER_ROLES;

    const idToken = await this.getIdToken();

    const req = request
      .get(this.host + endpoint)
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

    const idToken = await this.getIdToken();

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
}