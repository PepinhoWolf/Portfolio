import { pageTextByLanguage, rolesValues, EERoleValues } from "./pageTextByLanguage.js";
let selected_language = "en";

function setTextTranslations() {
    for (let tag in pageTextByLanguage) {
        const el = document.querySelector(`.${tag}`);
        if (el) {
        el.innerHTML = pageTextByLanguage[tag][selected_language];
    }
}
}
function setRolesLoop(){
    const rolesEl = document.querySelector(".js-greeting-role");
    if (!rolesEl) return; // safety check

    let selected_role = rolesValues[0];
    rolesEl.innerHTML = selected_role;

    let roleIndex = 0;
    let EEroleIndex = Math.floor(Math.random() * EERoleValues.length);
    let roleLoopCounter = 0;
    let allowedRoleEE = false;

    // Loop roles
    setInterval(() => {
        if (roleLoopCounter > 5) {
            allowedRoleEE = true;
        }

        const randomNum = Math.random();
        if (allowedRoleEE && randomNum < 0.05) {
            selected_role = EERoleValues[EEroleIndex];
        } else {
            selected_role = rolesValues[roleIndex];
        }

        rolesEl.innerHTML = selected_role;

        roleIndex = (roleIndex + 1) % rolesValues.length;
        EEroleIndex = (EEroleIndex + 1) % EERoleValues.length;
        roleLoopCounter++;
    }, 2000);
};

document.addEventListener("DOMContentLoaded", () => {
  setTextTranslations();
  setRolesLoop();
  const languageSelect = document.querySelector(".js-language-select");
  languageSelect.addEventListener("change", () => {
    selected_language = languageSelect.value;
    setTextTranslations();
  });
  console.log("DOM fully loaded and parsed");
});