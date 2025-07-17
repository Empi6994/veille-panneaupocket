const PROXY_URL = "http://localhost:3000/proxy?url=";
const NB_JOURS = 7;
const tableBody = document.querySelector("#data-table tbody");
const checkboxList = document.getElementById("checkboxList");

let allPublications = [];
let selectedCommunes = new Set();
let loadedCommunes = new Set(); // pour éviter les doubles chargements

document.getElementById("toggleList").addEventListener("click", () => {
  checkboxList.classList.toggle("hidden");
});

document.getElementById("uncheckAll").addEventListener("click", () => {
  document.querySelectorAll("#checkboxList input").forEach(checkbox => {
    checkbox.checked = false;
    selectedCommunes.delete(checkbox.value);
  });
  renderTable();
});

async function loadCommunes() {
  console.log("➡️ Chargement de communes.json...");
  const res = await fetch("communes.json");
  const communes = await res.json();
  console.log("✅ Communes trouvées :", communes);

  communes.forEach(c => {
    createCheckbox(c.nom, c.url);
  });
}

function createCheckbox(nom, url) {
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = nom;
  checkbox.checked = false;

  checkbox.addEventListener("change", async () => {
    if (checkbox.checked) {
      selectedCommunes.add(nom);
      if (!loadedCommunes.has(nom)) {
        const pubs = await fetchPublications(url, nom);
        allPublications.push(...pubs);
        loadedCommunes.add(nom);
      }
    } else {
      selectedCommunes.delete(nom);
    }
    renderTable();
  });

  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(" " + nom));
  checkboxList.appendChild(label);
}

async function fetchPublications(url, communeName) {
  try {
    const fullUrl = PROXY_URL + encodeURIComponent(url);
    const res = await fetch(fullUrl);
    const html = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const cards = [...doc.querySelectorAll(".sign-preview")];
    const now = new Date();

    const pubs = cards.map(card => {
      const dateText = card.querySelector(".date")?.textContent || "";
      const titre = card.querySelector(".title")?.textContent || "";
      const corps = card.querySelector(".content")?.textContent || "";
      const dateObj = parseDate(dateText);
      return { commune: communeName, date: dateObj, titre, corps };
    }).filter(pub => pub.date && (now - pub.date) / (1000 * 60 * 60 * 24) <= NB_JOURS);

    return pubs;
  } catch (e) {
    console.error(`❌ Erreur lors du chargement de ${communeName}`, e);
    return [];
  }
}

function parseDate(text) {
  const match = text.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (!match) return null;
  const [_, day, month, year] = match;
  return new Date(`${year}-${month}-${day}`);
}

function renderTable() {
  const filtered = allPublications
    .filter(pub => selectedCommunes.has(pub.commune))
    .sort((a, b) => b.date - a.date);

  console.log("📊 Rendons ce tableau :", filtered);

  tableBody.innerHTML = "";
  for (const pub of filtered) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${pub.commune}</td>
      <td>${formatDate(pub.date)}</td>
      <td>${pub.titre}</td>
      <td>${pub.corps}</td>
    `;
    tableBody.appendChild(row);
  }
}

function formatDate(date) {
  return date.toLocaleDateString("fr-FR");
}

// ▶️ Lancement
loadCommunes();
