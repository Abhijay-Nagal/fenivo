import { FenivoCore } from '../core/FenivoCore.js';

// 1. Instantiate the Core IP
const fenivo = new FenivoCore();

// 2. Grab DOM elements for Personality
const personalityDisplay = document.getElementById('personality-display');
const btnBalanced = document.getElementById('btn-balanced');
const btnGrumpy = document.getElementById('btn-grumpy');
const btnBubbly = document.getElementById('btn-bubbly');

// 3. Grab DOM elements for States
const stateDisplay = document.getElementById('state-display');
const btnCurious = document.getElementById('btn-curious');
const btnExcited = document.getElementById('btn-excited');
const btnThinking = document.getElementById('btn-thinking');
const btnConfident = document.getElementById('btn-confident');

// 4. Grab DOM elements for Expressions
const expressionDisplay = document.getElementById('expression-display');
const btnNeutral = document.getElementById('btn-neutral');
const btnSmile = document.getElementById('btn-smile');
const btnFrown = document.getElementById('btn-frown');
const btnWideEyed = document.getElementById('btn-wide-eyed');

// 5. Subscribe to core updates (Handles combined 3-part payload)
fenivo.subscribe((payload) => {
  personalityDisplay.textContent = `Personality: ${payload.personality}`;
  stateDisplay.textContent = `State: ${payload.state}`;
  expressionDisplay.textContent = `Expression: ${payload.expression}`;
});

// 6. Attach event listeners for Personalities
btnBalanced.addEventListener('click', () => fenivo.setPersonality('Balanced'));
btnGrumpy.addEventListener('click', () => fenivo.setPersonality('Grumpy'));
btnBubbly.addEventListener('click', () => fenivo.setPersonality('Bubbly'));

// 7. Attach event listeners for States
btnCurious.addEventListener('click', () => fenivo.setState('Curious'));
btnExcited.addEventListener('click', () => fenivo.setState('Excited'));
btnThinking.addEventListener('click', () => fenivo.setState('Thinking'));
btnConfident.addEventListener('click', () => fenivo.setState('Confident'));

// 8. Attach event listeners for Expressions
btnNeutral.addEventListener('click', () => fenivo.setExpression('Neutral'));
btnSmile.addEventListener('click', () => fenivo.setExpression('Smile'));
btnFrown.addEventListener('click', () => fenivo.setExpression('Frown'));
btnWideEyed.addEventListener('click', () => fenivo.setExpression('Wide-Eyed'));