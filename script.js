const convertButton = document.getElementById("convertButton");
const converter = document.getElementById("converter");

convertButton.addEventListener("click", function () {
    converter.style.display = "block";
    compressor.style.display = "none";
    resizer.style.display = "none";
    removeBg.style.display = "none";
    replaceBg.style.display = "none";
});
const imageInput = document.getElementById("imageInput");
const convertDropZone = document.getElementById("convertDropZone");
const formatSelect = document.getElementById("formatSelect");
const startConvert = document.getElementById("startConvert");
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
link.download = "converted-image";
link.click();
};
img.src = event.target.result;
};
reader.readAsDataURL(file);
});
const compressButton = document.getElementById("compressButton");
const compressor = document.getElementById("compressor");
const compressInput = document.getElementById("compressInput");
const compressDropZone = document.getElementById("compressDropZone");
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
const quality = document.getElementById("quality");
const startCompress = document.getElementById("startCompress");

compressButton.addEventListener("click", function () {
    converter.style.display = "none";
    compressor.style.display = "block";
    resizer.style.display = "none";
    removeBg.style.display = "none";
    replaceBg.style.display = "none";
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
const dataUrl = canvas.toDataURL("image/jpeg", qualityValue);

const link = document.createElement("a");
link.href = dataUrl;
link.download = "compressed-image.jpg";
link.click();

};

img.src = event.target.result;
};

reader.readAsDataURL(file);
});
const resizeButton = document.getElementById("resizeButton");
const resizer = document.getElementById("resizer");
const resizeInput = document.getElementById("resizeInput");
const resizeDropZone = document.getElementById("resizeDropZone");
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
const newWidth = document.getElementById("newWidth");
const newHeight = document.getElementById("newHeight");
const startResize = document.getElementById("startResize");

resizeButton.addEventListener("click", function () {
    converter.style.display = "none";
    compressor.style.display = "none";
    resizer.style.display = "block";
    removeBg.style.display = "none";
    replaceBg.style.display = "none";
});
startResize.addEventListener("click", function () {
    const file = resizeInput.files[0];
    if (!file) {
    alert("Выберите изображение");
    return;
}

const width = Number(newWidth.value);
const height = Number(newHeight.value);
if (!width || !height) {
    alert("Введите ширину и высоту");
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
ctx.drawImage(img, 0, 0, width, height);

const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
const link = document.createElement("a");
link.href = dataUrl;
link.download = "resized-image.jpg";
link.click();
};

img.src = event.target.result;
};
reader.readAsDataURL(file);
});
const removeBgButton = document.getElementById("removeBgButton");
const removeBg = document.getElementById("removeBg");
const removeBgInput = document.getElementById("removeBgInput");
const removeBgDropZone = document.getElementById("removeBgDropZone");
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
const startRemoveBg = document.getElementById("startRemoveBg");
const removeBgStatus = document.getElementById("removeBgStatus");
removeBgButton.addEventListener("click", function () {
    converter.style.display = "none";
    compressor.style.display = "none";
    resizer.style.display = "none";
    removeBg.style.display = "block";
    replaceBg.style.display = "none";
});
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

removeBackground(imageUrl)
    .then(function (blob) {
        const resultUrl = URL.createObjectURL(blob);
const link = document.createElement("a");

link.href = resultUrl;
link.download = "no-background.png";
link.click();
removeBgStatus.textContent = "Готово! Фон удалён.";

URL.revokeObjectURL(resultUrl);
})
})
.catch(function (error) {
    removeBgStatus.textContent = "Ошибка при удалении фона";
    console.error(error);
});
});
const replaceBgButton = document.getElementById("replaceBgButton");
const replaceBg = document.getElementById("replaceBg");
const replaceMainInput = document.getElementById("replaceMainInput");
const replaceMainDropZone = document.getElementById("replaceMainDropZone");
replaceMainDropZone.addEventListener("dragover", function (event) {
    event.preventDefault();
    replaceMainDropZone.classList.add("dragging");
});
replaceMainDropZone.addEventListener("dragleave", function () {
    replaceMainDropZone.classList.remove("dragging");
});
replaceMainDropZone.addEventListener("drop", function (event) {
    event.preventDefault();
    replaceMainDropZone.classList.remove("dragging");
    replaceMainInput.files = event.dataTransfer.files;
});

const replaceBackgroundInput = document.getElementById("replaceBackgroundInput");
const replaceBackgroundDropZone = document.getElementById("replaceBackgroundDropZone");
replaceBackgroundDropZone.addEventListener("dragover", function (event) {
    event.preventDefault();
    replaceBackgroundDropZone.classList.add("dragging");
});
replaceBackgroundDropZone.addEventListener("dragleave", function () {
    replaceBackgroundDropZone.classList.remove("dragging");
});
replaceBackgroundDropZone.addEventListener("drop", function (event) {
    event.preventDefault();
    replaceBackgroundDropZone.classList.remove("dragging");
    replaceBackgroundInput.files = event.dataTransfer.files;
});
const startReplaceBg = document.getElementById("startReplaceBg");
const replaceBgStatus = document.getElementById("replaceBgStatus");
replaceBgButton.addEventListener("click", function () {
    converter.style.display = "none";
    compressor.style.display = "none";
    resizer.style.display = "none";
    removeBg.style.display = "none";
    replaceBg.style.display = "block";
});
startReplaceBg.addEventListener("click", function () {
    const mainFile = replaceMainInput.files[0];
    const backgroundFile = replaceBackgroundInput.files[0];
    if (!mainFile || !backgroundFile) {
    alert("Выберите основное изображение и новый фон");
    return;
}
replaceBgStatus.textContent = "Меняем фон...";
const mainUrl = URL.createObjectURL(mainFile);
const backgroundUrl = URL.createObjectURL(backgroundFile);
import("https://cdn.jsdelivr.net/npm/@imgly/background-removal/+esm")
    .then(function (module) {
        const removeBackground = module.removeBackground;
        removeBackground(mainUrl)
    .then(function (blob) {
        const objectUrl = URL.createObjectURL(blob);
const backgroundImg = new Image();
const objectImg = new Image();
backgroundImg.src = backgroundUrl;
objectImg.src = objectUrl;
let loadedImages = 0;

function checkImagesLoaded() {
    loadedImages++;

    if (loadedImages === 2) {
        const canvas = document.createElement("canvas");
        canvas.width = backgroundImg.width;
        canvas.height = backgroundImg.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(
    backgroundImg,
    0,
    0,
    canvas.width,
    canvas.height
);
ctx.drawImage(
    objectImg,
    0,
    0,
    canvas.width,
    canvas.height
);

const resultUrl = canvas.toDataURL("image/png");
const link = document.createElement("a");
link.href = resultUrl;
link.download = "replaced-background.png";
link.click();
replaceBgStatus.textContent = "Готово! Фон заменён.";
    }
}

backgroundImg.onload = checkImagesLoaded;
objectImg.onload = checkImagesLoaded;
})
.catch(function (error) {
    replaceBgStatus.textContent = "Ошибка при замене фона";
    console.error(error);
});
    })
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
