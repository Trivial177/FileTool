const resizeInput = document.getElementById("resizeInput");
const resizeDropZone = document.getElementById("resizeDropZone");
const newWidth = document.getElementById("newWidth");
const newHeight = document.getElementById("newHeight");
const startResize = document.getElementById("startResize");
const themeToggle = document.getElementById("themeToggle");


// =========================
// DRAG & DROP
// =========================

resizeDropZone.addEventListener("dragover", function (event) {
    event.preventDefault();
    resizeDropZone.classList.add("dragging");
});

resizeDropZone.addEventListener("dragleave", function () {
    resizeDropZone.classList.remove("dragging");
});

resizeDropZone.addEventListener("drop", function (event) {
    event.preventDefault();

    resizeDropZone.classList.remove("dragging");

    resizeInput.files = event.dataTransfer.files;
});


// =========================
// ИЗМЕНЕНИЕ РАЗМЕРА
// =========================

startResize.addEventListener("click", function () {

    const file = resizeInput.files[0];

    if (!file) {
        alert("Выберите изображение");
        return;
    }

    const width = Number(newWidth.value);
    const height = Number(newHeight.value);

    if (!width || !height || width <= 0 || height <= 0) {
        alert("Введите правильную ширину и высоту");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {

        const img = new Image();

        img.onload = function () {

            const canvas = document.createElement("canvas");

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");

            ctx.drawImage(
                img,
                0,
                0,
                width,
                height
            );

            const dataUrl = canvas.toDataURL(
                "image/jpeg",
                0.9
            );

            const link = document.createElement("a");

            link.href = dataUrl;
            link.download = `resized-${width}x${height}.jpg`;

            link.click();
        };

        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
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