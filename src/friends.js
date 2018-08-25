import "./styles/styles.scss";
import "./vk.js";

const containerFrends = document.querySelector(".container-frends");
const frendsListRight = document.querySelector(".frends__list-right");
const frendsListLeft = document.querySelector(".frends__list-left");
const buttonSave = document.querySelector(".container-ff__save");

containerFrends.addEventListener("click", e => {
    if (!e.target.classList.contains("cross")) return;

    if (e.target.classList.contains("cross-add")) {
        e.target.classList.remove("cross-add");
        e.target.classList.add("cross-remove");
        add(frendsListRight, e.target);
        sortFrends(getInputValue().right, frendsListRight);
        sortFrends(getInputValue().left, frendsListLeft);
    } else {
        e.target.classList.remove("cross-remove");
        e.target.classList.add("cross-add");
        add(frendsListLeft, e.target);
        sortFrends(getInputValue().left, frendsListLeft);
        sortFrends(getInputValue().right, frendsListRight);
    }
});

containerFrends.addEventListener("keyup", e => {
    let inputValue = sameText(e.target.value);

    if (!e.target.classList.contains("search")) return;

    if (e.target.classList.contains("search__right")) {
        sortFrends(inputValue, frendsListRight);
    } else {
        sortFrends(inputValue, frendsListLeft);
    }
});

function add(list, item) {
    let id = item.getAttribute("data-id");
    let frends = document.querySelectorAll(".frend");

    frends.forEach(item => {
        if (item.getAttribute("data-id") === id) {
            list.appendChild(item);
        }
    });
}

function sortFrends(inputValue, list) {
    let frends = list.querySelectorAll(".frend");

    frends.forEach(item => {
        let nameItem = sameText(item.innerText);

        item.style.display = "";

        if (!nameItem.includes(inputValue)) {
            item.style.display = "none";
        }
    });
}

function sameText(text) {
    return text.replace(/\s/g, "").toLowerCase();
}

function getInputValue() {
    return {
        right: document.querySelector(".search__right").value,
        left: document.querySelector(".search__left").value
    };
}

buttonSave.addEventListener("click", e => {
    e.preventDefault();

    let frends = frendsListRight.querySelectorAll(".frend");
    let frendsId = [];

    for (let i = 0; i < frends.length; i++) {
        frendsId[i] = frends[i].getAttribute("data-id");
    }

    localStorage.frendsId = JSON.stringify(frendsId);
});

let currentDrag;

document.addEventListener("dragstart", e => {
    const zone = getCurrentZone(e.target);

    if (zone) {
        currentDrag = { startZone: zone, node: e.target };
    }
});

document.addEventListener("dragover", e => {
    const zone = getCurrentZone(e.target);

    if (zone) {
        e.preventDefault();
    }
});

document.addEventListener("drop", e => {
    if (currentDrag) {
        const zone = getCurrentZone(e.target);

        e.preventDefault();

        if (zone && currentDrag.startZone !== zone) {
            let cross = currentDrag.node.querySelector(".cross");

            if (cross.classList.contains("cross-add")) {
                cross.classList.remove("cross-add");
                cross.classList.add("cross-remove");
            } else {
                cross.classList.remove("cross-remove");
                cross.classList.add("cross-add");
            }

            if (e.target.classList.contains("frend")) {
                zone.insertBefore(
                    currentDrag.node,
                    e.target.nextElementSibling
                );
            } else {
                zone.appendChild(currentDrag.node);
            }
            sortFrends(getInputValue().right, frendsListRight);
            sortFrends(getInputValue().left, frendsListLeft);
        }

        currentDrag = null;
    }
});

function getCurrentZone(from) {
    do {
        if (from.classList.contains("drop-zone")) {
            return from;
        }
    } while ((from = from.parentElement));

    return null;
}
