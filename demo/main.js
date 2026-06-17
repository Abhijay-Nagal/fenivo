import { FenivoCore } from '../core/FenivoCore.js';

// 1. Instantiate the Core IP
const fenivo = new FenivoCore();

// 2. Grab DOM elements
const stateDisplay = document.getElementById('state-display');
const btnCurious = document.getElementById('btn-curious');
const btnExcited = document.getElementById('btn-excited');
const btnThinking = document.getElementById('btn-thinking');
const btnConfident = document.getElementById('btn-confident');

// 3. Subscribe to core state changes
fenivo.subscribe((newState) => {
  stateDisplay.textContent = `Current State: ${newState}`;
});

// 4. Attach event listeners to buttons to trigger core updates
btnCurious.addEventListener('click', () => fenivo.setState('Curious'));
btnExcited.addEventListener('click', () => fenivo.setState('Excited'));
btnThinking.addEventListener('click', () => fenivo.setState('Thinking'));
btnConfident.addEventListener('click', () => fenivo.setState('Confident'));