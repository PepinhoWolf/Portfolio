import en from "./translations/en.js";
import es from "./translations/es.js";

const translations = { en, es };

// Custom translation tools, no dependencies here!
function t(key, selectedLanguage = "en") {
  // If the key contains a dot, split and reduce
  if (key.includes('.')) {
    return key.split('.').reduce((obj, k) => obj?.[k], translations[selectedLanguage]);
  }
  // Otherwise, just return the top-level value
  return translations[selectedLanguage][key];
}


export function setTextTranslations(selectedLanguage = "en") {
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.dataset.translate;
    const value = t(key, selectedLanguage);
    if (value) {
      if (value.includes('<')) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    }
  });
}


export function setRolesLoop(selectedLanguage = "en") {
  const rolesEl = document.querySelector(".js-greeting-role");
  if (!rolesEl) return;

  let rolesValues = translations[selectedLanguage].rolesValues;
  let EERoleValues = translations[selectedLanguage].EERoleValues;

  let selectedRole = rolesValues[0];
  rolesEl.textContent = selectedRole;

  let roleIndex = 0;
  let EEroleIndex = Math.floor(Math.random() * EERoleValues.length);
  let roleLoopCounter = 0;
  let allowedRoleEE = false;

  setInterval(() => {
    if (roleLoopCounter > 5) allowedRoleEE = true;

    const randomNum = Math.random();
    if (allowedRoleEE && randomNum < 0.05) {
      selectedRole = EERoleValues[EEroleIndex];
    } else {
      selectedRole = rolesValues[roleIndex];
    }

    rolesEl.textContent = selectedRole;

    roleIndex = (roleIndex + 1) % rolesValues.length;
    EEroleIndex = (EEroleIndex + 1) % EERoleValues.length;
    roleLoopCounter++;
  }, 2000);
}