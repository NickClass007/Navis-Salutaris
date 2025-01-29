const urls = [
    'https://raw.githubusercontent.com/nickclass007/W-rterbuch-/main/Woerter/LW1.csv',
    'https://raw.githubusercontent.com/nickclass007/W-rterbuch-/main/Woerter/LW2.csv',
    'https://raw.githubusercontent.com/nickclass007/W-rterbuch-/main/Woerter/LW3.csv',
    'https://raw.githubusercontent.com/nickclass007/W-rterbuch-/main/Woerter/LW4.csv',
    'https://raw.githubusercontent.com/nickclass007/W-rterbuch-/main/Woerter/LW5.csv',
    'https://raw.githubusercontent.com/nickclass007/W-rterbuch-/main/Woerter/LW6.csv',
    'https://raw.githubusercontent.com/nickclass007/W-rterbuch-/main/Woerter/LW7.csv',
    'https://raw.githubusercontent.com/nickclass007/W-rterbuch-/main/Woerter/LW8.csv',
    'https://raw.githubusercontent.com/nickclass007/W-rterbuch-/main/Woerter/LW9.csv',
    'https://raw.githubusercontent.com/nickclass007/W-rterbuch-/main/Woerter/LW10.csv'
];

async function loadCSV() {
    const requests = urls.map(url => fetch(url).then(response => response.text()));
    const data = await Promise.all(requests);
    const allRows = data.flatMap(csv => csv.split('\n'));
    const mergedData = mergeRows(allRows);
    populateTable(mergedData);
}

function mergeRows(rows) {
    const merged = {};
    rows.forEach(row => {
        if(row.trim() !== "") {
            const cols = row.split(',');
            const [grundform, ...rest] = cols;
            const key = grundform;
            if(!merged[key]) {
                merged[key] = {
                    grundform,
                    columns: rest.map(value => new Set(value ? [value] : []))
                };
            } else {
                rest.forEach((value, index) => {
                    if(value) merged[key].columns[index].add(value);
                });
            }
        }
    });
    return Object.values(merged).map(({grundform, columns}) => 
        [grundform, ...columns.map(set => [...set].join('; '))].join(',')
    );
}

function populateTable(rows) {
    const tableBody = document.getElementById('table-body');

    rows.forEach((row) => {
        const cols = row.split(',');
        const bodyRow = document.createElement('tr');
        cols.forEach(col => {
            const td = document.createElement('td');
            td.innerText = col;
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
});

document.getElementById('download-btn').addEventListener('click', async function() {
    const zip = new JSZip();

    const requests = urls.map(url => fetch(url).then(response => response.blob()).then(blob => {
        const filename = url.split('/').pop();
        zip.file(filename, blob);
    }));

    await Promise.all(requests);

    zip.generateAsync({type: 'blob'}).then(function(content) {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(content);
        a.download = 'Woerter.zip';
        a.click();
    });
});
