const { validateBugInput } = require('../../utils/validator');

describe('Unit Tests: Input Validation Logic', () => {

    // Test Case 1: Valid input should pass
    test('should return {isValid: true} for correctly formatted title and description', () => {
        const result = validateBugInput(
            "Urgent: Database Connection Issue", 
            "The application fails to connect to the MongoDB server upon startup, resulting in a 500 error on all API calls."
        );
        expect(result.isValid).toBe(true);
        expect(result.message).toBeUndefined();
    });

    // Test Case 2: Missing title should fail
    test('should return {isValid: false} when the title is missing or empty', () => {
        // Test with empty string
        let result = validateBugInput("", "Description must be at least 10 characters.");
        expect(result.isValid).toBe(false);
        expect(result.message).toContain("title is required");

        // Test with null
        result = validateBugInput(null, "Description must be at least 10 characters.");
        expect(result.isValid).toBe(false);
        expect(result.message).toContain("title is required");
    });
    
    // Test Case 3: Description too short should fail
    test('should return {isValid: false} when the description is less than 10 characters', () => {
        const result = validateBugInput("Valid Title", "Too short");
        expect(result.isValid).toBe(false);
        expect(result.message).toContain("Description must be at least 10 characters long");
    });
    
    // Test Case 4: Title too long should fail (based on 100 char limit in validator)
    test('should return {isValid: false} when the title exceeds 100 characters', () => {
        // Create a string that is exactly 101 characters long
        const longTitle = 'A'.repeat(101); 
        const result = validateBugInput(longTitle, "A sufficiently long description for testing purposes.");
        
        expect(result.isValid).toBe(false);
        expect(result.message).toContain("cannot exceed 100 characters");
    });
});