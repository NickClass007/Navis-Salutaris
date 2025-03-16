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
    'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/Caesars_Bellum_Gallicum/Caesars_Bellum_Gallicum_III.csv',
    'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/Caesars_Bellum_Gallicum/Caesars_Bellum_Gallicum_III.pdf' // Link zur PDF
];

const books = [
    'Caesars_Bellum_Gallicum_III',  // Name des ersten Buches (mit PDF-Link)
    'Sammlung ratio Lesebuch Latein Mittelstufe 1'
];

async function loadCSV() {
    // Die URLs und Buchnamen werden jetzt einfach direkt verwendet, keine CSV-Datei wird mehr geladen
    const data = await Promise.all(urls.map(url => url ? fetch(url).then(response => response.text()) : Promise.resolve('')));
    const allRows = data.flatMap(csv => csv.split('\n'));
    populateTable(allRows);
}

function populateTable(rows) {
    const tableBody = document.getElementById('table-body');

    rows.forEach((row, rowIndex) => {
        if (row.trim() !== "") {
            const cols = row.split(',');
            const bodyRow = document.createElement('tr');
            cols.forEach((col, colIndex) => {
                const td = document.createElement('td');
                if (colIndex === 3) { // Umwandeln der vierten Spalte zu einem Button
                    const button = document.createElement('button');
                    let pdfLink;

                    // Wenn das Buch Caesars_Bellum_Gallicum_III ist, dann den entsprechenden PDF-Link verwenden
                    if (books[rowIndex % books.length] === 'Caesars_Bellum_Gallicum_III') {
                        pdfLink = 'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/Caesars_Bellum_Gallicum/Caesars_Bellum_Gallicum_III.pdf';
                        button.innerText = 'Caesars_Bellum_Gallicum_III (PDF)'; // Button zeigt "PDF" an
                    } else {
                        // Für andere Bücher einfach den Namen anzeigen, kein PDF-Link
                        pdfLink = null;
                        button.innerText = 'Sammlung ratio Lesebuch Latein Mittelstufe 1'; // Zeigt den Namen des Buches an
                    }

                    // Wenn der Button geklickt wird und es einen PDF-Link gibt, öffnet sich die PDF in einem neuen Tab
                    if (pdfLink) {
                        button.addEventListener('click', function() {
                            window.open(pdfLink, '_blank');
                        });
                    }

                    td.appendChild(button);
                } else {
                    td.innerText = col;
                }
                td.setAttribute('title', books[rowIndex % books.length]); // Tooltip mit dem Namen des Buches
                bodyRow.appendChild(td);
            });
            tableBody.appendChild(bodyRow);
        }
    });
}

window.onload = loadCSV;

document.getElementById('search-input').addEventListener('keyup', function() {
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
    history.pushState(null, '', 'index.html');
});

document.getElementById('declination-link').addEventListener('click', function() {
    document.getElementById('dictionary-section').style.display = 'block';
    history.pushState(null, '', 'declination.html');
});

document.getElementById('settings-link').addEventListener('click', function() {
    document.getElementById('settings-section').style.display = 'block';
    history.pushState(null, '', 'settings.html');
});
