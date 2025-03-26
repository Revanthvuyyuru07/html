const colors = ["red", "blue", "green", "yellow", "red", "blue", "green", "yellow"];
let tubes = document.querySelectorAll(".tube");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBlocks() {
    let shuffledColors = shuffle([...colors]);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 2; j++) {
            let block = document.createElement("div");
            block.classList.add("block");
            block.style.backgroundColor = shuffledColors.pop();
            block.draggable = true;
            block.ondragstart = drag;
            tubes[i].appendChild(block);
        }
    }
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}

function drop(event) {
    event.preventDefault();
    let blockId = event.dataTransfer.getData("text/plain");
    let draggedBlock = document.getElementById(blockId);
    
    let tube = event.target.closest(".tube");
    
    if (tube && tube.childElementCount < 4) {
        tube.appendChild(draggedBlock);
        checkWin();
    }
}

function checkWin() {
    let allSorted = Array.from(tubes).every(tube => {
        let blocks = tube.querySelectorAll(".block");
        if (blocks.length === 0) return true;
        let color = blocks[0].style.backgroundColor;
        return Array.from(blocks).every(block => block.style.backgroundColor === color);
    });

    if (allSorted) {
        setTimeout(() => alert("You won!"), 200);
    }
}

function resetGame() {
    tubes.forEach(tube => (tube.innerHTML = ""));
    createBlocks();
}

window.onload = createBlocks;
