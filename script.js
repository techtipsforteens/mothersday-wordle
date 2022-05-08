var currentSquare = [1, 1];
const wordBank = ["brave", "cares", "cooks", "gives", "great", "loves", "plans", "smart", "sweet"];
var WOD;

function letter(backspace=false) {
    console.log("Input!!!");

    if (backspace) {
        selectElementContents(document.getElementById(`${currentSquare[0]}-square-${currentSquare[1] - 1}`));
        currentSquare[1] -= 2;
        return;
    }
    if (currentSquare[1] == 5) {
        checkWord();
    } else {
        selectElementContents(document.getElementById(`${currentSquare[0]}-square-${currentSquare[1] + 1}`));
        currentSquare = [currentSquare[0], (currentSquare[1]+1)];
    }
}

function checkWord() {
    var letters = [];
    var letterColors = ["gray", "gray", "gray", "gray", "gray"];
    for (i=1; i<6; i++) {
        letters.push(document.getElementById(`${currentSquare[0]}-square-${i}`).innerHTML);
    }

    var word = letters.join("");
    console.log(word)

    var WODletters = Array.from(WOD);

    if (word == WOD) {
        youWon();
        return;
    } else {
        for (i=0; i<5; i++) {
            if (letters[i] == WODletters[i]) {
                letterColors[i] = "green";
            } else {
                for (j=0; j<5; j++) {
                    if (letters[i] == WODletters[j]) {
                        letterColors[i] = "yellow";
                    }
                }
            }
        }
        for (i=0; i<5; i++) {
            document.getElementById(`${currentSquare[0]}-square-${i+1}`).style.backgroundColor = letterColors[i];
        }
        currentSquare[0] += 1;
        currentSquare[1] = 1;
        selectElementContents(document.getElementById(`${currentSquare[0]}-square-${currentSquare[1]}`));
    }

    console.log(letters);
    console.log(letterColors);
}

function youWon() {
    console.log("you won");
    for (i=1; i<6; i++) {
        document.getElementById(`${currentSquare[0]}-square-${i}`).style.backgroundColor = "green";
    }
    document.getElementById("wordle").style.display = "none";
    document.getElementById("p").style.display = "inline-block";
}

function playAgain() {
    for (i=1; i<6; i++) {
        for (j=1; j<6; j++) {
            document.getElementById(`${j}-square-${i}`).style.backgroundColor = "white";
            document.getElementById(`${j}-square-${i}`).innerHTML = "";
        }
    }
    currentSquare = [1, 1];
    selectElementContents(document.getElementById("1-square-1"));
    selectWOD();
    document.getElementById("wordle").style.display = "block";
    document.getElementById("p").style.display = "none";
}

function selectWOD() {
    WOD = wordBank[Math.floor(Math.random() * (wordBank.length))];
}

function selectElementContents(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

selectWOD();
document.getElementById("p").style.display = "none";

document.onkeydown = checkKey;

function checkKey(e) {

    console.log("checkkey")
    e = e || window.event;

    //delete
    if (e.keyCode == '8') {
        letter(true);
    }
}