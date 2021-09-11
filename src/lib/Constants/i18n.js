export let ACCESS_DENIED = 'Access Denied.';
export let CLEAR_FILTER = 'Clear Filter';
export let EDIT_ROLES = 'Edit Roles';
export let FAILED_LOAD_ROLES = 'Failed to load user roles. Try reloading the page.';
export let FAILED_UPDATE_ROLE = 'Failed to update user role. Please try again.';
export let FILTER = 'Filter';
export let LOADING = 'Loading...';
export let SAVE = 'Save';
export let SAVING = 'Saving...';

function localize(code) {
  if (code.startsWith('zh')) {

  } else if (code.startsWith('es')) {

  }
}

class i18n {
  constructor() {
    try {
      const languageCode = window.navigator.language;
      localize(languageCode);
    } catch (e) {
      console.warn('Localization Failed');
      console.warn(e);
    }
  }
}

const i18nInstance = new i18n();

export default i18nInstance;
