/**
 * FenivoCore
 * The framework-agnostic core IP logic.
 * Handles internal state management and event emission.
 */
export class FenivoCore {
  constructor() {
    // Defined base states for Phase 1
    this.validStates = ['Curious', 'Excited', 'Thinking', 'Confident'];
    
    // Initial default state
    this.currentState = 'Curious'; 
    
    // Array to hold listener callbacks
    this.listeners = [];
  }

  /**
   * Returns the current state.
   */
  getState() {
    return this.currentState;
  }

  /**
   * Updates the internal state if valid, and notifies all listeners.
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
   * Allows external modules (like the UI) to subscribe to state changes.
   * @param {function} callback 
   */
  subscribe(callback) {
    this.listeners.push(callback);
  }

  /**
   * Triggers all subscribed callbacks with the new state.
   */
  notifyListeners() {
    this.listeners.forEach(callback => callback(this.currentState));
  }
}