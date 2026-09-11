const compressInput = document.getElementById("compressInput");
const compressDropZone = document.getElementById("compressDropZone");
const quality = document.getElementById("quality");
const startCompress = document.getElementById("startCompress");

compressDropZone.addEventListener("dragover", function (event) {
    event.preventDefault();
    compressDropZone.classList.add("dragging");
});

compressDropZone.addEventListener("dragleave", function () {
    compressDropZone.classList.remove("dragging");
});

compressDropZone.addEventListener("drop", function (event) {
    event.preventDefault();
    compressDropZone.classList.remove("dragging");

    compressInput.files = event.dataTransfer.files;
});

startCompress.addEventListener("click", function () {
    const file = compressInput.files[0];

    if (!file) {
        alert("Выберите изображение");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        const img = new Image();

        img.onload = function () {
            const canvas = document.createElement("canvas");

            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");

            ctx.drawImage(img, 0, 0);

            const qualityValue = Number(quality.value);

            const dataUrl = canvas.toDataURL(
                "image/jpeg",
                qualityValue
            );

            const link = document.createElement("a");

            link.href = dataUrl;
            link.download = "compressed-image.jpg";

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