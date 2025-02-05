// Funktion zur Änderung der URL und zur Aktivierung des richtigen Links
function changeURL(buttonType) {
    const dictionaryLink = document.getElementById('dictionary-link');
    const deklinationLink = document.getElementById('deklination-link');

    // Entferne die "active"-Klasse von allen Links
    dictionaryLink.classList.remove('active');
    deklinationLink.classList.remove('active');

    // Je nachdem, welcher Button geklickt wurde, URL ändern und aktiven Button festlegen
    if (buttonType === 'woerterbuch') {
        dictionaryLink.classList.add('active');
        // window.location.href = 'index.html'; // Dies passiert durch das Standard-Linkverhalten, daher ist es nicht nötig.
    } else if (buttonType === 'deklination') {
        deklinationLink.classList.add('active');
    }
}

// Funktion, um den aktiven Button beim Laden der Seite zu markieren
function highlightActiveButton() {
    const path = window.location.pathname;
    const page = path.split("/").pop();

    if (page === "index.html") {
        document.getElementById('dictionary-link').classList.add('active');
    } else if (page === "deklination.html") {
        document.getElementById('deklination-link').classList.add('active');
    }
}

window.onload = highlightActiveButton;
