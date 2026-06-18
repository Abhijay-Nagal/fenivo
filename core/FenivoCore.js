/**
 * FenivoCore
 * The framework-agnostic core IP logic.
 * Handles primary emotional states, secondary expressions, and underlying personality constraints.
 */
export class FenivoCore {
  constructor() {
    // Primary States (Phase 1)
    this.validStates = ['Curious', 'Excited', 'Thinking', 'Confident'];
    this.currentState = 'Curious'; 
    
    // Secondary Expressions (Phase 2)
    this.validExpressions = ['Neutral', 'Smile', 'Frown', 'Wide-Eyed'];
    this.currentExpression = 'Neutral';

    // Personality Profiles (Phase 3)
    this.validPersonalities = ['Balanced', 'Grumpy', 'Bubbly'];
    this.currentPersonality = 'Balanced';

    // Array to hold listener callbacks
    this.listeners = [];
  }

  // --- Getters ---
  getState() { return this.currentState; }
  getExpression() { return this.currentExpression; }
  getPersonality() { return this.currentPersonality; }

  // --- Setters ---

  /**
   * Updates the core personality and immediately evaluates if current expressions
   * need to be overridden based on the new personality's rules.
   * @param {string} newPersonality 
   */
  setPersonality(newPersonality) {
    if (this.validPersonalities.includes(newPersonality)) {
      this.currentPersonality = newPersonality;
      this.evaluateConstraints(); 
      this.notifyListeners();
    } else {
      console.warn(`[FenivoCore] Warning: '${newPersonality}' is not a valid personality.`);
    }
  }

  /**
   * Updates the primary state if valid.
   * @param {string} newState 
   */
  setState(newState) {
    if (this.validStates.includes(newState)) {
      this.currentState = newState;
      this.notifyListeners();
    } else {
      console.warn(`[FenivoCore] Warning: '${newState}' is not a valid state.`);
    }
  }

  /**
   * Updates the secondary expression if it passes personality conditional logic.
   * @param {string} newExpression 
   */
  setExpression(newExpression) {
    if (!this.validExpressions.includes(newExpression)) {
      console.warn(`[FenivoCore] Warning: '${newExpression}' is not a valid expression.`);
      return;
    }

    // Conditional Logic: Reject changes that conflict with personality
    if (this.currentPersonality === 'Grumpy' && newExpression === 'Smile') {
      console.warn(`[FenivoCore] Blocked: A 'Grumpy' personality restricts the 'Smile' expression.`);
      return;
    }
    
    if (this.currentPersonality === 'Bubbly' && newExpression === 'Frown') {
      console.warn(`[FenivoCore] Blocked: A 'Bubbly' personality restricts the 'Frown' expression.`);
      return;
    }

    this.currentExpression = newExpression;
    this.notifyListeners();
  }

  // --- Internal Logic ---

  /**
   * Ensures the current state/expression remains valid if the personality changes abruptly.
   */
  evaluateConstraints() {
    if (this.currentPersonality === 'Grumpy' && this.currentExpression === 'Smile') {
      this.currentExpression = 'Neutral'; // Wipe the smile
    }
    if (this.currentPersonality === 'Bubbly' && this.currentExpression === 'Frown') {
      this.currentExpression = 'Neutral'; // Wipe the frown
    }
  }

  // --- Subscriber Pattern ---

  subscribe(callback) {
    this.listeners.push(callback);
    // Immediately invoke so the UI synchronizes upon subscription
    callback({
      state: this.currentState,
      expression: this.currentExpression,
      personality: this.currentPersonality
    });
  }

  notifyListeners() {
    const payload = {
      state: this.currentState,
      expression: this.currentExpression,
      personality: this.currentPersonality
    };
    this.listeners.forEach(callback => callback(payload));
  }
}