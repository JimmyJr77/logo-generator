// Constructor Shapes is imported.
const { Circle } = require('./shapes');

// A testing suite for Circle is created.
describe('Circle', () => {
  // A test is created to ensure the shape created is a yellow circle
  describe('render', () => {
    it('should render a yellow circle (a circle with the correct SVG content)', () => {
      const shape = new Circle();
      shape.setColor("yellow");
      expect(shape.render()).toEqual(
        `
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="150" cy="100" r="50" fill="yellow"/>
        </svg>`);
    });
  });
});