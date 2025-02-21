export const checkValidateData = (email, password) => {
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    
    if (!isEmailValid) return "Email ID is not valid. Please enter a valid email address.";

    let passwordErrors = [];

    if (password.length < 8) {
        passwordErrors.push("Password must be at least 8 characters long.");
    }
    else if  (!/[A-Z]/.test(password)) {
        passwordErrors.push("Password must contain at least one uppercase letter (A-Z).");
    }
    else if (!/[a-z]/.test(password)) {
        passwordErrors.push("Password must contain at least one lowercase letter (a-z).");
    }
    else if (!/\d/.test(password)) {
        passwordErrors.push("Password must contain at least one number (0-9).");
    }
    else if (!/[!@#$%^&*()_+\-[\]{};':"\\|,.<>/?]/.test(password)) {
        passwordErrors.push("Password must contain at least one special character (!@#$%^&* etc.).");
    }

    if (passwordErrors.length > 0) {
        return passwordErrors.join(" ");
    }

    return null;
};
