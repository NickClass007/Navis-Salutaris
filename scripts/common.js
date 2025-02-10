document.getElementById('color-switch').addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
});
