## react-firebase-roles-editor

Frontend editor interface to perform CRUD operations on CMS data.

### Usage
Ensure Firebase has been initialized before anything else is done.

```
const RolesScreen = import('firestore-roles-editor');
// ...
// Route to it
// ...
<Route path={ROUTE_CMS}><RolesScreen/></Route>
```

### Firebase config for test environment:

See `FIREBASE_CONFIG_README.md` in `src/Config`.

You add the config file `FIREBASE_CONFIG.json` at that level.

That config file gets ignored by version control.

### For Developer

Remember to `npm run build` before `npm publish`.