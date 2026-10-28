
const nameInput = document.getElementById("visitor-name");
const greetButton = document.getElementById("greet-button");
const greeting = document.getElementById("greeting");

function greetVisitor() {
    const name = nameInput.value.trim();

    if (name === "") {
        greeting.textContent = "Please enter your name.";
    } else {
        greeting.textContent = "Hi, " + name + "!";
    }

    nameInput.value = "";
}

greetButton.addEventListener("click", greetVisitor);

nameInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        greetVisitor();
    }
});

// Theme toggle
const themeButton = document.getElementById("theme-button");
const themeIcon = themeButton.querySelector("i");
let isAnimating = false;

themeButton.addEventListener("click", function() {
    // Prevent repeated clicks during the animation
    if (isAnimating) return;
    isAnimating = true;

    // Fade out and rotate the current icon
    themeIcon.classList.add("fade-out");

    setTimeout(function() {
        document.body.classList.toggle("dark-theme");

        const isDark = document.body.classList.contains("dark-theme");

        if (isDark) {
            themeIcon.classList.replace("fa-moon", "fa-sun");
            themeButton.setAttribute("aria-label", "Switch to light theme");
            themeButton.title = "Switch to light theme";
        } else {
            themeIcon.classList.replace("fa-sun", "fa-moon");
            themeButton.setAttribute("aria-label", "Switch to dark theme");
            themeButton.title = "Switch to dark theme";
        }

        // Fade the new icon back in
        themeIcon.classList.remove("fade-out");

        setTimeout(function() {
            isAnimating = false;
        }, 250);
    }, 250);
});