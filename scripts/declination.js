const urls = [
    'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Deklinations/DK1.csv',
    'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Deklinations/DK2.csv',
    'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Deklinations/DK3.csv',
    'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Deklinations/DK4.csv',
    'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Deklinations/DK5.csv'
];

async function loadCSV() {
    const requests = urls.map(url => fetch(url).then(response => response.text()));
    const data = await Promise.all(requests);
    const allRows = data.flatMap(csv => csv.split('\n'));
    populateTable(allRows);
}

function populateTable(rows) {
    const tableBody = document.getElementById('table-body');

    rows.forEach((row) => {
        if(row.trim() !== ""){
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
    document.getElementById('declination-section').style.display = 'block';
    history.pushState(null, '', 'declination.html');
});

document.getElementById('settings-link').addEventListener('click', function() {
    document.getElementById('setings-section').style.display = 'block';
    history.pushState(null, '', 'settings.html');
});
