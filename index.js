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
    message: 'Where size would you like your font?',
    name: 'fontSize',
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

function generateLogo(answers) {
    const {shape, shapeColor, text, textColor, font, textPosition, fontSize} = answers;
  
    console.log('Logo Design Requirements:');
    console.log('Shape:', shape);
    console.log('Shape Color:', shapeColor);
    console.log('Text:', text);
    console.log('Text Color:', textColor);
    console.log('Font:', font)
    console.log('Font Size:', fontSize)
  
    // Generate the HTML content dynamically
    const htmlContent = `
        <!DOCTYPE html>
        <html>
            <head>
            <link rel="stylesheet" href="Assets/style.css">
            <title>Dynamic Logo</title>
            </head>
            <body>
                <div id="${shape}"></div>
                <div id="text">${text}</div>
                <!-- Add the svg-crowbar.js script -->
                <script src="node_modules/svg-crowbar/svg-crowbar.js"></script>
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
    let cssTextPosition = '';
    if (textPosition == 'top left') {
        cssTextPosition = 
        `
        top: 30%;
        left: 30%;
        `;
    } else if (textPosition == 'top middle') {
        cssTextPosition = 
        `
        top: 30%;
        left: 50%;
        `;
    } else if (textPosition == 'top right') {
        cssTextPosition = 
        `
        top: 30%;
        left: 70%;
        `;
    } else if (textPosition == 'center left') {
        cssTextPosition = 
        `
        top: 50%;
        left: 30%;
        `;
    } else if (textPosition == 'center middle') {
        cssTextPosition = 
        `
        top: 50%;
        left: 50%;
        `;
    } else if (textPosition == 'center right') {
        cssTextPosition = 
        `
        top: 50%;
        left: 70%;
        `;
    } else if (textPosition == 'bottom left') {
        cssTextPosition =
        `
        top: 70%;
        left: 30%;
        `;
    } else if (textPosition == 'bottom middle') {
        cssTextPosition = 
        `
        top: 70%;
        left: 50%;
        `;
    } else if (textPosition == 'bottom right') {
        cssTextPosition = 
        `
        top: 70%;
        left: 70%;
        `;
    }

    var cssFontSize = '';
    if (fontSize == 'Small') {
      cssFontSize = '50px';
    } else if (fontSize == 'Medium') {
      cssFontSize = '100px';
    } else {
      cssFontSize = '150px';
    };

    const cssContent = `
    /* Body */
    body {
        position:fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        height: 400px;
    }
    
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
        font-size: ${cssFontSize};
        position: absolute;
        display:flex;
        ${cssTextPosition}
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

//  // require puppeteer
// const puppeteer = require('puppeteer'); // Add this line for puppeteer

//   // Add this above the svg crowbar script
// <svg id="logo-svg" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
// <!-- Your SVG content goes here -->
// </svg>

// // Function to capture the SVG and save it as logo.svg
// async function captureSvg() {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('file://' + __dirname + '/logo.html');
//     await page.waitForTimeout(1000); // Wait for some time to ensure the SVG is fully rendered
  
//     // Extract the SVG content from the DOM
//     const svgContent = await page.evaluate(() => {
//       const svgElement = document.getElementById('logo-svg'); // Make sure to give your logo SVG element an ID 'logo-svg'
//       return svgElement ? svgElement.outerHTML : null;
//     });
  
//     // Save the SVG content to the logo.svg file
//     fs.writeFile('logo.svg', svgContent, (err) => {
//       if (err) {
//         console.error('Error writing logo.svg:', err);
//       } else {
//         console.log('Generated logo.svg');
//       }
//     });
  
//     await browser.close();
// }