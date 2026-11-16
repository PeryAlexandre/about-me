// Lab 2; Greeting section, theme toggle functionality
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

//Lab 3; Goals section
const goals = [  { text: "Learn JavaScript", done: false },  { text: "Practice Git", done: true } ]; 
const goalForm = document.getElementById("goal-form"); 
const goalInput = document.getElementById("goal-input"); 
const goalList = document.getElementById("goal-list"); 
const goalCount = document.getElementById("goal-count"); 
const goalMessage = document.getElementById("goal-message");

// Makes message time out after three seconds
let goalMessageTimer;
function showGoalMessage(message) {
    clearTimeout(goalMessageTimer);

    goalMessage.textContent = message;
    goalMessage.classList.add("goal-message-error");

    goalMessageTimer = setTimeout(function () {
        goalMessage.textContent = "";
        goalMessage.classList.remove("goal-message-error");
    }, 5000);
}

function renderGoals() {  
    goalList.replaceChildren();  
    
    goals.forEach(function (goal, index) {    
        const item = document.createElement("li");    
        
        // Makes Checkbox
        const checkbox = document.createElement("input"); 
        checkbox.type = "checkbox"; 
        checkbox.checked = goal.done; 
        checkbox.setAttribute("aria-label", "Complete " + goal.text); 
        checkbox.addEventListener("change", function () {  
            goal.done = checkbox.checked;  
            renderGoals(); });

        const label = document.createElement("span");    
        label.textContent = goal.text;
        label.classList.toggle("goal-done", goal.done);    
        item.append(checkbox, label);

        //Remove button and minus icon
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "remove-goal-button";
        removeButton.setAttribute("aria-label", "Remove " + goal.text);
        removeButton.title = "Remove goal";
        removeButton.innerHTML = '<i class="fa-solid fa-circle-minus" aria-hidden="true"></i>';

        removeButton.addEventListener("click", function () {
            goals.splice(index, 1);
            renderGoals();
            showGoalMessage("Goal removed.");
        });

        item.append(removeButton);
        goalList.append(item);  
    });  
    const completed = goals.filter(function (goal) {  
        return goal.done; 
    }).length; 
    const remaining = goals.length - completed; 
    goalCount.textContent = "Goals: " + goals.length +  
    " | Completed: " + completed + " | Remaining: " + remaining; 
}

renderGoals();

goalForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = goalInput.value.trim();

    if (text === "") {
        showGoalMessage("Enter a goal first.");
        return;
    }

    goals.push({ text: text, done: false });
    renderGoals();

    goalInput.value = "";
    showGoalMessage("Goal added.");
    goalInput.focus();
});