const Bug = require('../models/bug.model');
const { validateBugInput } = require('../utils/validator'); // Use our validator helper

// --- GET All Bugs ---
const getBugs = async (req, res, next) => {
    try {
        const bugs = await Bug.find({});
        res.status(200).json(bugs);
    } catch (error) {
        next(error); // Pass error to the global error handler
    }
};

// --- POST Create New Bug ---
const createBug = async (req, res, next) => {
    const { title, description, priority } = req.body;

    // Use unit-tested validation logic
    const validation = validateBugInput(title, description); 
    if (!validation.isValid) {
        res.status(400); // Bad Request
        return next(new Error(validation.message));
    }
    
    try {
        const newBug = await Bug.create({ title, description, priority });
        res.status(201).json(newBug);
    } catch (error) {
        // Handle Mongoose validation errors or other DB errors
        next(error); 
    }
};

// --- PUT Update Bug Status/Details ---
const updateBug = async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;

    // Note: In a production app, you'd add validation for 'updates' here too.

    try {
        const updatedBug = await Bug.findByIdAndUpdate(id, updates, { 
            new: true, // Return the updated document
            runValidators: true // Rerun validators defined in the model
        });

        if (!updatedBug) {
            res.status(404);
            return next(new Error(`Bug with ID ${id} not found.`));
        }

        res.status(200).json(updatedBug);
    } catch (error) {
        next(error); 
    }
};

// --- DELETE Bug ---
const deleteBug = async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const deletedBug = await Bug.findByIdAndDelete(id);

        if (!deletedBug) {
            res.status(404);
            return next(new Error(`Bug with ID ${id} not found.`));
        }
        
        res.status(200).json({ message: 'Bug successfully deleted.', id: id });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getBugs,
    createBug,
    updateBug,
    deleteBug
};