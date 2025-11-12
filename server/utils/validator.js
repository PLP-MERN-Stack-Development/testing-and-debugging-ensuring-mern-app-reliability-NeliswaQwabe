/**
 * Validates the input fields for a new bug report.
 * @param {string} title - The title of the bug.
 * @param {string} description - The detailed description of the bug.
 * @returns {object} An object containing the validation result: { isValid: boolean, message?: string }
 */
const validateBugInput = (title, description) => {
    // 1. Title validation
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
        return { isValid: false, message: "Bug title is required and cannot be empty." };
    }

    // 2. Description validation (must be at least 10 characters)
    if (!description || typeof description !== 'string' || description.trim().length < 10) {
        return { isValid: false, message: "Bug description must be at least 10 characters long." };
    }

    // 3. Title length check
    if (title.trim().length > 100) {
        return { isValid: false, message: "Bug title cannot exceed 100 characters." };
    }
    
    // If all checks pass
    return { isValid: true };
};

// You can add more specific validators here (e.g., validateStatusUpdate)

module.exports = { 
    validateBugInput 
};