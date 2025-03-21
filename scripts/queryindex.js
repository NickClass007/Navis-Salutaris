let words = [];
let selectedWords = [];

const csvUrls = {
  'LW_Hygin_1': 'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW1.csv',
  'LW_Hygin_2': 'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW2.csv',
  'LW_Hygin_3': 'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW3.csv',
  'LW_Hygin_4': 'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW4.csv',
  'LW_Hygin_5': 'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW5.csv',
  'LW_Hygin_6': 'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW6.csv',
  'LW_Hygin_7': 'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW7.csv',
  'LW_Hygin_8': 'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW8.csv',
  'LW_Historia_Apollonii_1': 'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW9.csv',
  'LW_Historia_Apollonii_2': 'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW10.csv',
  'LW_Historia_Apollonii_3': 'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/LW11.csv',
  'Caesars_Bellum_Gallicum_I': 'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/Caesars_Bellum_Gallicum/Caesars_Bellum_Gallicum_I.csv',
  'Caesars_Bellum_Gallicum_II': 'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/Caesars_Bellum_Gallicum/Caesars_Bellum_Gallicum_II.csv',
  'Caesars_Bellum_Gallicum_III': 'https://raw.githubusercontent.com/nickclass007/Navis-Salutaris/main/Woerter/Caesars_Bellum_Gallicum/Caesars_Bellum_Gallicum_III.csv'
};

document.getElementById('load-file').addEventListener('click', () => {
    const selectedCSV = document.getElementById('csv-select').value;
    const url = csvUrls[selectedCSV];
    loadCSV(url);
});

function loadCSV(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            processCSVData(data);
        })
        .catch(error => {
            console.error('Fehler beim Laden der CSV-Datei:', error);
            alert('Fehler beim Laden der CSV-Datei.');
        });
}

function processCSVData(data) {
    words = [];
    const rows = data.split('\n');
    rows.forEach((row) => {
          if (row.trim() === '') return;
             const columns = row.split(',');
          if (columns.length >= 3) {
              words.push({ latin: columns[0], german: columns[2] });
          }
    });
    displayVocabSelection();
}

function displayVocabSelection() {
    const vocabListDiv = document.getElementById('vocab-list');
    vocabListDiv.innerHTML = '';

        words.forEach((word, index) => {
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = index;
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(`${word.latin} - ${word.german}`));
            vocabListDiv.appendChild(label);
       });

       document.getElementById('vocab-selection').style.display = 'flex';
}

document.getElementById('start-training').addEventListener('click', () => {
    selectedWords = [];
    const checkboxes = document.querySelectorAll('#vocab-list input:checked');
    checkboxes.forEach(checkbox => {
        selectedWords.push(words[checkbox.value]);
    });
    if (selectedWords.length === 0) {
        alert('Bitte wählen Sie mindestens eine Vokabel aus!');
        return;
    }
              
    localStorage.setItem('selectedWords', JSON.stringify(selectedWords));
    window.location.href = 'abfrage.html';
});

document.getElementById('select-all').addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('#vocab-list input');
  checkboxes.forEach(checkbox => checkbox.checked = true);
});

document.getElementById('deselect-all').addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('#vocab-list input');   
  checkboxes.forEach(checkbox => checkbox.checked = false);
});
