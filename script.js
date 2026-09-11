// =========================
// ТЁМНАЯ ТЕМА
// =========================

const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    themeToggle.textContent = "☀️";
} else {
    themeToggle.textContent = "🌙";
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