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
    'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/Caesars_Bellum_Gallicum/Caesars_Bellum_Gallicum_I.csv',
    'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/Caesars_Bellum_Gallicum/Caesars_Bellum_Gallicum_II.csv',
    'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/Caesars_Bellum_Gallicum/Caesars_Bellum_Gallicum_III.csv'
];

async function loadCSV() {
    console.log("Lade CSV-Daten...");
    const requests = urls.map(url => fetch(url).then(response => response.text()));
    const data = await Promise.all(requests);

    console.log("CSV-Daten geladen:", data);

    const allRows = data.flatMap(csv => csv.split('\n'));

    console.log("Alle Zeilen nach dem Splitten:", allRows); // Zeigt alle Zeilen an

    const groupedRows = groupAndMergeRows(allRows);

    console.log("Gruppierte Zeilen:", groupedRows); // Zeigt die gruppierten Zeilen an

    populateTable(groupedRows);
}

// Funktion zum Gruppieren und Zusammenführen der Zeilen
function groupAndMergeRows(rows) {
    const grouped = {};

    rows.forEach(row => {
        if (row.trim() !== "") {
            const cols = row.split(',');
            if (cols.length >= 4) {  // Stelle sicher, dass es mindestens 4 Spalten gibt
                const firstColumnValue = cols[0].trim(); // Wert aus der ersten Spalte
                const secondColumnValue = cols[1].trim(); // Wert aus der zweiten Spalte
                const thirdColumnValue = cols[2].trim(); // Wert aus der dritten Spalte
                const fourthColumnValue = cols[3].trim(); // Wert aus der vierten Spalte

                // Wenn der Wert in der ersten Spalte bereits existiert, füge die anderen Spalten hinzu
                if (grouped[firstColumnValue]) {
                    grouped[firstColumnValue].secondColumn.add(secondColumnValue);
                    grouped[firstColumnValue].thirdColumn.add(thirdColumnValue);
                    grouped[firstColumnValue].fourthColumn.add(fourthColumnValue);
                } else {
                    grouped[firstColumnValue] = {
                        secondColumn: new Set([secondColumnValue]),
                        thirdColumn: new Set([thirdColumnValue]),
                        fourthColumn: new Set([fourthColumnValue])
                    };
                }
            }
        }
    });

    const result = Object.keys(grouped).map(key => {
        return [
            key,
            Array.from(grouped[key].secondColumn).join(', '),
            Array.from(grouped[key].thirdColumn).join(', '),
            Array.from(grouped[key].fourthColumn).join(', ')
        ];
    });

    return result;
}

function populateTable(rows) {
    const tableBody = document.getElementById('table-body');

    rows.forEach((row, rowIndex) => {
        const bodyRow = document.createElement('tr');

        row.forEach((col, colIndex) => {
            const td = document.createElement('td');
            
            if (colIndex === 3) { // Fourth column logic
                console.log("Erstelle Button für:", col); // Überprüfe den Wert der vierten Spalte
                
                const text = col.trim(); // Holen Sie sich den Text aus der CSV in der vierten Spalte
                const button = document.createElement('button');
                button.innerText = text;
                button.style.backgroundColor = 'orange'; // Setze die Button-Farbe auf orange
                button.className = 'main-button';

                const infoDiv = document.createElement('div');
                infoDiv.className = 'info-div';
                infoDiv.style.display = 'none'; // Anfangs ausblenden

                // Wenn der Text bestimmte Muster enthält, PDF-Download-Buttons hinzufügen
                if (/\bCaesars_Bellum_Gallicum_III\b/.test(text)) {
                    const pdfButton = document.createElement('button');
                    pdfButton.innerText = "Download Caesars Bellum Gallicum III.pdf";
                    pdfButton.style.backgroundColor = 'gray';
                    pdfButton.addEventListener('click', function() {
                        window.open("https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/Caesars_Bellum_Gallicum/Caesars_Bellum_Gallicum_III.pdf", "_blank");
                    });
                    infoDiv.appendChild(pdfButton);
                } else if (/\bCaesars_Bellum_Gallicum_II\b/.test(text)) {
                    const pdfButton = document.createElement('button');
                    pdfButton.innerText = "Download Caesars Bellum Gallicum II.pdf";
                    pdfButton.style.backgroundColor = 'gray';
                    pdfButton.addEventListener('click', function() {
                        window.open("https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/Caesars_Bellum_Gallicum/Caesars_Bellum_Gallicum_II.pdf", "_blank");
                    });
                    infoDiv.appendChild(pdfButton);
                } else if (/\bCaesars_Bellum_Gallicum_I\b/.test(text)) {
                    const pdfButton = document.createElement('button');
                    pdfButton.innerText = "Download Caesars Bellum Gallicum I.pdf";
                    pdfButton.style.backgroundColor = 'gray';
                    pdfButton.addEventListener('click', function() {
                        window.open("https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/Caesars_Bellum_Gallicum/Caesars_Bellum_Gallicum_I.pdf", "_blank");
                    });
                    infoDiv.appendChild(pdfButton);
                } else {
                    infoDiv.innerText = "Sammlung ratio Lesebuch Latein Mittelstufe 1";
                }

                button.addEventListener('click', function() {
                    if (infoDiv.style.display === 'none') {
                        infoDiv.style.display = 'block';
                    } else {
                        infoDiv.style.display = 'none';
                    }
                });

                td.appendChild(button);
                td.appendChild(infoDiv);
            } else {
                td.innerText = col;
            }

            td.setAttribute('title', books[rowIndex % books.length]); // Hover-Text mit Buchinfo
            bodyRow.appendChild(td);
        });

        tableBody.appendChild(bodyRow);
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
