export class GhostVoice {
  respondToDriverHealth(heartRate: number): void {
    if (heartRate > 140) {
      this.speak("Calm down, focus on breathing, trust your training.");
    } else if (heartRate > 120) {
      this.speak("You’re in the heat of the moment. Eyes up, stay cool!");
    } else {
      this.speak("Nice and steady, keep your rhythm.");
    }
  }

  speak(message: string): void {
    console.log(`[GHOST]: ${message}`);
  }

  giveCommand(command: string): void {
    const messages: Record<string, string> = {
      MAINTAIN: "Hold your current pace.",
      DRIFT_ATTACK: "Initiate drift — stay committed.",
      HARD_BRAKE: "Brake now! Tight entry ahead.",
      COOL_DOWN: "Ease off — tire temps are high."
    };

    this.speak(messages[command] || `Unknown command: ${command}`);
  }
}