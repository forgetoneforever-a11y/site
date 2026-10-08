let currentScreen = 0;
const screens = ["language", "name", "gender", "age", "bio", "done"];
const userData = {};

function showScreen(index) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById("screen-" + screens[index]).classList.add("active");
    currentScreen = index;
}

function nextScreen() {
    if (screens[currentScreen] === "name") {
        const name = document.getElementById("input-name").value.trim();
        if (name.length < 2) {
            alert("Имя должно быть от 2 до 32 символов");
            return;
        }
        userData.name = name;
        userData.nickname = document.getElementById("input-nickname").value.trim();
    }
    
    if (screens[currentScreen] === "gender") {
        const myGender = document.querySelector("[data-group=\"my-gender\"] .choice.selected");
        const lookingFor = document.querySelector("[data-group=\"looking-for\"] .choice.selected");
        if (!myGender || !lookingFor) {
            alert("Выбери пол и предпочтения");
            return;
        }
        userData.myGender = myGender.dataset.value;
        userData.lookingFor = lookingFor.dataset.value;
    }
    
    if (screens[currentScreen] === "age") {
        userData.age = document.getElementById("my-age-value").innerText;
        userData.minAge = document.getElementById("min-age-value").innerText;
        userData.maxAge = document.getElementById("max-age-value").innerText;
    }
    
    if (currentScreen < screens.length - 1) {
        showScreen(currentScreen + 1);
    }
}

document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        userData.language = btn.dataset.lang;
    });
});

function selectChoice(el) {
    const group = el.closest(".choice-group");
    group.querySelectorAll(".choice").forEach(c => c.classList.remove("selected"));
    el.classList.add("selected");
}

function finishOnboarding() {
    userData.bio = document.getElementById("input-bio").value.trim();
    console.log("Данные:", userData);
    
    const genderText = {
        "male": "Парень",
        "female": "Девушка",
        "any": "Без разницы"
    };
    
    document.getElementById("result").innerHTML =
        "<p>👤 <strong>Имя:</strong> " + (userData.name || "—") + "</p>" +
        "<p>📛 <strong>Никнейм:</strong> " + (userData.nickname || "—") + "</p>" +
        "<p>⚧ <strong>Пол:</strong> " + (genderText[userData.myGender] || "—") + "</p>" +
        "<p>💕 <strong>Ищу:</strong> " + (genderText[userData.lookingFor] || "—") + "</p>" +
        "<p>🎂 <strong>Возраст:</strong> " + (userData.age || "—") + "</p>" +
        "<p>🔍 <strong>Диапазон:</strong> " + userData.minAge + "–" + userData.maxAge + " лет</p>" +
        "<p>📝 <strong>О себе:</strong> " + (userData.bio || "Не указано") + "</p>";
    
    showScreen(5);
}

function restart() {
    location.reload();
}

showScreen(0);
