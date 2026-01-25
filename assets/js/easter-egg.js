console.log("🔎 Duvido Você Achar Todos os Easter Egg Desse Site 🕵‍♀ 🕵‍♂");

const TOTAL_EASTER_EGGS = 3;

let easterEggs = {
    badge: 0,
    text: 0,
    modal: 0
};

let totalPoints = Number(0);

sessionStorage.setItem("easterEggs", JSON.stringify(easterEggs));
sessionStorage.setItem("totalPoints", totalPoints);

function atualizarEasterEgg(easterEggName, elementId) {
    document.getElementById(elementId).addEventListener('click', function () {
        let easterEggs = JSON.parse(sessionStorage.getItem("easterEggs"));

        easterEggs[easterEggName] = 1;

        sessionStorage.setItem("easterEggs", JSON.stringify(easterEggs));

        updateTotalPoints();
    });
}

function updateTotalPoints() {
    let totalPoints = 0

    let easterEggs = JSON.parse(sessionStorage.getItem("easterEggs"));

    let totalPointsOg = Number(sessionStorage.getItem("totalPoints"));

    Object.values(easterEggs).forEach(valor => {
        totalPoints += valor;
    });

    sessionStorage.setItem("totalPoints", totalPoints);

    updateEasterEggProgress()
    updateEasterEggProgressConsole(totalPoints, totalPointsOg)
}

function updateEasterEggProgress() {
    let totalPoints = Number(sessionStorage.getItem("totalPoints"));

    if (totalPoints > 0) {
        document.getElementById("easterEggProgress").style.display = "block";
    }

    const progress = document.getElementById('easterEggProgressScore');

    progress.textContent = String(totalPoints) + "/" + String(TOTAL_EASTER_EGGS);
}


// function updateEasterEggProgressConsole(totalPoints, totalPointsOg) {
//     if (totalPoints == 1 && totalPointsOg != totalPoints) {
//         console.log("Que comecem os jogos... 🧩");
//     }

//     if (totalPointsOg != totalPoints) {
//         console.log("Parabéns você achou um easter egg!")
//     }

//     if (totalPoints == 3 && totalPointsOg != totalPoints) {
//         console.log("Você achou todos os Easter Egg... 🏆🥇");
//     }

//     if (totalPointsOg == totalPoints && totalPointsOg == TOTAL_EASTER_EGGS && totalPoints == TOTAL_EASTER_EGGS) {
//         console.log("Fim de jogo, você achou todos os Easter Egg... 🛑");
//     }
// }

function updateEasterEggProgressConsole(totalPoints, totalPointsOg) {
    if (totalPoints == 1 && totalPointsOg != totalPoints) {
        console.log("Que comecem os jogos... 🧩");
    }

    if (totalPointsOg != totalPoints) {
        console.log("Parabéns você achou um easter egg!");
    }

    if (totalPoints == TOTAL_EASTER_EGGS && totalPointsOg != totalPoints) {
        console.log("Você achou todos os Easter Egg... 🏆🥇");

        const winModal = new bootstrap.Modal(
            document.getElementById("easterEggWinModal")
        );
        winModal.show();
    }

    if (
        totalPointsOg == TOTAL_EASTER_EGGS &&
        totalPoints == TOTAL_EASTER_EGGS
    ) {
        console.log("Fim de jogo, você já venceu 🛑");
    }
}

function easterEggTextCollapse() {
    document.addEventListener("DOMContentLoaded", function () {
        const target = document.getElementById("easterEggTextCollapse");

        target.addEventListener('shown.bs.collapse', function () {
            setTimeout(() => {
                let instance = bootstrap.Collapse.getInstance(target);
                if (instance) {
                    instance.hide();
                }
            }, 400);
        });
    });
}


easterEggTextCollapse()

atualizarEasterEgg("badge", "easterEggBadge");

atualizarEasterEgg("modal", "easterEggModalOne");
atualizarEasterEgg("modal", "easterEggModalTwo");

atualizarEasterEgg("text", "easterEggText");



