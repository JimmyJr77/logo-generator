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
  {
    type: 'list',
    message: 'What font family would you like to use for your logo?',
    name: 'font',
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
    message: 'Where would you like your font?',
    name: 'fontPosition',
    choices: [
        "top left",
        "top middle",
        "top right",
        "center left",
        "center",
        "center right",
        "bottom left",
        "bottom middle",
        "bottom right",
    ]
  }
];

function generateLogo(answers) {
    const {shape, shapeColor, text, textColor, font, fontPosition} = answers;
  
    console.log('Logo Design Requirements:');
    console.log('Shape:', shape);
    console.log('Shape Color:', shapeColor);
    console.log('Text:', text);
    console.log('Text Color:', textColor);
    console.log('Font:', font)
  
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


     // Generate the CSS for the font position
  let cssFontPosition = '';
  if (fontPosition == 'top left') {
    cssFontPosition = `
      top: 25%;
      left: 25%;
    `;
  } else if (fontPosition == 'top middle') {
    cssFontPosition = `
      top: 25%;
      left: 50%;
    `;
  } else if (fontPosition == 'top right') {
    cssFontPosition = `
      top: 25%;
      left: 75%;
    `;
  } else if (fontPosition == 'center left') {
    cssFontPosition = `
      top: 50%;
      left: 25%;
    `;
  } else if (fontPosition == 'center middle') {
    cssFontPosition = `
      top: 50%;
      left: 75%;
    `;
  } else if (fontPosition == 'center right') {
    cssFontPosition = `
      top: 75%;
      left: 25%;
    `;
  } else if (fontPosition == 'bottom left') {
    cssFontPosition = `
      top: 75%;
      left: 50%;
    `;
  } else if (fontPosition == 'bottom middle') {
    cssFontPosition = `
      top: 75%;
      left: 75%;
    `;
  } else if (fontPosition == 'bottom right') {
    cssFontPosition = `
      top: 25%;
      left: 50%;
    `;
  }
  
    const cssContent = `
    /* Triangle */
    #triangle {
        position: absolute;
        display: flex;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 250px;
        height: 250px;
        background-color:${shapeColor};
        clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
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
        font-family: ${font};
        font-weight: bold;
        font-size: 100px;
        position: absolute;
        display:flex;
        ${cssFontPosition}
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

