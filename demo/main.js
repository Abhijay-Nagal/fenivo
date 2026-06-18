import { FenivoCore } from '../core/FenivoCore.js';

// 1. Instantiate the Core IP
const fenivo = new FenivoCore();

// 2. Grab DOM elements for States
const stateDisplay = document.getElementById('state-display');
const btnCurious = document.getElementById('btn-curious');
const btnExcited = document.getElementById('btn-excited');
const btnThinking = document.getElementById('btn-thinking');
const btnConfident = document.getElementById('btn-confident');

// 3. Grab DOM elements for Expressions
const expressionDisplay = document.getElementById('expression-display');
const btnNeutral = document.getElementById('btn-neutral');
const btnSmile = document.getElementById('btn-smile');
const btnFrown = document.getElementById('btn-frown');
const btnWideEyed = document.getElementById('btn-wide-eyed');

// 4. Subscribe to core updates (Now handles combined payload)
fenivo.subscribe((payload) => {
  stateDisplay.textContent = `State: ${payload.state}`;
  expressionDisplay.textContent = `Expression: ${payload.expression}`;
});

// 5. Attach event listeners for States
btnCurious.addEventListener('click', () => fenivo.setState('Curious'));
btnExcited.addEventListener('click', () => fenivo.setState('Excited'));
btnThinking.addEventListener('click', () => fenivo.setState('Thinking'));
btnConfident.addEventListener('click', () => fenivo.setState('Confident'));

// 6. Attach event listeners for Expressions
btnNeutral.addEventListener('click', () => fenivo.setExpression('Neutral'));
btnSmile.addEventListener('click', () => fenivo.setExpression('Smile'));
btnFrown.addEventListener('click', () => fenivo.setExpression('Frown'));
btnWideEyed.addEventListener('click', () => fenivo.setExpression('Wide-Eyed'));