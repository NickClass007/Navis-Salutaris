// script.js

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
