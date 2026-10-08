// Injection automatique du style CSS des suggestions (avec correction du trait)
const style = document.createElement('style');
style.innerHTML = `
    .rechercheforme {
        position: relative;
    }
    .search-suggestions {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #ffffff;
        border: 1px solid #ccc;
        border-radius: 0 0 5px 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        list-style: none;
        padding: 0;
        margin: 0;
        max-height: 200px;
        overflow-y: auto;
    }
    /* Empêche la bordure d'apparaître quand il n'y a pas de suggestions */
    .search-suggestions:empty {
        border: none;
        box-shadow: none;
    }
    .search-suggestions li {
        padding: 10px 15px;
        cursor: pointer;
        color: #333;
        border-bottom: 1px solid #eee;
        font-size: 0.9rem;
        text-align: left;
    }
    .search-suggestions li:hover {
        background-color: #f0f0f0;
    }
`;
document.head.appendChild(style);

const searchIndex = [
    { title: "Accueil - Licence Informatique", url: "index.html", keywords: ["accueil", "licence", "informatique", "semestre", "cours", "mobile"] },
    { title: "Stages (BTS SIO)", url: "stage.html", keywords: ["stage", "entreprise", "rapport", "missions", "bts"] },
    { title: "Atelier Professionnel", url: "atelier.html", keywords: ["atelier", "professionnel", "projet"] },
    { title: "Travaux Pratiques (TP)", url: "tp.html", keywords: ["tp", "travaux", "pratiques", "pfsense", "openvpn", "reseau"] },
    { title: "Compétences", url: "competences.html", keywords: ["competences", "web", "systemes", "outils", "git"] },
    { title: "Veille Technologique", url: "technologique.html", keywords: ["veille", "technologique", "tech"] },
    { title: "Veille Juridique", url: "juridique.html", keywords: ["veille", "juridique", "droit"] },
    { title: "Ambitions", url: "ambitions.html", keywords: ["ambitions", "projet", "objectifs", "carriere"] }
];

const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');

const suggestionsList = document.createElement('ul');
suggestionsList.className = 'search-suggestions';
searchForm.appendChild(suggestionsList);

searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase().trim();
    suggestionsList.innerHTML = '';

    if (query.length === 0) return;

    const matches = searchIndex.filter(page => 
        page.title.toLowerCase().includes(query) || 
        page.keywords.some(kw => kw.includes(query))
    );

    matches.forEach(page => {
        const li = document.createElement('li');
        li.textContent = page.title;
        li.addEventListener('click', function() {
            window.location.href = page.url;
        });
        suggestionsList.appendChild(li);
    });
});

document.addEventListener('click', function(e) {
    if (!searchForm.contains(e.target)) {
        suggestionsList.innerHTML = '';
    }
});

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const query = searchInput.value.toLowerCase().trim();
    if (!query) return;

    const foundPage = searchIndex.find(page => 
        page.title.toLowerCase().includes(query) || 
        page.keywords.some(kw => kw.includes(query))
    );

    if (foundPage) {
        window.location.href = foundPage.url;
    } else {
        alert("Aucun résultat trouvé pour \"" + query + "\" !");
    }
});