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

function generateLogo(answers) {
  const { shape, shapeColor, text, textColor, font, textPosition, fontSize } = answers;

  console.log('Logo Design Requirements:');
  console.log('Shape:', shape);
  console.log('Shape Color:', shapeColor);
  console.log('Text:', text);
  console.log('Text Color:', textColor);
  console.log('Font:', font);
  console.log('Text Position:', textPosition);
  console.log('Font Size:', fontSize);


  // Adjust font size for SVG file compatability
  var svgFontSize = '';
  if (fontSize === 'Small') {
      svgFontSize = '15px';
  } else if (fontSize === 'Medium') {
      svgFontSize = '30px';
  } else {
      svgFontSize = '45px';
  };

  // Calculate the x and y coordinates for the text based on the selected textPosition
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

  // Generate the SVG content dynamically based on the selected shape
  let shapeContent = '';
  switch (shape) {
    case 'circle':
      shapeContent = `<circle cx="150" cy="100" r="50" fill="${shapeColor}" />`;
      break;
    case 'square':
      shapeContent = `<rect x="100" y="50" width="100" height="100" fill="${shapeColor}" />`;
      break;
    case 'triangle':
      shapeContent = `<polygon points="150 50, 100 150, 200 150" fill="${shapeColor}" />`;
      break;
    default:
      console.error('Invalid shape selected.');
      return;
  }

  // Generate the SVG content dynamically
  if (text === '') {
    var svgContent = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${shapeContent}
    </svg>
  `;
  } else {
    var svgContent =`
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${shapeContent}
      <text ${xyPosition} font-family="${font}" font-size="${svgFontSize}" fill="${textColor}" text-anchor="middle" alignment-baseline="middle">${text}</text>
    </svg>
  `;
  }
  
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


//   // Create shape classes
//   class Shape {
//     constructor(shapeColor) {
//       this.shapeColor = shapeColor;
//     }
//   }

//   class Circle extends Shape {
//     constructor(shapeColor) {
//       super(shapeColor);
//     }
//     getShapeContent() {
//       return `<circle cx="150" cy="100" r="50" fill="${this.shapeColor}" />`;
//     }
//   }

//   class Square extends Shape {
//     constructor(shapeColor) {
//       super(shapeColor);
//     }
//     getShapeContent() {
//       return `<rect x="100" y="50" width="100" height="100" fill="${this.shapeColor}" />`;
//     }
//   }

//   class Triangle extends Shape {
//     constructor(shapeColor) {
//       super(shapeColor);
//     }
//     getShapeContent() {
//       return `<polygon points="150 50, 100 150, 200 150" fill="${this.shapeColor}" />`;
//     }
//   }

//   // Generate the SVG content dynamically based on the selected shape
//   let selectedShape;
// switch (shape) {
//   case 'circle':
//     selectedShape = new Circle(shapeColor);
//     break;
//   case 'square':
//     selectedShape = new Square(shapeColor);
//     break;
//   case 'triangle':
//     selectedShape = new Triangle(shapeColor);
//     break;
// }

// const shapeContent = selectedShape.getShapeContent();
// console.log(shapeContent);