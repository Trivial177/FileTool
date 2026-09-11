const imageInput = document.getElementById("imageInput");
const convertDropZone = document.getElementById("convertDropZone");
const formatSelect = document.getElementById("formatSelect");
const startConvert = document.getElementById("startConvert");

// Перетаскивание изображения
convertDropZone.addEventListener("dragover", function (event) {
    event.preventDefault();
    convertDropZone.classList.add("dragging");
});

convertDropZone.addEventListener("dragleave", function () {
    convertDropZone.classList.remove("dragging");
});

convertDropZone.addEventListener("drop", function (event) {
    event.preventDefault();

    convertDropZone.classList.remove("dragging");

    imageInput.files = event.dataTransfer.files;
});

// Конвертация
startConvert.addEventListener("click", function () {

    const file = imageInput.files[0];

    if (!file) {
        alert("Выберите изображение");
        return;
    }

    const format = formatSelect.value;

    const reader = new FileReader();

    reader.onload = function (event) {

        const img = new Image();

        img.onload = function () {

            const canvas = document.createElement("canvas");

            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");

            ctx.drawImage(img, 0, 0);

            const dataUrl = canvas.toDataURL(format);

            const link = document.createElement("a");

            link.href = dataUrl;

            // Правильное расширение файла
            let extension = "jpg";

            if (format === "image/png") {
                extension = "png";
            }

            if (format === "image/webp") {
                extension = "webp";
            }

            link.download = "converted-image." + extension;

            link.click();
        };

        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
});
const themeToggle = document.getElementById("themeToggle");

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