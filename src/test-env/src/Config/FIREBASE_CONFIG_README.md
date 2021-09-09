Insert a json file called `FIREBASE_CONFIG.json` as a sibling to this file. It should look something like:
```
{
"apiKey": "API_KEY",
"authDomain": "AUTH_DOMAIN",
"projectId": "PROJECT ID",
"storageBucket": "STORAGE BUCKET",
"appId": "APP_ID"
}
```

This file WILL NOT BE COMMITTED to version control. Check `.gitignore`.

You can usually copy/paste this from Firebase project settings.
