// ================================
// IPMAT PREP JAVASCRIPT
// ================================


// Get the buttons

const startTestButton =
    document.getElementById("startTestButton");

const interviewButton =
    document.getElementById("interviewButton");


// ================================
// MOCK TEST BUTTON
// ================================

if (startTestButton) {
    startTestButton.addEventListener("click", function () {
        window.location.href = "mock-test.html";
    });
}


// ================================
// MOCK INTERVIEW BUTTON
// ================================

if (interviewButton) {

    interviewButton.addEventListener("click", function () {

        alert(
            "Mock Interview feature is coming soon! 🎤"
        );

    });

}
// LOGIN & SIGNUP NAVIGATION

const loginButton = document.getElementById("loginButton");
const signupButton = document.getElementById("signupButton");

if (loginButton) {
    loginButton.addEventListener("click", function () {
        window.location.href = "login.html";
    });
}

if (signupButton) {
    signupButton.addEventListener("click", function () {
        window.location.href = "signup.html";
    });
}
// =====================================
// IPMAT PREP - AUTHENTICATION
// =====================================


// SHOW / HIDE LOGIN PASSWORD

const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

if (togglePassword && password) {

    togglePassword.addEventListener("click", function () {

        if (password.type === "password") {
            password.type = "text";
            togglePassword.textContent = "Hide";
        } else {
            password.type = "password";
            togglePassword.textContent = "Show";
        }

    });

}


// SHOW / HIDE SIGNUP PASSWORD

const toggleSignupPassword =
    document.getElementById("toggleSignupPassword");

const signupPassword =
    document.getElementById("signupPassword");

if (toggleSignupPassword && signupPassword) {

    toggleSignupPassword.addEventListener("click", function () {

        if (signupPassword.type === "password") {
            signupPassword.type = "text";
            toggleSignupPassword.textContent = "Hide";
        } else {
            signupPassword.type = "password";
            toggleSignupPassword.textContent = "Show";
        }

    });

}


// SIGNUP FORM VALIDATION

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Check password length
        if (password.length < 8) {
            alert("Password must contain at least 8 characters.");
            return;
        }

        // Check password confirmation
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Prepare form data
        const formData = new URLSearchParams();

        formData.append("fullname", fullname);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);

        try {

            // Send data to PHP using AJAX
            const response = await fetch("register.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                alert(result.message);
                signupForm.reset();
            } else {
                alert(result.message);
            }

        } catch (error) {

            console.error("AJAX Error:", error);
            alert("Something went wrong. Please try again.");

        }

    });

}


// LOGIN FORM

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        alert("Login form is working! Account authentication will be connected soon. 🚀");

    });

}


// FORGOT PASSWORD

const forgotPassword = document.getElementById("forgotPassword");

if (forgotPassword) {

    forgotPassword.addEventListener("click", function (event) {

        event.preventDefault();

        alert("Password recovery feature is coming soon!");

    });

}
// =====================================
// DAILY CHALLENGE
// =====================================

const answerOptions = document.querySelectorAll(".answer-option");
const challengeFeedback = document.getElementById("challengeFeedback");

answerOptions.forEach(function (button) {

    button.addEventListener("click", function () {

        // Prevent answering more than once
        if (button.disabled) {
            return;
        }

        const selectedAnswer = button.dataset.answer;
        const correctAnswer = "50";

        // Disable all answer buttons
        answerOptions.forEach(function (option) {
            option.disabled = true;
        });

        if (selectedAnswer === correctAnswer) {

            // Save challenge progress
            recordChallengeSuccess();

            button.style.background = "#dcfce7";
            button.style.borderColor = "#22c55e";
            button.style.color = "#15803d";

            challengeFeedback.textContent =
                "🎉 Correct! Amazing work! You earned 10 points!";

            challengeFeedback.style.color = "#15803d";

        } else {

            button.style.background = "#fee2e2";
            button.style.borderColor = "#ef4444";
            button.style.color = "#dc2626";

            // Highlight the correct answer
            answerOptions.forEach(function (option) {

                if (option.dataset.answer === correctAnswer) {

                    option.style.background = "#dcfce7";
                    option.style.borderColor = "#22c55e";
                    option.style.color = "#15803d";

                }

            });

            challengeFeedback.textContent =
                "❌ Not quite! The correct answer is B. 50. Keep practising!";

            challengeFeedback.style.color = "#dc2626";

        }

    });

});
// =====================================
// STUDY DASHBOARD
// =====================================

// Get saved dashboard data

let totalPoints = Number(localStorage.getItem("totalPoints")) || 0;

let lessonsCompleted = Number(localStorage.getItem("lessonsCompleted")) || 0;

let challengesSolved = Number(localStorage.getItem("challengesSolved")) || 0;

let studyStreak = Number(localStorage.getItem("studyStreak")) || 0;


// Update dashboard display

function updateDashboard() {

    const streakElement = document.getElementById("streakCount");
    const pointsElement = document.getElementById("pointsCount");
    const lessonsElement = document.getElementById("lessonsCount");
    const challengesElement = document.getElementById("challengesCount");

    const percentageElement = document.getElementById("overallPercentage");
    const progressFill = document.getElementById("overallProgressFill");


    if (streakElement) {
        streakElement.textContent = studyStreak + " Days";
    }

    if (pointsElement) {
        pointsElement.textContent = totalPoints;
    }

    if (lessonsElement) {
        lessonsElement.textContent = lessonsCompleted;
    }

    if (challengesElement) {
        challengesElement.textContent = challengesSolved;
    }


    // Calculate preparation progress

    const percentage = Math.min(
        100,
        Math.round(
            (lessonsCompleted / 10 * 50) +
            (challengesSolved / 20 * 50)
        )
    );

    if (percentageElement) {
        percentageElement.textContent = percentage + "%";
    }

    if (progressFill) {
        progressFill.style.width = percentage + "%";
    }

}
// =====================================
// RECORD DAILY CHALLENGE SUCCESS
// =====================================

function recordChallengeSuccess() {

    const today = new Date().toLocaleDateString("en-CA");

    const lastStudyDate = localStorage.getItem("lastStudyDate");

    // Prevent duplicate rewards on the same day
    if (lastStudyDate === today) {
        return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayDate = yesterday.toLocaleDateString("en-CA");

    // Update streak
    if (lastStudyDate === yesterdayDate) {
        studyStreak++;
    } else {
        studyStreak = 1;
    }

    // Award points and challenge count
    totalPoints += 10;
    challengesSolved++;

    // Save everything
    localStorage.setItem("totalPoints", totalPoints);
    localStorage.setItem("challengesSolved", challengesSolved);
    localStorage.setItem("studyStreak", studyStreak);
    localStorage.setItem("lastStudyDate", today);

    // Refresh dashboard
    updateDashboard();

}

// Display saved data when the page loads

updateDashboard();