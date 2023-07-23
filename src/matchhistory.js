const TextToSVG = require('text-to-svg');
const textToSVG = TextToSVG.loadSync();
const svgoptions = { x: 0, y: 0, fontSize: 72, anchor: "top", attributes: { fill: "red", stroke: "black" } };
const svg = textToSVG.getSVG("哈哈", svgoptions);
console.log(svg)