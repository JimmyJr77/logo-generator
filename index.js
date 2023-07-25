const fs = require('fs');
const inquirer = require('inquirer');

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
];

function generateLogo(answers) {
    const {shape, shapeColor, text, textColor} = answers;
  
    console.log('Logo Design Requirements:');
    console.log('Shape:', shape);
    console.log('Shape Color:', shapeColor);
    console.log('Text:', text);
    console.log('Text Color:', textColor);
  
    // Generate the HTML content dynamically
    const htmlContent = `
        <!DOCTYPE html>
        <html>
            <head>
            <link rel="stylesheet" href="Assets/style.css">
            <title>Dynamic Logo</title>
            </head>
            <body>
                <div id="${shape}"</div>
            </body>
        </html>
    `;
  
    // Write the generated HTML content to a file
    fs.writeFile('logo.html', htmlContent, (err) => {
      if (err) {
        console.error('Error writing logo.html:', err);
      } else {
        console.log('Logo HTML file generated successfully!');
      }
    });
  }
  
  inquirer.prompt(questions).then((answers) => {
    generateLogo(answers);
  });

