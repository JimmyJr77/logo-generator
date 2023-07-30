const index = require('./index');


const userInputValidation = (input) => {
    // Check if the input is exactly 3 characters long
    return input.length <= 3 ? true : 'Please enter 3 characters or less.';
};

const questions = [
    {
        type: 'list',
        message: 'What shape would you like to use?',
        name: 'shape',
        choices: ['circle', 'square', 'triangle'],
    },
    {
        type: 'input',
        message: 'What color would you like for the shape (enter the color name or hexadecimal number)?',
        name: 'shapeColor',
    },
    {
        type: 'input',
        message: 'Add up to 3 characters to your logo or leave blank for no text.',
        name: 'text',
        validate: userInputValidation, // Validate user input using the defined function
    },
    {
        type: 'input',
        message: 'What color would you like for the text (enter the color name or hexadecimal number)?',
        name: 'textColor',
        when: (answers) => answers.text,
    },
    {
        type: 'list',
        message: 'What size would you like your font?',
        name: 'fontSize',
        when: (answers) => answers.text,
        choices: [
            "Small",
            "Medium",
            "Large"
        ]
    },
    {
        type: 'list',
        message: 'What font family would you like to use for your logo?',
        name: 'font',
        when: (answers) => answers.text,
        choices: [
            "'Courier New', Courier, monospace",
            "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
            "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
            "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
            "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            "'Times New Roman', Times, serif",
            "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
            "Arial, Helvetica, sans-serif",
            "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
            "Georgia, 'Times New Roman', Times, serif",
            "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
            "Verdana, Geneva, Tahoma, sans-serif",
        ]
    },
    {
        type: 'list',
        message: 'Where would you like your text positioned?',
        name: 'textPosition',
        when: (answers) => answers.text,
        choices: [
            "top left",
            "top middle",
            "top right",
            "center left",
            "center middle",
            "center right",
            "bottom left",
            "bottom middle",
            "bottom right",
        ]
    }
];    

module.exports = questions;

