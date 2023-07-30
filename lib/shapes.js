
class Shape {
  constructor(shapeColor) {
    this.shapeColor = shapeColor;
  }
}

class Circle extends Shape {
  constructor(shapeColor, text, textColor, font, xyPosition, fontSize) {
    super(shapeColor);
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.xyPosition = xyPosition;
    this.fontSize = fontSize;
  }

  render() {
    return `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="150" cy="100" r="50" fill="${this.shapeColor}" />
      <text ${this.xyPosition} font-family="${this.font}" font-size="${this.fontSize}" fill="${this.textColor}" text-anchor="middle" alignment-baseline="middle">${this.text}</text>
    </svg>`;
  }
}

class Square extends Shape {
  constructor(shapeColor, text, textColor, font, xyPosition, fontSize) {
    super(shapeColor);
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.xyPosition = xyPosition;
    this.fontSize = fontSize;
  }

  render() {
    return `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect x="100" y="50" width="100" height="100" fill="${this.shapeColor}" />
      <text ${this.xyPosition} font-family="${this.font}" font-size="${this.fontSize}" fill="${this.textColor}" text-anchor="middle" alignment-baseline="middle">${this.text}</text>
    </svg>`;
  }
}

class Triangle extends Shape {
  constructor(shapeColor, text, textColor, font, xyPosition, fontSize) {
    super(shapeColor);
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.xyPosition = xyPosition;
    this.fontSize = fontSize;
  }

  render() {
    return `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <polygon points="150 50, 100 150, 200 150" fill="${this.shapeColor}" />
      <text ${this.xyPosition} font-family="${this.font}" font-size="${this.fontSize}" fill="${this.textColor}" text-anchor="middle" alignment-baseline="middle">${this.text}</text>
    </svg>`;
  }
}

module.exports = { Circle, Square, Triangle };