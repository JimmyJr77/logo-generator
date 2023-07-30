// Attach required files
const fs = require('fs');
const inquirer = require('inquirer');
const questions = require('./questions');
const { Circle, Square, Triangle } = require('./shapes');

// Function to generate the logo from answers
function generateLogo(answers) {
    const { shape, shapeColor, text, textColor, font, textPosition, fontSize } = answers;

    // Log user responses to the questions
    console.log('Logo Design Requirements:');
    console.log('Shape:', shape);
    console.log('Shape Color:', shapeColor);
    console.log('Text:', text);
    console.log('Text Color:', textColor);
    console.log('Font:', font);
    console.log('Text Position:', textPosition);
    console.log('Font Size:', fontSize);

    // Adjust font size answer to an SVG compatable response
    var svgFontSize = '';
    if (fontSize === 'Small') {
        svgFontSize = '15px';
    } else if (fontSize === 'Medium') {
        svgFontSize = '30px';
    } else {
        svgFontSize = '45px';
    };

    // Adjust text position answer to an SVG compatable response by calculating the x and y coordinates for the text based on the selected textPosition
    let xyPosition;
    let x, y;
    if (textPosition && textPosition.includes('top')) {
        y = fontSize === 'Small' ? 70 : fontSize === 'Medium' ? 80 : 55;
    } else if (textPosition && textPosition.includes('bottom')) {
        y = fontSize === 'Small' ? 140 : fontSize === 'Medium' ? 130 : 150;
    } else {
        y = fontSize === 'Small' ? 105 : fontSize === 'Medium' ? 105 : 105;
    }

    if (textPosition && textPosition.includes('left')) {
        x = 115;
    } else if (textPosition && textPosition.includes('right')) {
        x = 185;
    } else {
        x = 150;
    }
    xyPosition = `x="${x}" y="${y}"`
  
    // Call shape classes and implement answers to build the logo
    let shapeObj;
    switch (shape.toLowerCase()) {
        case 'circle':
        shapeObj = new Circle(shapeColor, text, textColor, font, xyPosition, svgFontSize);
        break;
        case 'square':
        shapeObj = new Square(shapeColor, text, textColor, font, xyPosition, svgFontSize);
        break;
        case 'triangle':
        shapeObj = new Triangle(shapeColor, text, textColor, font, xyPosition, svgFontSize);
        break;
        default:
        console.error('Invalid shape type:', shape);
        return;
    }

    // Generate the SVG content using the shape object
    const svgContent = shapeObj.render();

    // Write the generated SVG content to a file named logo.svg
    fs.writeFile('logo.svg', svgContent, (err) => {
        if (err) {
        console.error('Error writing logo.svg:', err);
        } else {
        console.log('Generated logo.svg');
        }
    });
}
  
inquirer.prompt(questions).then((answers) => {
generateLogo(answers);
});
