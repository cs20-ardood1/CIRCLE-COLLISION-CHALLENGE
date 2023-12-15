// Random Library

// return a decimal b/t low(inclusive) and high (exclusive)
function randomDec(low, high) {
  return Math.random() * (high - low) + low;
}

// return a random integer b/t low(inclusive) and high (exclusive)

function randomInt(low, high) {
  return Math.floor(randomDec(low, high));
}

// return random rgb color - 'rgb(__, __, __)'
function randomRGB() {
  return `rgb(${randomInt(0, 256)},${randomInt(0, 256)},${randomInt(0, 256)})`;
}
