import { FenivoCore } from '../core/FenivoCore.js';

// --- SVG INJECTION PIPELINE ---
const modelContainer = document.getElementById('model-container');

async function loadRuntimeSVG() {
  try {
    // Fetch the runtime asset from the public folder
    const response = await fetch('/Aurora_Runtime.svg');
    const svgText = await response.text();
    
    // Inject it into the container, replacing the loading text
    modelContainer.innerHTML = svgText;
    
    // Ensure the injected SVG scales to fit our container cleanly
    const svgElement = modelContainer.querySelector('svg');
    if (svgElement) {
      svgElement.style.width = '100%';
      svgElement.style.height = '100%';
    }
    
    console.log('[Fenivo] Aurora_Runtime.svg successfully injected.');
    // We will call the initialization of our layer swapping here in Step 3
    
  } catch (error) {
    console.error('[Fenivo] Failed to load runtime SVG:', error);
    modelContainer.innerHTML = `<p style="color:red;">Error loading model.</p>`;
  }
}

// Initialize the visual asset
loadRuntimeSVG();

// ... (Keep your existing FenivoCore instantiation and DOM listeners below this)

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