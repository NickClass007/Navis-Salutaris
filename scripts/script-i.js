const urls = [
    'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW1.csv',
    'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW2.csv',
    'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW3.csv',
    'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW4.csv',
    'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW5.csv',
    'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW6.csv',
    'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW7.csv',
    'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW8.csv',
    'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW9.csv',
    'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW10.csv',
    'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW11.csv',
    'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW12.csv',
    'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW13.csv'
];

async function loadCSV() {
    const requests = urls.map(url => fetch(url).then(response => response.text()));
    const data = await Promise.all(requests);
    console.log('CSV geladen:', data);
    const allRows = data.flatMap(csv => csv.split('\n'));
    console.log('Alle Zeilen:', allRows);
    populateTable(allRows);
}

function populateTable(rows) {
    const tableBody = document.getElementById('table-body');
    console.log('Tabelle Körper:', tableBody);

    rows.forEach((row, index) => {
        if (row.trim() !== "") {
            const cols = row.split(',');
            const bodyRow = document.createElement('tr');
            cols.forEach(col => {
                const td = document.createElement('td');
                td.innerText = col;
                bodyRow.appendChild(td);
            });
            tableBody.appendChild(bodyRow);
        }
    });
}

window.onload = function() {
    console.log('Window loaded');
    loadCSV();
};

document.getElementById('search-input').addEventListener('keyup', function() {
    console.log('Sucheingabe erkannt');
    const searchTerm = this.value.toLowerCase();
    const rows = document.getElementById('table-body').getElementsByTagName('tr');

    Array.from(rows).forEach(row => {
        const cells = row.getElementsByTagName('td');
        let rowContainsSearchTerm = false;

        Array.from(cells).forEach(cell => {
            if (cell.textContent.toLowerCase().includes(searchTerm)) {
                rowContainsSearchTerm = true;
            }
        });

        row.style.display = rowContainsSearchTerm ? '' : 'none';
    });
});

document.getElementById('dictionary-link').addEventListener('click', function() {
    document.getElementById('dictionary-section').style.display = 'block';
    console.log('Wörterbuch-Link geklickt');
});

function changeURL(buttonType) {
    const dictionaryLink = document.getElementById('dictionary-link');
    const deklinationLink = document.getElementById('deklination-link');
    const uebersetzterLink = document.getElementById('uebersetzter-link');
    const downloadLink = ducument.getElemetById('downlaod-link');

    dictionaryLink.classList.remove('active');
    deklinationLink.classList.remove('active');
    uebersetzterLink.classList.remove('active');
    downloadLink.classList.remove('active');
    

    if (buttonType === 'woerterbuch') {
        dictionaryLink.classList.add('active');
    } else if (buttonType === 'deklination') {
        deklinationLink.classList.add('active');
    } else if (buttonType === 'uebersetzter') {
        uebersetzterLink.classList.add('active');
    } else if (buttonType == 'download') {
        doawnloadLink.classList.add('active');
    }
}

function highlightActiveButton() {
    const path = window.location.pathname;
    const page = path.split("/").pop();

    if (page === "index.html") {
        document.getElementById('dictionary-link').classList.add('active');
    } else if (page === "deklination.html") {
        document.getElementById('deklination-link').classList.add('active');
    } else if (page === "uebersetzter.html") {
        document.getElementById('uebersetzter-link').classList.add('active');
    } else if {page == "downlaod.html") {
        document.getElementById('downlaod-link').classList.add('active');
    }
}
