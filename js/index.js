const root = document.getElementById("root");
const mainContainer = document.createElement("div");

const addActive = (tabLink) => {
  let areActive = document.querySelectorAll(".active");
  if (areActive.length > 0) {
    areActive[0].classList.remove("active");
  }
  tabLink.classList.add("active");
};

const header = () => {
  let headerContainer = document.createElement("div");
  headerContainer.classList.add("ui", "inverted", "segment");
  let nav = document.createElement("nav");
  nav.classList.add("ui", "inverted", "secondary", "menu");
  let tabs = ["My Portfolio", "About Me", "My Projects", "Contact Me"];
  tabs.forEach((tab) => {
    let tabLink = document.createElement("a");
    tabLink.classList.add("item");
    tabLink.innerText = tab;
    nav.appendChild(tabLink);
    tabLink.addEventListener("click", () => {
      startPage(tab);
      addActive(tabLink);
    });
  });
  headerContainer.appendChild(nav);
  root.appendChild(headerContainer);
};

const startPage = async (tab) => {
  if (tab === "About Me") {
    mainContainer.innerHTML =
      "<h2>About Me</h2> <p>Welcome to my portfolio, here you will be able to see my portfolio </p>";
  } else if (tab === "My Projects") {
    await displayProjects();
  } else if (tab === "Contact Me") {
    await displayCntacts(); //mainContainer.innerHTML = "<h2>Contact Me</h2> <p>e-mail</p>";
  } else {
    mainContainer.innerHTML = "<h2>Hallo World</h2>";
  }
  mainContainer.classList.add("ui", "container");
  root.appendChild(mainContainer);
};

const displayProjects = async () => {
  let response = await (await fetch("./js/projects.json")).json();
  let projects = response.projects;
  mainContainer.innerHTML = "";
  const projectsContainer = document.createElement("div");
  projectsContainer.classList.add("ui", "cards");
  projects.forEach((project) => {
    let card = document.createElement("div");
    let image = document.createElement("div");
    let cardContent = document.createElement("div");
    let cardDescription = document.createElement("div");
    card.classList.add("ui", "card");
    image.classList.add("image");
    image.innerHTML = `<img src=${project.image}/>`;
    cardContent.classList.add("content");
    cardContent.innerHTML = `<a class='header'>${project.title} </a>`;
    cardDescription.classList.add("description");
    cardDescription.innerText = project.description;
    card.append(image, cardContent, cardDescription);
    projectsContainer.appendChild(card);
  });
  mainContainer.appendChild(projectsContainer);
};

const displayCntacts = async () => {
  let response = await (await fetch("./js/contacts.json")).json();
  let contacts = response.contacts;
  mainContainer.innerHTML = "";
  const contactsContainer = document.createElement("div");
  contactsContainer.classList.add("ui", "cards");
  contacts.forEach((contact) => {
    let card = document.createElement("div");
    let linkedin = document.createElement("div");
    let number = document.createElement("div");
    let image = document.createElement("div");
    let cardContent = document.createElement("div");
    let cardDescription = document.createElement("div");
    card.classList.add("ui", "card");
    image.classList.add("image");
    image.innerHTML = `<img src=${contact.image}/>`;
    linkedin.classList.add("linkedin");
    linkedin.innerHTML = `<a class='header'>${contact.linkedin}</a>`;
    cardContent.classList.add("content");
    cardContent.innerHTML = `<a class='header'>${contact.email} </a>`;
    number.classList.add("number");
    number.innerHTML = `<a class='header'>${contact.number}</a>`;
    card.append(image, linkedin, cardContent, number);
    contactsContainer.appendChild(card);
  });
  mainContainer.appendChild(contactsContainer);
};

const footer = () => {
  let footer = document.createElement("footer");
  footer.innerHTML = "<h4>Made with HTML, CSS & JS</h4>";
  root.appendChild(footer);
};

document.addEventListener("DOMContentLoaded", () => {
  header();
  startPage();
  footer();
});
