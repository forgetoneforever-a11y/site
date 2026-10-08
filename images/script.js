let currentScreen = 0;
const screens = ["language", "name", "gender", "age", "bio", "done"];
const userData = { language: "ru" };

function updateProgress() {
    const total = screens.length - 1;
    const percent = (currentScreen / total) * 100;
    document.getElementById("progressBar").style.width = Math.max(percent, 5) + "%";
}

function showScreen(index) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById("screen-" + screens[index]).classList.add("active");
    currentScreen = index;
    updateProgress();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function shake(el) {
    el.classList.add("shake");
    setTimeout(() => el.classList.remove("shake"), 300);
}

function nextScreen() {
    if (screens[currentScreen] === "name") {
        const nameInput = document.getElementById("input-name");
        const name = nameInput.value.trim();
        if (name.length < 2) {
            shake(nameInput);
            nameInput.focus();
            return;
        }
        userData.name = name;
        userData.nickname = document.getElementById("input-nickname").value.trim();
    }
    
    if (screens[currentScreen] === "gender") {
        const myGender = document.querySelector("[data-group='my-gender'] .choice.selected");
        const lookingFor = document.querySelector("[data-group='looking-for'] .choice.selected");
        if (!myGender) { shake(document.querySelector("[data-group='my-gender']")); return; }
        if (!lookingFor) { shake(document.querySelector("[data-group='looking-for']")); return; }
        userData.myGender = myGender.dataset.value;
        userData.lookingFor = lookingFor.dataset.value;
    }
    
    if (screens[currentScreen] === "age") {
        userData.age = document.getElementById("my-age-value").innerText;
        userData.minAge = document.getElementById("min-age-value").innerText;
        userData.maxAge = document.getElementById("max-age-value").innerText;
    }
    
    if (currentScreen < screens.length - 1) showScreen(currentScreen + 1);
}

function prevScreen() {
    if (currentScreen > 0) showScreen(currentScreen - 1);
}

document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        userData.language = btn.dataset.lang;
        if (navigator.vibrate) navigator.vibrate(10);
    });
});

function selectChoice(el) {
    const group = el.closest(".choice-group");
    group.querySelectorAll(".choice").forEach(c => c.classList.remove("selected"));
    el.classList.add("selected");
    if (navigator.vibrate) navigator.vibrate(10);
}

function finishOnboarding() {
    userData.bio = document.getElementById("input-bio").value.trim();
    console.log("📦 Данные пользователя:", userData);
    
    const genderText = { "male": "Парень", "female": "Девушка", "any": "Без разницы" };
    
    document.getElementById("result").innerHTML =
        "<p><span>👤 Имя</span> <strong>" + (userData.name || "—") + "</strong></p>" +
        "<p><span>📛 Никнейм</span> <strong>" + (userData.nickname || "—") + "</strong></p>" +
        "<p><span>⚧ Пол</span> <strong>" + (genderText[userData.myGender] || "—") + "</strong></p>" +
        "<p><span>💕 Ищу</span> <strong>" + (genderText[userData.lookingFor] || "—") + "</strong></p>" +
        "<p><span>🎂 Возраст</span> <strong>" + (userData.age || "—") + "</strong></p>" +
        "<p><span>🔍 Диапазон</span> <strong>" + userData.minAge + "–" + userData.maxAge + "</strong></p>" +
        "<p><span>📝 О себе</span> <strong>" + (userData.bio || "Не указано") + "</strong></p>";
    
    showScreen(5);
}

function restart() { location.reload(); }

// Telegram WebApp
if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
}

// Старт
showScreen(0);
