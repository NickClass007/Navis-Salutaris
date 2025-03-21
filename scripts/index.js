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

const books = [
    'Buch 1',
    'Buch 2',
    'Buch 3',
    'Buch 4',
    'Buch 5',
    'Buch 6',
    'Buch 7',
    'Buch 8',
    'Buch 9',
    'Buch 10',
    'Buch 11'
];

async function loadCSV() {
    const requests = urls.map(url => fetch(url).then(response => response.text()));
    const data = await Promise.all(requests);
    const allRows = data.flatMap(csv => csv.split('\n'));
    const groupedRows = groupAndMergeRows(allRows);  // Gruppiere und kombiniere Zeilen
    populateTable(groupedRows);
}

// Funktion zum Gruppieren und Zusammenführen der Zeilen
function groupAndMergeRows(rows) {
    const grouped = {};

    rows.forEach(row => {
        if (row.trim() !== "") {
            const cols = row.split(',');
            const firstColumnValue = cols[0].trim(); // Wert aus der ersten Spalte

            // Wenn der Wert in der ersten Spalte bereits existiert, füge die anderen Spalten hinzu
            if (grouped[firstColumnValue]) {
                // Hier fügen wir für jedes Vorkommen der vierten Spalte einen eigenen Eintrag hinzu
                grouped[firstColumnValue].secondColumn.add(cols[1].trim());
                grouped[firstColumnValue].thirdColumn.add(cols[2].trim());
                grouped[firstColumnValue].fourthColumn.push(cols[3].trim()); // Speichern als Array
            } else {
                // Andernfalls füge eine neue Gruppe hinzu
                grouped[firstColumnValue] = {
                    secondColumn: new Set([cols[1].trim()]), // Set initialisieren
                    thirdColumn: new Set([cols[2].trim()]),
                    fourthColumn: [cols[3].trim()] // Als Array speichern
                };
            }
        }
    });

    // Konvertiere die Sets und Arrays zurück in Arrays und kombiniere die Werte
    const result = Object.keys(grouped).map(key => {
        return [
            key,
            Array.from(grouped[key].secondColumn).join(', '),
            Array.from(grouped[key].thirdColumn).join(', '),
            grouped[key].fourthColumn // Hier bleibt das Array der Buttons
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
                // Füge für jeden Wert in der vierten Spalte einen eigenen Button hinzu
                row[3].forEach((text, index) => {
                    const buttonInfo = document.createElement('button');
                    
                    buttonInfo.innerText = text;
                    buttonInfo.style.backgroundColor = 'orange'; // Set the button color to orange
                    buttonInfo.className = `lesson-button-${index}`; // Hier ist der neue Klassenname mit Index
                    buttonInfo.style.fontSize = "14px"; // Beispiel für die Textgröße
                    
                    // Info-Anzeige bei Klick
                    const infoDiv = document.createElement('div');
                    infoDiv.className = 'info-div';
                    infoDiv.style.display = 'none'; // Initially hide the info

                    // Füge PDF-Download-Buttons hinzu, basierend auf dem Text
                    if (/\bCaesars_Bellum_Gallicum_III\b/.test(text)) {
                        const pdfButton = document.createElement('button');
                        pdfButton.innerText = "Download Caesars Bellum Gallicum III.pdf";
                        pdfButton.style.backgroundColor = 'gray';
                        pdfButton.style.fontSize = "14px";
                        pdfButton.addEventListener('click', function() {
                            window.open("https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/Caesars_Bellum_Gallicum/Caesars_Bellum_Gallicum_III.pdf", "_blank");
                        });
                        infoDiv.appendChild(pdfButton);
                    } else if (/\bCaesars_Bellum_Gallicum_II\b/.test(text)) {
                        const pdfButton = document.createElement('button');
                        pdfButton.innerText = "Download Caesars Bellum Gallicum II.pdf";
                        pdfButton.style.backgroundColor = 'gray';
                        pdfButton.style.fontSize = "14px";
                        pdfButton.addEventListener('click', function() {
                            window.open("https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/Caesars_Bellum_Gallicum/Caesars_Bellum_Gallicum_II.pdf", "_blank");
                        });
                        infoDiv.appendChild(pdfButton);
                    } else if (/\bCaesars_Bellum_Gallicum_I\b/.test(text)) {
                        const pdfButton = document.createElement('button');
                        pdfButton.innerText = "Download Caesars Bellum Gallicum I.pdf";
                        pdfButton.style.backgroundColor = 'gray';
                        pdfButton.style.fontSize = "14px";
                        pdfButton.addEventListener('click', function() {
                            window.open("https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/Caesars_Bellum_Gallicum/Caesars_Bellum_Gallicum_I.pdf", "_blank");
                        });
                        infoDiv.appendChild(pdfButton);
                    } else {
                        infoDiv.innerText = "Sammlung ratio Lesebuch Latein Mittelstufe 1";
                    }

                    // Toggle die Sichtbarkeit der infoDiv beim Klicken auf den Button
                    buttonInfo.addEventListener('click', function() {
                        if (infoDiv.style.display === 'none') {
                            infoDiv.style.display = 'block'; // Zeige die Info an
                        } else {
                            infoDiv.style.display = 'none'; // Verstecke die Info
                        }
                    });

                    // Füge den Button und das Info-Div zum Tabellenzelleninhalt hinzu
                    td.appendChild(buttonInfo);
                    td.appendChild(infoDiv);
                });
            } else {
                td.innerText = col; // Für andere Spalten, den Text normal anzeigen
            }

            td.setAttribute('title', books[rowIndex % books.length]); // Füge Hover-Text mit Buchinfo hinzu
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

document.getElementById('text-link').addEventListener('click', function() {
    document.getElementById('dictionary-section').style.display = 'block';
    history.pushState(null, '', 'text.html');
});

document.getElementById('settings-link').addEventListener('click', function() {
    document.getElementById('settings-section').style.display = 'block';
    history.pushState(null, '', 'settings.html');
});
