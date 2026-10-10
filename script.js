let currentScreen = 0;
const screens = ["language", "name", "gender", "preferences", "age", "bio", "photo", "done"];
const userData = { language: "ru" };
let selectedPrefs = [];

const API_URL = "https://backend-2tcl.onrender.com";

// Проверка: зарегистрирован ли пользователь
function isRegistered() {
    try {
        const saved = localStorage.getItem("emberUser");
        if (!saved) return false;
        const data = JSON.parse(saved);
        return data && data.name && data.myGender && data.lookingFor;
    } catch (e) {
        return false;
    }
}

if (isRegistered()) {
    window.location.href = "feed.html";
}

// Получить Telegram ID
function getTelegramId() {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
        const user = window.Telegram.WebApp.initDataUnsafe.user;
        if (user) return String(user.id);
    }
    let id = localStorage.getItem("emberTgId");
    if (!id) {
        id = "test_" + Math.random().toString(36).substr(2, 9);
        localStorage.setItem("emberTgId", id);
    }
    return id;
}

// Получить Telegram username
function getTelegramUsername() {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
        const user = window.Telegram.WebApp.initDataUnsafe.user;
        if (user && user.username) return user.username;
    }
    return null;
}

// ПЕРЕВОДЫ
const translations = {
    ru: {
        chooseLang: "Выбери язык", chooseLangSub: "Удобный тебе язык",
        next: "Далее", back: "Назад",
        nameTitle: "Познакомимся?", nameSub: "Начнем с твоего имени",
        nameLabel: "Имя", namePlaceholder: "От 2 до 32 символов",
        nickLabel: "Никнейм", nickPlaceholder: "@Emberanon_bot",
        nickHint: "Необязательно — можно не указывать",
        genderTitle: "Кто ты?", genderSub: "И кого мы будем искать",
        myGenderLabel: "Я", lookingLabel: "Хочу искать",
        male: "Парень", female: "Девушка",
        males: "Парней", females: "Девушек", any: "Без разницы",
        ageTitle: "Сколько тебе лет?", ageSub: "И в каком возрасте искать",
        myAge: "Твой возраст", ageRange: "Рамки поиска",
        bioTitle: "Расскажи о себе", bioSub: "Это поможет найти тебе пару",
        bioLabel: "Описание", bioPlaceholder: "Люблю кофе, фильмы и долгие прогулки...",
        bioHint: "Пользователи с интересным описанием получают на 25% больше лайков",
        photoTitle: "Как ты выглядишь?", photoSub: "Добавь своё фото",
        photoLabel: "Твоё фото", photoAdd: "Добавить",
        photoHint: "Анкеты с фото получают в 10 раз больше лайков",
        skip: "Пропустить",
        done: "Готово! 🎉", doneSub: "Твоя анкета создана",
        restart: "Начать заново",
        name: "Имя", nickname: "Никнейм", gender: "Пол", looking: "Ищу",
        age: "Возраст", range: "Диапазон", bio: "О себе",
        photo: "Фото", photoLoaded: "Загружено ✓",
        notSpecified: "Не указано",
        city: "Город"
    },
    en: {
        chooseLang: "Choose language", chooseLangSub: "Your preferred language",
        next: "Next", back: "Back",
        nameTitle: "Let's get acquainted?", nameSub: "Start with your name",
        nameLabel: "Name", namePlaceholder: "2 to 32 characters",
        nickLabel: "Nickname", nickPlaceholder: "@Emberanon_bot",
        nickHint: "Optional — can be left blank",
        genderTitle: "Who are you?", genderSub: "And who we will look for",
        myGenderLabel: "I am", lookingLabel: "Looking for",
        male: "Man", female: "Woman",
        males: "Men", females: "Women", any: "Anyone",
        ageTitle: "How old are you?", ageSub: "And what age to search",
        myAge: "Your age", ageRange: "Search range",
        bioTitle: "Tell about yourself", bioSub: "This will help find your match",
        bioLabel: "Description", bioPlaceholder: "I love coffee, movies and long walks...",
        bioHint: "Users with interesting descriptions get 25% more likes",
        photoTitle: "How do you look?", photoSub: "Add your photo",
        photoLabel: "Your photo", photoAdd: "Add",
        photoHint: "Profiles with photos get 10x more likes",
        skip: "Skip",
        done: "Done!", doneSub: "Your profile is created",
        restart: "Start over",
        name: "Name", nickname: "Nickname", gender: "Gender", looking: "Looking for",
        age: "Age", range: "Range", bio: "About",
        photo: "Photo", photoLoaded: "Uploaded",
        notSpecified: "Not specified",
        city: "City"
    },
    ua: {
        chooseLang: "Обери мову", chooseLangSub: "Зручна тобі мова",
        next: "Далі", back: "Назад",
        nameTitle: "Познайомимось?", nameSub: "Почнемо з твого імені",
        nameLabel: "Ім'я", namePlaceholder: "Від 2 до 32 символів",
        nickLabel: "Нікнейм", nickPlaceholder: "@Emberanon_bot",
        nickHint: "Необов'язково — можна не вказувати",
        genderTitle: "Хто ти?", genderSub: "І кого ми будемо шукати",
        myGenderLabel: "Я", lookingLabel: "Хочу шукати",
        male: "Хлопець", female: "Дівчина",
        males: "Хлопців", females: "Дівчат", any: "Без різниці",
        ageTitle: "Скільки тобі років?", ageSub: "І в якому віці шукати",
        myAge: "Твій вік", ageRange: "Рамки пошуку",
        bioTitle: "Розкажи про себе", bioSub: "Це допоможе знайти тобі пару",
        bioLabel: "Опис", bioPlaceholder: "Люблю каву, фільми та довгі прогулянки...",
        bioHint: "Користувачі з цікавим описом отримують на 25% більше лайків",
        photoTitle: "Як ти виглядаєш?", photoSub: "Додай своє фото",
        photoLabel: "Твоє фото", photoAdd: "Додати",
        photoHint: "Анкети з фото отримують у 10 разів більше лайків",
        skip: "Пропустити",
        done: "Готово!", doneSub: "Твій профіль створено",
        restart: "Почати знову",
        name: "Ім'я", nickname: "Нікнейм", gender: "Стать", looking: "Шукаю",
        age: "Вік", range: "Діапазон", bio: "Про себе",
        photo: "Фото", photoLoaded: "Завантажено",
        notSpecified: "Не вказано",
        city: "Місто"
    },
    sr: {
        chooseLang: "Izaberi jezik", chooseLangSub: "Jezik koji ti odgovara",
        next: "Dalje", back: "Nazad",
        nameTitle: "Hajde da se upoznamo?", nameSub: "Pocnimo sa tvojim imenom",
        nameLabel: "Ime", namePlaceholder: "Od 2 do 32 karaktera",
        nickLabel: "Nadimak", nickPlaceholder: "@Emberanon_bot",
        nickHint: "Opciono — moze se izostaviti",
        genderTitle: "Ko si ti?", genderSub: "I koga cemo traziti",
        myGenderLabel: "Ja sam", lookingLabel: "Trazim",
        male: "Momak", female: "Devojka",
        males: "Momke", females: "Devojke", any: "Svejedno",
        ageTitle: "Koliko imas godina?", ageSub: "I koje godine da trazim",
        myAge: "Tvoje godine", ageRange: "Opseg pretrage",
        bioTitle: "Reci nesto o sebi", bioSub: "Ovo ce ti pomoci da nadjes par",
        bioLabel: "Opis", bioPlaceholder: "Volim kafu, filmove i duge setnje...",
        bioHint: "Korisnici sa zanimljivim opisom dobijaju 25% vise lajkova",
        photoTitle: "Kako izgledas?", photoSub: "Dodaj svoju fotografiju",
        photoLabel: "Tvoja fotografija", photoAdd: "Dodaj",
        photoHint: "Profili sa fotografijama dobijaju 10x vise lajkova",
        skip: "Preskoci",
        done: "Gotovo!", doneSub: "Tvoj profil je kreiran",
        restart: "Pocni ispocetka",
        name: "Ime", nickname: "Nadimak", gender: "Pol", looking: "Trazim",
        age: "Godine", range: "Opseg", bio: "O sebi",
        photo: "Fotografija", photoLoaded: "Otpremljeno",
        notSpecified: "Nije navedeno",
        city: "Grad"
    },
    kz: {
        chooseLang: "Тілді таңда", chooseLangSub: "Өзіңе ыңғайлы тіл",
        next: "Келесі", back: "Артқа",
        nameTitle: "Танысайық?", nameSub: "Атыңнан бастайық",
        nameLabel: "Атың", namePlaceholder: "2-ден 32 таңбаға дейін",
        nickLabel: "Лақап ат", nickPlaceholder: "@Emberanon_bot",
        nickHint: "Міндетті емес — көрсетпеуге болады",
        genderTitle: "Сен кімсің?", genderSub: "Және кімді іздейміз",
        myGenderLabel: "Мен", lookingLabel: "Іздеймін",
        male: "Жігіт", female: "Қыз",
        males: "Жігіттерді", females: "Қыздарды", any: "Бәрібір",
        ageTitle: "Неше жастасың?", ageSub: "Және қандай жаста іздеймін",
        myAge: "Сенің жасың", ageRange: "Іздеу шегі",
        bioTitle: "Өзің туралы айт", bioSub: "Бұл жұп табуға көмектеседі",
        bioLabel: "Сипаттама", bioPlaceholder: "Кофе, фильмдер және ұзақ серуендерді жақсы көремін...",
        bioHint: "Қызықты сипаттамасы бар қолданушылар 25% көп лайк алады",
        photoTitle: "Сен қалай көрінесің?", photoSub: "Фотосуретіңді қос",
        photoLabel: "Сенің фотосуретің", photoAdd: "Қосу",
        photoHint: "Фотосуреті бар профильдер 10 есе көп лайк алады",
        skip: "Өткізіп жіберу",
        done: "Дайын!", doneSub: "Сенің профилің жасалды",
        restart: "Қайта бастау",
        name: "Аты", nickname: "Лақап ат", gender: "Жынысы", looking: "Іздеймін",
        age: "Жасы", range: "Диапазон", bio: "Өзі туралы",
        photo: "Фотосурет", photoLoaded: "Жүктелді",
        notSpecified: "Көрсетілмеген",
        city: "Қала"
    }
};

function t(key) {
    return (translations[userData.language] && translations[userData.language][key]) || translations.ru[key] || key;
}

function applyLanguage() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        const attr = el.getAttribute("data-i18n-attr");
        if (attr) el.setAttribute(attr, t(key));
        else el.textContent = t(key);
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
    if (screens[currentScreen] === "name") {
        const nameInput = document.getElementById("input-name");
        const name = nameInput.value.trim();
        if (name.length < 2) { shake(nameInput); nameInput.focus(); return; }
        userData.name = name;
        userData.nickname = document.getElementById("input-nickname").value.trim();
        userData.city = document.getElementById("input-city").value.trim();
    }

    if (screens[currentScreen] === "gender") {
        const myGender = document.querySelector("[data-group='my-gender'] .choice.selected");
        const lookingFor = document.querySelector("[data-group='looking-for'] .choice.selected");
        if (!myGender) { shake(document.querySelector("[data-group='my-gender']")); return; }
        if (!lookingFor) { shake(document.querySelector("[data-group='looking-for']")); return; }
        userData.myGender = myGender.dataset.value;
        userData.lookingFor = lookingFor.dataset.value;
    }

    if (screens[currentScreen] === "preferences") {
        userData.preferences = selectedPrefs.join(",");
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
        applyLanguage();
        if (navigator.vibrate) navigator.vibrate(10);
    });
});

function selectChoice(el) {
    const group = el.closest(".choice-group");
    if (!group) return;
    group.querySelectorAll(".choice").forEach(c => c.classList.remove("selected"));
    el.classList.add("selected");
    if (navigator.vibrate) navigator.vibrate(10);
}

// Переключение предпочтений (можно несколько)
function togglePref(el) {
    const value = el.dataset.value;
    if (!value) return;
    if (selectedPrefs.includes(value)) {
        selectedPrefs = selectedPrefs.filter(p => p !== value);
        el.classList.remove("selected");
    } else {
        selectedPrefs.push(value);
        el.classList.add("selected");
    }
    if (navigator.vibrate) navigator.vibrate(10);
}

function handlePhoto(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
        alert("Файл слишком большой (макс 5 МБ)");
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        userData.photo = e.target.result;
        const preview = document.getElementById("photoPreview");
        const placeholder = document.getElementById("photoPlaceholder");
        if (preview) { preview.src = e.target.result; preview.style.display = "block"; }
        if (placeholder) placeholder.style.display = "none";
    };
    reader.readAsDataURL(file);
}

function goToPhoto() {
    userData.bio = document.getElementById("input-bio").value.trim();
    // экран photo теперь индекс 6, поэтому показываем его напрямую
    showScreen(6);
}

function skipPhoto() {
    userData.photo = null;
    finishOnboarding();
}

async function finishOnboarding() {
    const tgId = getTelegramId();
    const tgUsername = getTelegramUsername();

    console.log("📦 Данные:", userData);

    try {
        const response = await fetch(API_URL + "/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                telegram_id: tgId,
                username: tgUsername,
                name: userData.name,
                nickname: userData.nickname || null,
                city: userData.city || null,
                age: parseInt(userData.age),
                gender: userData.myGender,
                looking_for: userData.lookingFor,
                min_age: parseInt(userData.minAge),
                max_age: parseInt(userData.maxAge),
                bio: userData.bio || null,
                photo: userData.photo || null,
                banner: "default",
                preferences: userData.preferences || "",
                language: userData.language
            })
        });
        const result = await response.json();
        console.log("✅ Сохранено в БД:", result);
    } catch (e) {
        console.error("❌ Ошибка отправки:", e);
    }

    const genderText = { male: t("male"), female: t("female"), any: t("any") };
    const resultBox = document.getElementById("result");
    if (resultBox) {
        resultBox.innerHTML =
            "<p><span>" + t("name") + "</span> <strong>" + (userData.name || "—") + "</strong></p>" +
            "<p><span>" + t("nickname") + "</span> <strong>" + (userData.nickname || "—") + "</strong></p>" +
            "<p><span>" + t("city") + "</span> <strong>" + (userData.city || "—") + "</strong></p>" +
            "<p><span>" + t("gender") + "</span> <strong>" + (genderText[userData.myGender] || "—") + "</strong></p>" +
            "<p><span>" + t("looking") + "</span> <strong>" + (genderText[userData.lookingFor] || "—") + "</strong></p>" +
            "<p><span>" + t("age") + "</span> <strong>" + (userData.age || "—") + "</strong></p>" +
            "<p><span>" + t("range") + "</span> <strong>" + userData.minAge + "–" + userData.maxAge + "</strong></p>" +
            "<p><span>" + t("bio") + "</span> <strong>" + (userData.bio || t("notSpecified")) + "</strong></p>" +
            (userData.preferences ? "<p><span>Интересы</span> <strong>" + userData.preferences + "</strong></p>" : "") +
            (userData.photo ? "<p><span>" + t("photo") + "</span> <strong>" + t("photoLoaded") + "</strong></p>" : "");
    }

    try {
        localStorage.setItem("emberUser", JSON.stringify(userData));
        localStorage.setItem("emberRegistered", "true");
    } catch (e) { console.warn("localStorage недоступен", e); }

    showScreen(7);
}

function resetRegistration() {
    localStorage.removeItem("emberUser");
    localStorage.removeItem("emberRegistered");
    location.reload();
}

function restart() {
    localStorage.removeItem("emberUser");
    localStorage.removeItem("emberRegistered");
    location.reload();
}

if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
}

showScreen(0);
applyLanguage();
