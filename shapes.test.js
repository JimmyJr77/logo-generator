// Constructor Shapes is imported.
const { Circle, Square, Triangle } = require('./shapes');

// A testing suite for Circle is created.
describe('Circle', () => {
  // A test is created to ensure the shape created is a yellow circle
  describe('render', () => {
    it('should render a yellow circle (a circle with the correct SVG content)', () => {
      const setColor = "yellow"; // Provide the shapeColor argument
      const shape = new Circle(setColor);
      expect(shape.render()).toEqual(
    `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="150" cy="100" r="50" fill="yellow" />
      <text undefined font-family="undefined" font-size="undefined" fill="undefined" text-anchor="middle" alignment-baseline="middle">undefined</text>
    </svg>`);
    });
  });
});

// A testing suite for Square is created.
describe('Square', () => {
  // A test is created to ensure the shape created is a yellow square
  describe('render', () => {
    it('should render a red square (a square with the correct SVG content)', () => {
      const setColor = "red"; // Provide the shapeColor argument
      const shape = new Square(setColor);
      expect(shape.render()).toEqual(
    `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect x="100" y="50" width="100" height="100" fill="red" />
      <text undefined font-family="undefined" font-size="undefined" fill="undefined" text-anchor="middle" alignment-baseline="middle">undefined</text>
    </svg>`);
    });
  });
});

// A testing suite for Square is created.
describe('Triangle', () => {
  // A test is created to ensure the shape created is a green triangle
  describe('render', () => {
    it('should render a green triangle (a triangle with the correct SVG content)', () => {
      const setColor = "green"; // Provide the shapeColor argument
      const shape = new Triangle(setColor);
      expect(shape.render()).toEqual(
    `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <polygon points="150 50, 100 150, 200 150" fill="green" />
      <text undefined font-family="undefined" font-size="undefined" fill="undefined" text-anchor="middle" alignment-baseline="middle">undefined</text>
    </svg>`);
    });
  });
});