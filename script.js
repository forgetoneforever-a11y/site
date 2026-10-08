let currentScreen = 0;
const screens = ["language", "name", "gender", "age", "bio", "done"];
const userData = { language: "ru" };

// 🌍 ПЕРЕВОДЫ
const translations = {
    ru: {
        chooseLang: "Выбери язык",
        chooseLangSub: "Удобный тебе язык",
        next: "Далее",
        back: "Назад",
        nameTitle: "Познакомимся?",
        nameSub: "Начнем с твоего имени",
        nameLabel: "Имя",
        namePlaceholder: "От 2 до 32 символов",
        nickLabel: "Никнейм",
        nickPlaceholder: "@Emberanon_bot",
        nickHint: "Необязательно — можно не указывать",
        genderTitle: "Кто ты?",
        genderSub: "И кого мы будем искать",
        myGenderLabel: "Я",
        lookingLabel: "Хочу искать",
        male: "Парень",
        female: "Девушка",
        males: "Парней",
        females: "Девушек",
        any: "Без разницы",
        ageTitle: "Сколько тебе лет?",
        ageSub: "И в каком возрасте искать",
        myAge: "Твой возраст",
        ageRange: "Рамки поиска",
        bioTitle: "Расскажи о себе",
        bioSub: "Это поможет найти тебе пару",
        bioLabel: "Описание",
        bioPlaceholder: "Люблю кофе, фильмы и долгие прогулки...",
        bioHint: "Пользователи с интересным описанием получают на 25% больше лайков",
        skip: "Пропустить",
        done: "Готово! 🎉",
        doneSub: "Твоя анкета создана",
        restart: "Начать заново",
        name: "Имя",
        nickname: "Никнейм",
        gender: "Пол",
        looking: "Ищу",
        age: "Возраст",
        range: "Диапазон",
        bio: "О себе",
        notSpecified: "Не указано"
    },
    en: {
        chooseLang: "Choose language",
        chooseLangSub: "Your preferred language",
        next: "Next",
        back: "Back",
        nameTitle: "Let's get acquainted?",
        nameSub: "Start with your name",
        nameLabel: "Name",
        namePlaceholder: "2 to 32 characters",
        nickLabel: "Nickname",
        nickPlaceholder: "@Emberanon_bot",
        nickHint: "Optional — can be left blank",
        genderTitle: "Who are you?",
        genderSub: "And who we will look for",
        myGenderLabel: "I am",
        lookingLabel: "Looking for",
        male: "Man",
        female: "Woman",
        males: "Men",
        females: "Women",
        any: "Anyone",
        ageTitle: "How old are you?",
        ageSub: "And what age to search",
        myAge: "Your age",
        ageRange: "Search range",
        bioTitle: "Tell about yourself",
        bioSub: "This will help find your match",
        bioLabel: "Description",
        bioPlaceholder: "I love coffee, movies and long walks...",
        bioHint: "Users with interesting descriptions get 25% more likes",
        skip: "Skip",
        done: "Done! 🎉",
        doneSub: "Your profile is created",
        restart: "Start over",
        name: "Name",
        nickname: "Nickname",
        gender: "Gender",
        looking: "Looking for",
        age: "Age",
        range: "Range",
        bio: "About",
        notSpecified: "Not specified"
    },
    ua: {
        chooseLang: "Обери мову",
        chooseLangSub: "Зручна тобі мова",
        next: "Далі",
        back: "Назад",
        nameTitle: "Познайомимось?",
        nameSub: "Почнемо з твого імені",
        nameLabel: "Ім'я",
        namePlaceholder: "Від 2 до 32 символів",
        nickLabel: "Нікнейм",
        nickPlaceholder: "@Emberanon_bot",
        nickHint: "Необов'язково — можна не вказувати",
        genderTitle: "Хто ти?",
        genderSub: "І кого ми будемо шукати",
        myGenderLabel: "Я",
        lookingLabel: "Хочу шукати",
        male: "Хлопець",
        female: "Дівчина",
        males: "Хлопців",
        females: "Дівчат",
        any: "Без різниці",
        ageTitle: "Скільки тобі років?",
        ageSub: "І в якому віці шукати",
        myAge: "Твій вік",
        ageRange: "Рамки пошуку",
        bioTitle: "Розкажи про себе",
        bioSub: "Це допоможе знайти тобі пару",
        bioLabel: "Опис",
        bioPlaceholder: "Люблю каву, фільми та довгі прогулянки...",
        bioHint: "Користувачі з цікавим описом отримують на 25% більше лайків",
        skip: "Пропустити",
        done: "Готово! 🎉",
        doneSub: "Твій профіль створено",
        restart: "Почати знову",
        name: "Ім'я",
        nickname: "Нікнейм",
        gender: "Стать",
        looking: "Шукаю",
        age: "Вік",
        range: "Діапазон",
        bio: "Про себе",
        notSpecified: "Не вказано"
    },
    sr: {
        chooseLang: "Izaberi jezik",
        chooseLangSub: "Jezik koji ti odgovara",
        next: "Dalje",
        back: "Nazad",
        nameTitle: "Hajde da se upoznamo?",
        nameSub: "Počnimo sa tvojim imenom",
        nameLabel: "Ime",
        namePlaceholder: "Od 2 do 32 karaktera",
        nickLabel: "Nadimak",
        nickPlaceholder: "@Emberanon_bot",
        nickHint: "Opciono — može se izostaviti",
        genderTitle: "Ko si ti?",
        genderSub: "I koga ćemo tražiti",
        myGenderLabel: "Ja sam",
        lookingLabel: "Tražim",
        male: "Momak",
        female: "Devojka",
        males: "Momke",
        females: "Devojke",
        any: "Svejedno",
        ageTitle: "Koliko imaš godina?",
        ageSub: "I koje godine da tražim",
        myAge: "Tvoje godine",
        ageRange: "Opseg pretrage",
        bioTitle: "Reci nešto o sebi",
        bioSub: "Ovo će ti pomoći da nađeš par",
        bioLabel: "Opis",
        bioPlaceholder: "Volim kafu, filmove i duge šetnje...",
        bioHint: "Korisnici sa zanimljivim opisom dobijaju 25% više lajkova",
        skip: "Preskoči",
        done: "Gotovo! 🎉",
        doneSub: "Tvoj profil je kreiran",
        restart: "Počni ispočetka",
        name: "Ime",
        nickname: "Nadimak",
        gender: "Pol",
        looking: "Tražim",
        age: "Godine",
        range: "Opseg",
        bio: "O sebi",
        notSpecified: "Nije navedeno"
    }
};

function t(key) {
    return (translations[userData.language] && translations[userData.language][key]) || translations.ru[key] || key;
}

// 🌍 Применить язык ко всем элементам с data-i18n
function applyLanguage() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        const attr = el.getAttribute("data-i18n-attr");
        if (attr) {
            el.setAttribute(attr, t(key));
        } else {
            el.textContent = t(key);
        }
    });
}

function updateProgress() {
    const total = screens.length - 1;
    const percent = (currentScreen / total) * 100;
    const bar = document.getElementById("progressBar");
    if (bar) bar.style.width = Math.max(percent, 5) + "%";
}

function showScreen(index) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const target = document.getElementById("screen-" + screens[index]);
    if (target) target.classList.add("active");
    currentScreen = index;
    updateProgress();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function shake(el) {
    if (!el) return;
    el.classList.add("shake");
    setTimeout(() => el.classList.remove("shake"), 300);
}

function nextScreen() {
    // Валидация имени
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

    // Валидация пола
    if (screens[currentScreen] === "gender") {
        const myGender = document.querySelector("[data-group='my-gender'] .choice.selected");
        const lookingFor = document.querySelector("[data-group='looking-for'] .choice.selected");
        if (!myGender) {
            shake(document.querySelector("[data-group='my-gender']"));
            return;
        }
        if (!lookingFor) {
            shake(document.querySelector("[data-group='looking-for']"));
            return;
        }
        userData.myGender = myGender.dataset.value;
        userData.lookingFor = lookingFor.dataset.value;
    }

    // Возраст
    if (screens[currentScreen] === "age") {
        userData.age = document.getElementById("my-age-value").innerText;
        userData.minAge = document.getElementById("min-age-value").innerText;
        userData.maxAge = document.getElementById("max-age-value").innerText;
    }

    if (currentScreen < screens.length - 1) {
        showScreen(currentScreen + 1);
    }
}

function prevScreen() {
    if (currentScreen > 0) showScreen(currentScreen - 1);
}

// 🌍 Выбор языка — применяется сразу
document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        userData.language = btn.dataset.lang;
        applyLanguage();  // ← переводим интерфейс
        if (navigator.vibrate) navigator.vibrate(10);
    });
});

// Выбор карточки (пол)
function selectChoice(el) {
    const group = el.closest(".choice-group");
    if (!group) return;
    group.querySelectorAll(".choice").forEach(c => c.classList.remove("selected"));
    el.classList.add("selected");
    if (navigator.vibrate) navigator.vibrate(10);
}

// Финал — показ данных
function finishOnboarding() {
    userData.bio = document.getElementById("input-bio").value.trim();
    console.log("📦 Данные пользователя:", userData);

    const genderText = {
        male: t("male"),
        female: t("female"),
        any: t("any")
    };

    const resultBox = document.getElementById("result");
    if (resultBox) {
        resultBox.innerHTML =
            "<p><span>👤 " + t("name") + "</span> <strong>" + (userData.name || "—") + "</strong></p>" +
            "<p><span>📛 " + t("nickname") + "</span> <strong>" + (userData.nickname || "—") + "</strong></p>" +
            "<p><span>⚧ " + t("gender") + "</span> <strong>" + (genderText[userData.myGender] || "—") + "</strong></p>" +
            "<p><span>💕 " + t("looking") + "</span> <strong>" + (genderText[userData.lookingFor] || "—") + "</strong></p>" +
            "<p><span>🎂 " + t("age") + "</span> <strong>" + (userData.age || "—") + "</strong></p>" +
            "<p><span>🔍 " + t("range") + "</span> <strong>" + userData.minAge + "–" + userData.maxAge + "</strong></p>" +
            "<p><span>📝 " + t("bio") + "</span> <strong>" + (userData.bio || t("notSpecified")) + "</strong></p>";
    }

    // Сохраняем в localStorage (для передачи в feed.html)
    try {
        localStorage.setItem("emberUser", JSON.stringify(userData));
    } catch (e) { console.warn("localStorage недоступен", e); }

    showScreen(5);
}

function restart() {
    location.reload();
}

// Telegram WebApp
if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
}

// Старт
showScreen(0);
applyLanguage();
