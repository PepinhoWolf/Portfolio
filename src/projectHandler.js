import projects from "./projectsData.js";

export default function setAllProjects(selectedLanguage = "en") {
  const projectContainer = document.querySelector(".js-projects-container");
  projectContainer.innerHTML = projects
    .filter(project => project.show)
    .map(project => `
      <div class="project-card">
        <h3>${project.title[selectedLanguage]}</h3>
        <p>${project.description[selectedLanguage]}</p>
        <a href="${project.link}">View Project</a>
      </div>
    `)
    .join("");
}