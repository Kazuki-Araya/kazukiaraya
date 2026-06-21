const text = "Kazuki Araya";
let index = 1;

function animateTitle() {
    document.title = text.substring(0, index);

    index++;

    if (index > text.length) {
        setTimeout(() => {
            index = 1;
            animateTitle();
        }, 1000);
    } else {
        setTimeout(animateTitle, 250);
    }
}

animateTitle();