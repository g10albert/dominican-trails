const trails = [
  {
    id: 1,
    name: "Pico Duarte Summit",
    location: "Cordillera Central",
    difficulty: "Hard",
    distance: 46,
    image: "pico-duarte.jpg",
    description:
      "The highest peak in the Caribbean, requiring a multi-day trek.",
  },
  {
    id: 2,
    name: "El Limón Waterfall",
    location: "Samaná",
    difficulty: "Easy",
    distance: 2.5,
    image: "el-limon.jpg",
    description:
      "A short, beautiful journey, often done by horseback, to a majestic cascade.",
  },
  {
    id: 3,
    name: "27 Charcos of Damajagua",
    location: "Puerto Plata",
    difficulty: "Moderate",
    distance: 7,
    image: "damajagua-waterfall.jpg",
    description:
      "An exhilarating path involving jumping, sliding, and swimming through 27 natural pools.",
  },
  {
    id: 4,
    name: "Valle Nuevo National Park",
    location: "Constanza",
    difficulty: "Moderate",
    distance: 12,
    image: "valle-nuevo.jpg",
    description:
      "Known for its unique cold climate and pine forests, offering scenic high-altitude hikes.",
  },
  {
    id: 5,
    name: "Hoyos del Edén",
    location: "Cap Cana",
    difficulty: "Easy",
    distance: 1.5,
    image: "hoyos-del-eden.jpg",
    description:
      "A short walk leading to a stunning cenote perfect for swimming.",
  },
];

function updateYear() {
  const yearElement = document.getElementById("currentyear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

function updateLastModified() {
  const lastModifiedElement = document.getElementById("lastmodified");
  if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
  }
}

function setupNavToggle() {
  const menuButton = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }
}

function displayTrails(trailArray) {
  const trailsContainer = document.getElementById("trail-listing");
  if (!trailsContainer) return;

  trailsContainer.innerHTML = "";

  trailArray.forEach((trail) => {
    let difficultyClass = "";

    if (trail.difficulty === "Hard") {
      difficultyClass = "hard-level";
    } else if (trail.difficulty === "Moderate") {
      difficultyClass = "moderate-level";
    } else {
      difficultyClass = "easy-level";
    }

    const trailHTML = `
            <article class="trail-card">
                <img src="images/${trail.image}" alt="${trail.name}" 
                    loading="lazy" class="trail-image" width="400" height="250">
                <div class="card-details">
                    <h3 class="trail-name">${trail.name}</h3>
                    <p class="trail-location">Location: ${trail.location}</p>
                    <p class="trail-distance">Distance: ${trail.distance} km (R/T)</p>
                    <p class="trail-difficulty ${difficultyClass}">Difficulty: <strong>${trail.difficulty}</strong></p>
                    <p class="trail-description">${trail.description}</p>
                </div>
            </article>
        `;
    trailsContainer.innerHTML += trailHTML;
  });
}

function applyFiltersAndSort() {
  const filterSelect = document.getElementById("difficulty-filter");
  const sortSelect = document.getElementById("sort-distance");
  const applyButton = document.getElementById("apply-filters");

  if (!filterSelect || !sortSelect || !applyButton) return;

  applyButton.addEventListener("click", () => {
    let filteredTrails = [...trails];

    const selectedDifficulty = filterSelect.value;
    const selectedSort = sortSelect.value;

    if (selectedDifficulty !== "all") {
      filteredTrails = filteredTrails.filter(
        (trail) => trail.difficulty === selectedDifficulty
      );
    }

    if (selectedSort !== "none") {
      filteredTrails.sort((a, b) => {
        if (selectedSort === "asc") {
          return a.distance - b.distance;
        } else {
          return b.distance - a.distance;
        }
      });
    }

    displayTrails(filteredTrails);
  });
}

function setupFormSubmission() {
  const form = document.getElementById("trail-submit-form");
  const messageElement = document.getElementById("submission-message");

  if (!form || !messageElement) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const trailName = formData.get("trailName");

    const submission = {
      name: name,
      email: email,
      trail: trailName,
      date: new Date().toISOString(),
    };

    let submissions =
      JSON.parse(localStorage.getItem("trailSubmissions")) || [];

    submissions.push(submission);

    localStorage.setItem("trailSubmissions", JSON.stringify(submissions));

    messageElement.innerHTML = `
            <p>✅ Success! Thank you, <strong>${name}</strong>! Your suggestion for <strong>${
      trailName || "a new trail"
    }</strong> has been recorded.</p>
            <p>A total of **${
              submissions.length
            }** submissions are currently saved locally in your browser.</p>
        `;

    form.reset();
  });
}

updateYear();
updateLastModified();
setupNavToggle();

displayTrails(trails);
applyFiltersAndSort();
setupFormSubmission();
