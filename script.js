import { fetchApiKey } from './api.js';
import { createStars, moveStars } from './star-animation.js';

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const apiKey = await fetchApiKey();
    console.log("API-nyckel hämtad:", apiKey);

    createStars(); // modul star-animatjon.js
    moveStars(); // modul star-animation.js
    await fetchplanetData(apiKey);
  } catch (error) {
    console.error("Fel vid hämtning av API-nyckel:", error);
  }
});

let planetData = []; // Array som sparar datan ifrån api med info om planeterna
let isDataLoaded = false
let hasFetchFailed = false
const maxTries = 3
let retryCount = 0
const planets = document.querySelectorAll(".planet-box section");
const planetModal = document.querySelector(".info-modal");
const planetBox = document.querySelector(".planet-box");

const fetchplanetData = async (apiKey) => {
  try {
    if (isDataLoaded) {
      console.log('data is loaded, no more attempt is needed')
      return
    }

    if (hasFetchFailed && retryCount >= maxTries) {
      console.log('maximum number of tries, try again later!')
      return
    }
    const response = await fetch(
      "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies",
      {
        method: "GET",
        headers: { "x-zocom": apiKey },
      }
    );
    const data = await response.json();

    console.log(data);

    if (data && Array.isArray(data.bodies)) {
      planetData = data.bodies;
      isDataLoaded = true
      hasFetchFailed = false
      retryCount = 0
      addPlanetEventListeners();
    }
  } catch (error) {
    console.log("failed to get data:", error);
    hasFetchFailed = true
    retryCount += 1
  } if (retryCount < maxTries) {
    console.log(`Försök att hämta data igen... (Försök ${retryCount}/${maxTries})`);
      fetchplanetData(apiKey); // Gör ett nytt försök
    } else {
      console.log("Max antal försök har uppnåtts. Vänligen försök igen senare.");
  }

};



const hideMain = () => {
  document.querySelector("main h1").style.display = "none";
  document.querySelector("main p").style.display = "none";
};

const showMain = () => {
  document.querySelector("main h1").style.display = "flex";
  document.querySelector("main p").style.display = "flex";
};

const hidePlanets = () => {
  planets.forEach(planet => {
    if (planet.id.toLowerCase() !== "solis") planet.style.display = "none";
  });
};

const colorSunBlue = () => {
  const sun = document.getElementById("solis");
  if (sun) sun.style.backgroundColor = "#418ed4";
};

const resetSunColor = () => {
  const sun = document.getElementById("solis");
  if (sun) sun.style.backgroundColor = "";
};

const showPlanets = () => {
  planets.forEach(planet => planet.style.display = "flex");
  resetSunColor();
};

const updatePlanetModal = (planetInfo) => {
  if (!planetInfo) return;

  document.getElementById("planet-title").textContent = planetInfo.name;
  document.getElementById("planet-title-latin").textContent = planetInfo.latinName;
  document.getElementById("planet-desc").textContent = planetInfo.desc;
  document.getElementById("circumference").textContent = `${planetInfo.circumference} km`;
  document.getElementById("distance").textContent = `${planetInfo.distance} km`;
  document.getElementById("max-temp").textContent = `${planetInfo.temp.day}°C`;
  document.getElementById("min-temp").textContent = `${planetInfo.temp.night}°C`;

  let moonsText = planetInfo.moons;
  if (Array.isArray(moonsText)) {
    moonsText = moonsText.join(', ');
  } else if (typeof moonsText !== "string") {
    moonsText = String(moonsText);
  }
  if (moonsText) {
    document.getElementById("moons").innerHTML = moonsText;
  }

  planetModal.style.display = "block";
  planetBox.style.display = "none";
};

const addPlanetEventListeners = () => {
  planets.forEach(planet => {
    planet.addEventListener("click", () => {
      const planetId = planet.id.toLowerCase();
      const planetInfo = planetData.find(
        data => data.latinName.toLowerCase() === planetId
      );

      hideMain();
      hidePlanets();
      colorSunBlue();

      planetModal.addEventListener("click", e => {
        if (e.target === planetBox, planetModal) {
          planetModal.style.display = "none";
          planetBox.style.display = "flex";
          showMain();
          showPlanets();
        }
      });

      if (planetInfo) {
        updatePlanetModal(planetInfo);
      } else {
        alert("Den informationen du söker finns inte tillgänglig!");
      }
    });
  });
};

// Event listener för solen
const sun = document.getElementById("solis");
if (sun) {
  sun.addEventListener("click", () => {
    const planetInfo = planetData.find(
      data => data.latinName.toLowerCase() === "solis"
    );

    colorSunBlue();
    hideMain();
    updatePlanetModal(planetInfo);
  });
}
