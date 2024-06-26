import { Validator } from 'request-validator';

// Create a new instance of the validator
const validator = new Validator();

// Define the validation rules for different scenarios
const rules = {
    registration: {
        name: 'required|string',
        email: 'required|email',
        age: 'required|numeric|min:18',
    },
    login: {
        email: 'required|email',
        password: 'required|string|min:8',
    },
    // Add more rule sets for different scenarios as needed
};

// Validate and sanitize the request data
const validateAndSanitize = (scenario) => {
    return (req, res, next) => {
        const data = req.body; // Assuming the request body contains the data to be validated

        // Get the validation rules for the specified scenario
        const scenarioRules = rules[scenario];

        // Perform validation
        const validation = validator.validate(data, scenarioRules);
        if (validation.fails()) {
            return res.status(400).json({ errors: validation.errors });
        }

        // If validation passes, sanitize the data (example)
        const sanitizedData = validator.sanitize(data, scenarioRules);
        req.body = sanitizedData;

        next();
    };
};

export { validateAndSanitize, rules };