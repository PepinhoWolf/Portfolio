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
    const rolesEl = document.querySelector(".js-greeting-subtext");
    if (!rolesEl) return; // safety check

    let selected_role = rolesValues[0];
    rolesEl.innerHTML = "And I am a " + selected_role;

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
        if (allowedRoleEE && randomNum < 0.9) {
            selected_role = EERoleValues[EEroleIndex];
        } else {
            selected_role = rolesValues[roleIndex];
        }

        rolesEl.innerHTML = "And I am a " + selected_role;

        roleIndex = (roleIndex + 1) % rolesValues.length;
        EEroleIndex = (EEroleIndex + 1) % EERoleValues.length;
        roleLoopCounter++;
    }, 2000);
};

document.addEventListener("DOMContentLoaded", () => {
  setTextTranslations();
  setRolesLoop();
  console.log("DOM fully loaded and parsed");
});