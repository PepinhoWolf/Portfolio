import { setTextTranslations, setRolesLoop } from "./translationHandler.js";
import setAllProjects from "./projectHandler.js";

// Variables
let selectedLanguage = "en";
const infoMap = [
    ["gmail", "horse", "cat", "osvaldo"],
    ["coco", "leandro", "jose", "truck"],
    ["@", "junk", ".", "none"],
    ["tronnes", "none", "com", "net"]
]
const languageSelect = document.querySelector(".js-language-select");
const copyButton = document.querySelector(".js-copy-button");

// Mail basic obfuscation, hello to those who want to read it. It isn't very secure but enough for most scrappers. :)
function getAssembledInfo() {
  return infoMap[1][1] + infoMap[2][2] + infoMap[3][0] + infoMap[2][0] + infoMap[0][0] + infoMap[2][2] + infoMap[3][2]
}

// EXECUTE
document.addEventListener("DOMContentLoaded", () => {
  MainLoop();
});

function MainLoop() {
  setTextTranslations();
  setRolesLoop();
  languageSelect.addEventListener("change", () => {
    selectedLanguage = languageSelect.value;
    setTextTranslations(selectedLanguage);
    setRolesLoop(selectedLanguage);
  });
  copyButton.addEventListener("click", () => {
    const textToCopy = getAssembledInfo();
    navigator.clipboard.writeText(textToCopy);
  });
  setAllProjects(selectedLanguage);
}
