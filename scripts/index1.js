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
                
                if (colIndex === 3) { // Fourth column logic
                    const text = col.trim(); // Get the text from the fourth column
                    
                    td.innerText = text; // Display the text from the CSV

                    const button = document.createElement('button');
                    const bookInfo = document.createElement('div');
                    bookInfo.className = 'book-info';
                    
                    if (text === "Caesars_Bellum_Gallicum_III") {
                        button.innerText = "Caesars Bellum Gallicum III"; // Set button text for Caesar case
                        button.addEventListener('click', function() {
                            // Ensure the PDF opens in a new tab
                            const pdfUrl = "https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/Caesars_Bellum_Gallicum/Caesars_Bellum_Gallicum_III.pdf"; // Replace with the actual PDF URL
                            window.open(pdfUrl, "_blank"); // Open the PDF in a new tab
                        });
                        bookInfo.innerText = "Sammlung ratio Lesebuch Latein Mittelstufe 1"; // Additional info for Caesar case
                    } else {
                        button.innerText = "Sammlung ratio Lesebuch Latein Mittelstufe 1"; // Default button text
                        bookInfo.innerText = "Sammlung ratio Lesebuch Latein Mittelstufe 1"; // Default book info
                    }

                    button.addEventListener('click', function() {
                        // Toggle visibility of the book info
                        bookInfo.style.display = bookInfo.style.display === 'none' ? 'block' : 'none';
                    });

                    td.appendChild(button);
                    td.appendChild(bookInfo); // Add book info below the button
                } else {
                    td.innerText = col; // For other columns, display the text normally
                }

                td.setAttribute('title', books[rowIndex % books.length]); // Add hover text with book info
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
