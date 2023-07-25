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
                <div id="${shape}"><span id="text">${text}</div>
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

    const cssContent = `
    /* Triangle */
    #triangle {
        position: absolute;
        display: flex;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 0;
        height: 0;
        border-left: 125px solid transparent;
        border-right: 125px solid transparent;
        border-bottom: 250px solid #ff0000; 
        background-color: ${shapeColor};
    }
      
    /* Square */
    #square {
        position: absolute;
        display: flex;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 250px;
        height: 250px;
        background-color: ${shapeColor};
    }
      
    /* Circle */
    #circle {
        position: absolute;
        display:flex;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 250px;
        height: 250px;
        border-radius: 50%;
        background-color: ${shapeColor};
    }
    
    /* Text */
    #text {
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        font-weight: bold;
        font-size: 100px;
        position: absolute;
        display:flex;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color:  ${textColor};
    }
    `;
   
    // Write the generated CSS content to a file
    fs.writeFile('Assets/style.css', cssContent, (err) => {
        if (err) {
          console.error('Error writing style.css:', err);
        } else {
          console.log('style.css file generated successfully!');
        }
      });
    }

  inquirer.prompt(questions).then((answers) => {
    generateLogo(answers);
  });

