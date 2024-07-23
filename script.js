let currentStep = 0; // Current step is set to be the first step (0)
showStep(currentStep); // Display the current step

function showStep(n) {
    let steps = document.getElementsByClassName("step");
    steps[n].style.display = "block";
    fixStepIndicator(n);
    updateNavigationButtons(n, steps.length);
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
    // let textareas = document.getElementsByClassName("step")[currentStep].getElementsByTagName("textarea");
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
            inputs[i].className += " is-invalid";
            valid = false;
        } else {
            inputs[i].className = inputs[i].className.replace(" is-invalid", "");
        }
    }
    for (let i = 0; i < selects.length; i++) {
        if (selects[i].value === "") {
            selects[i].className += " is-invalid";
            valid = false;
        } else {
            selects[i].className = selects[i].className.replace(" is-invalid", "");
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

document.addEventListener("DOMContentLoaded", function () {
    // Form validation
    const forms = document.querySelectorAll(".needs-validation");
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener("submit", function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add("was-validated");
        }, false);
    });

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
