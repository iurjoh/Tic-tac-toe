const cellElements = document.querySelectorAll("[data-cell]");

let isCircleTurn;

const handleClick = (i) => {
    // set X or O
    const cell = i.target;
    const classToAdd = isCircleTurn(i) ? "o" : "x".
    // check if won

    // check if drew

    // switch between icons X and O
};

for (const cell of cellElements) {
    cellElements.addEventListener("click", handleClick, {once: true};
}

