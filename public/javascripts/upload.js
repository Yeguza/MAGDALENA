
$(document).ready(function() {
    let fakeBut = document.getElementById('file-input-button');

    let realInput = document.getElementById('file-input');

    fakeBut.addEventListener('click', function(e) {
        realInput.click();
    });
});
