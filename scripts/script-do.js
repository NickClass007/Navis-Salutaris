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
