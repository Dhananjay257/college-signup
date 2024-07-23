let currentStep = 0; // Current step is set to be the first step (0)
showStep(currentStep); // Display the current step

function showStep(n) {
    let steps = document.getElementsByClassName("step");
    steps[n].style.display = "block";
    fixStepIndicator(n);
    updateNavigationButtons(n, steps.length);
    addInputEventListeners(steps[n]);
}

function nextPrev(n) {
    let steps = document.getElementsByClassName("step");
    if (n === 1 && !validateForm()) return false;
    steps[currentStep].style.display = "none";
    currentStep = currentStep + n;
    if (currentStep >= steps.length) {
        document.getElementById("multiStepForm").submit();
        return false;
    }
    showStep(currentStep);
}

function validateForm() {
    let valid = true;
    let inputs = document.getElementsByClassName("step")[currentStep].getElementsByTagName("input");
    let selects = document.getElementsByClassName("step")[currentStep].getElementsByTagName("select");

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
            inputs[i].classList.add("is-invalid");
            inputs[i].classList.remove("is-valid");
            valid = false;
        } else {
            inputs[i].classList.remove("is-invalid");
            inputs[i].classList.add("is-valid");
        }
    }
    for (let i = 0; i < selects.length; i++) {
        if (selects[i].value === "") {
            selects[i].classList.add("is-invalid");
            selects[i].classList.remove("is-valid");
            valid = false;
        } else {
            selects[i].classList.remove("is-invalid");
            selects[i].classList.add("is-valid");
        }
    }
    return valid;
}

function fixStepIndicator(n) {
    let stepIcons = document.getElementsByClassName("step-icon");
    for (let i = 0; i < stepIcons.length; i++) {
        stepIcons[i].className = stepIcons[i].className.replace(" active", "");
    }
    stepIcons[n].className += " active";
}

function updateNavigationButtons(n, stepCount) {
    let prevBtn = document.getElementById("prevBtn");
    let nextBtn = document.getElementById("nextBtn");
    let submitBtn = document.getElementById("submitBtn");

    if (n === 0) {
        prevBtn.style.display = "none";
    } else {
        prevBtn.style.display = "inline";
    }

    if (n === (stepCount - 1)) {
        nextBtn.style.display = "none";
        submitBtn.style.display = "inline";
    } else {
        nextBtn.style.display = "inline";
        submitBtn.style.display = "none";
    }
}

function addInputEventListeners(step) {
    let inputs = step.getElementsByTagName("input");
    let selects = step.getElementsByTagName("select");

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("input", function () {
            if (inputs[i].value !== "") {
                inputs[i].classList.remove("is-invalid");
                inputs[i].classList.add("is-valid");
            } else {
                inputs[i].classList.remove("is-valid");
            }
        });
    }

    for (let i = 0; i < selects.length; i++) {
        selects[i].addEventListener("change", function () {
            if (selects[i].value !== "") {
                selects[i].classList.remove("is-invalid");
                selects[i].classList.add("is-valid");
            } else {
                selects[i].classList.remove("is-valid");
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const phoneInputField = document.querySelector("#college-phone");
    const phoneInput = window.intlTelInput(phoneInputField, {
        onlyCountries: ["in"],
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });

    const repPhoneInputField = document.querySelector("#phone");
    const repPhoneInput = window.intlTelInput(repPhoneInputField, {
        onlyCountries: ["in"],
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });
});
