"use strict";
// src/ai/learning.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Learning = void 0;
/**
 * Learning module for Ghost AI.
 * Determines the next action based on advisor feedback.
 */
class Learning {
    /**
     * Parses advice string and decides on a corresponding action.
     * @param advice - Feedback from GhostAdvisor.
     * @returns A command string for GhostVoice to speak.
     */
    determineAction(advice) {
        const lowerAdvice = advice.toLowerCase();
        if (lowerAdvice.includes("drift")) {
            return "DRIFT_ATTACK";
        }
        if (lowerAdvice.includes("brake")) {
            return "HARD_BRAKE";
        }
        if (lowerAdvice.includes("cool") || lowerAdvice.includes("tire")) {
            return "COOL_DOWN";
        }
        // Default action
        return "MAINTAIN";
    }
}
exports.Learning = Learning;
/**
 * Example usage:
 * const learning = new Learning();
 * const action = learning.determineAction("You should drift through the next corner.");
 * console.log(action); // Outputs: "DRIFT_ATTACK"
 */
// This code defines a Learning class that processes feedback from the GhostAdvisor and determines the appropriate action for the GhostVoice to execute. It uses simple string matching to identify keywords related to driving actions like drifting, braking, or cooling down tires. The determined action is returned as a command string.
// The example usage shows how to create an instance of the Learning class and use it to determine an action based on a piece of advice.
// This modular approach allows for easy expansion and modification of the learning logic in the future.
