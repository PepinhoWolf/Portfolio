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

async function insertSVGIcon(containerClassName, iconName, link = "") {
  const containerEl = document.querySelector(`.${containerClassName}`);
  const linkEl = document.createElement("a");

  linkEl.href = link;
  linkEl.target = "_blank";

  try {
    // 1. Fetch the SVG file content
    const response = await fetch(`images/${iconName}.svg`);
    const svgText = await response.text();

    // 2. Inject the text directly as HTML
    linkEl.innerHTML = svgText;

    // // 3. Optional: Add a class for CSS styling
    // const svgEl = linkEl.querySelector('svg');
    // if (svgEl) svgEl.classList.add('injected-svg');

  } catch (error) {
    console.error(`Could not load SVG: ${iconName}`, error);
  }

  containerEl.appendChild(linkEl);
}

function insertAllIcons() {
  Promise.all([
    insertSVGIcon("js-social-links", "github", "https://github.com/PepinhoWolf"),
    insertSVGIcon("js-social-links", "linkedin", "https://linkedin.com/in/yourprofile")
  ]);
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
  insertAllIcons();
}
