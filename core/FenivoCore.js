/**
 * FenivoCore
 * The framework-agnostic core IP logic.
 * Handles primary emotional states and secondary expressions.
 */
export class FenivoCore {
  constructor() {
    // Primary States (Phase 1)
    this.validStates = ['Curious', 'Excited', 'Thinking', 'Confident'];
    this.currentState = 'Curious'; 
    
    // Secondary Expressions (Phase 2)
    this.validExpressions = ['Neutral', 'Smile', 'Frown', 'Wide-Eyed'];
    this.currentExpression = 'Neutral';

    // Array to hold listener callbacks
    this.listeners = [];
  }

  /**
   * Returns the primary state.
   */
  getState() {
    return this.currentState;
  }

  /**
   * Returns the secondary expression.
   */
  getExpression() {
    return this.currentExpression;
  }

  /**
   * Updates the primary state if valid, and notifies all listeners.
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
   * Updates the secondary expression if valid, and notifies all listeners.
   * @param {string} newExpression 
   */
  setExpression(newExpression) {
    if (this.validExpressions.includes(newExpression)) {
      this.currentExpression = newExpression;
      this.notifyListeners();
    } else {
      console.warn(`[FenivoCore] Warning: '${newExpression}' is not a valid expression.`);
    }
  }

  /**
   * Allows external modules (like the UI) to subscribe to state changes.
   * @param {function} callback 
   */
  subscribe(callback) {
    this.listeners.push(callback);
    // Immediately invoke the callback so the UI synchronizes upon subscription
    callback({
      state: this.currentState,
      expression: this.currentExpression
    });
  }

  /**
   * Triggers all subscribed callbacks with the complete current profile.
   */
  notifyListeners() {
    const payload = {
      state: this.currentState,
      expression: this.currentExpression
    };
    this.listeners.forEach(callback => callback(payload));
  }
}