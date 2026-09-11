const replaceMainInput = document.getElementById("replaceMainInput");
const replaceBackgroundInput = document.getElementById("replaceBackgroundInput");

const replaceMainDropZone = document.getElementById("replaceMainDropZone");
const replaceBackgroundDropZone = document.getElementById("replaceBackgroundDropZone");

const startReplaceBg = document.getElementById("startReplaceBg");
const replaceBgStatus = document.getElementById("replaceBgStatus");


// =========================
// DRAG & DROP — ОСНОВНОЕ ФОТО
// =========================

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

    const files = event.dataTransfer.files;

    if (files.length) {
        replaceMainInput.files = files;
    }
});


// =========================
// DRAG & DROP — НОВЫЙ ФОН
// =========================

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

    const files = event.dataTransfer.files;

    if (files.length) {
        replaceBackgroundInput.files = files;
    }
});


// =========================
// ЗАМЕНА ФОНА
// =========================

startReplaceBg.addEventListener("click", async function () {

    const mainFile = replaceMainInput.files[0];
    const backgroundFile = replaceBackgroundInput.files[0];

    if (!mainFile || !backgroundFile) {
        alert("Выберите оба изображения");
        return;
    }

    startReplaceBg.disabled = true;
    replaceBgStatus.textContent = "Удаляем старый фон...";

    const mainImageUrl = URL.createObjectURL(mainFile);
    const backgroundImageUrl = URL.createObjectURL(backgroundFile);

    try {

        // Загружаем библиотеку удаления фона
        const module = await import(
            "https://cdn.jsdelivr.net/npm/@imgly/background-removal/+esm"
        );

        const removeBackground = module.removeBackground;

        // Удаляем фон с основного изображения
        const foregroundBlob = await removeBackground(mainImageUrl);

        replaceBgStatus.textContent = "Создаём новое изображение...";

        const foregroundUrl = URL.createObjectURL(foregroundBlob);

        const foregroundImg = new Image();
        const backgroundImg = new Image();

        foregroundImg.src = foregroundUrl;
        backgroundImg.src = backgroundImageUrl;

        await Promise.all([
            new Promise(function (resolve, reject) {
                foregroundImg.onload = resolve;
                foregroundImg.onerror = reject;
            }),

            new Promise(function (resolve, reject) {
                backgroundImg.onload = resolve;
                backgroundImg.onerror = reject;
            })
        ]);

        // Размер результата = размер основного изображения
        const canvas = document.createElement("canvas");

        canvas.width = foregroundImg.width;
        canvas.height = foregroundImg.height;

        const ctx = canvas.getContext("2d");

        // Рисуем новый фон
        ctx.drawImage(
            backgroundImg,
            0,
            0,
            canvas.width,
            canvas.height
        );

        // Поверх него рисуем объект без старого фона
        ctx.drawImage(
            foregroundImg,
            0,
            0,
            canvas.width,
            canvas.height
        );

        canvas.toBlob(function (blob) {

            if (!blob) {
                replaceBgStatus.textContent =
                    "Не удалось создать изображение.";
                startReplaceBg.disabled = false;
                return;
            }

            const resultUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = resultUrl;
            link.download = "image-with-new-background.png";

            document.body.appendChild(link);

            link.click();

            link.remove();

            replaceBgStatus.textContent =
                "Готово! Фон заменён.";

            setTimeout(function () {
                URL.revokeObjectURL(resultUrl);
            }, 1000);

            startReplaceBg.disabled = false;

        }, "image/png");


        setTimeout(function () {
            URL.revokeObjectURL(foregroundUrl);
            URL.revokeObjectURL(mainImageUrl);
            URL.revokeObjectURL(backgroundImageUrl);
        }, 2000);


    } catch (error) {

        console.error(error);

        replaceBgStatus.textContent =
            "Ошибка при замене фона.";

        startReplaceBg.disabled = false;

        URL.revokeObjectURL(mainImageUrl);
        URL.revokeObjectURL(backgroundImageUrl);
    }

});