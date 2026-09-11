const removeBgInput = document.getElementById("removeBgInput");
const removeBgDropZone = document.getElementById("removeBgDropZone");
const startRemoveBg = document.getElementById("startRemoveBg");
const removeBgStatus = document.getElementById("removeBgStatus");
const themeToggle = document.getElementById("themeToggle");

// =========================
// DRAG & DROP
// =========================

removeBgDropZone.addEventListener("dragover", function (event) {
    event.preventDefault();
    removeBgDropZone.classList.add("dragging");
});

removeBgDropZone.addEventListener("dragleave", function () {
    removeBgDropZone.classList.remove("dragging");
});

removeBgDropZone.addEventListener("drop", function (event) {
    event.preventDefault();
    removeBgDropZone.classList.remove("dragging");

    removeBgInput.files = event.dataTransfer.files;
});

// =========================
// УДАЛЕНИЕ ФОНА
// =========================

startRemoveBg.addEventListener("click", function () {
    const file = removeBgInput.files[0];

    if (!file) {
        alert("Выберите изображение");
        return;
    }

    removeBgStatus.textContent = "Обработка изображения...";

    const imageUrl = URL.createObjectURL(file);

    import("https://cdn.jsdelivr.net/npm/@imgly/background-removal/+esm")
        .then(function (module) {
            const removeBackground = module.removeBackground;

            return removeBackground(imageUrl);
        })
        .then(function (blob) {
            const resultUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = resultUrl;
            link.download = "no-background.png";

            link.click();

            removeBgStatus.textContent = "Готово! Фон удалён.";

            URL.revokeObjectURL(resultUrl);
            URL.revokeObjectURL(imageUrl);
        })
        .catch(function (error) {
            removeBgStatus.textContent = "Ошибка при удалении фона";

            console.error(error);

            URL.revokeObjectURL(imageUrl);
        });
});

// =========================
// ТЁМНАЯ ТЕМА
// =========================

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
});