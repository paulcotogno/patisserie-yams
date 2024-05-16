function launchDices(): number[] {
  const dices = [];
  for (let i = 0; i < 5; i++) {
      dices.push(Math.floor(Math.random() * 6) + 1);
  }
  return dices;
}

function isYams(dices: number[]): boolean {
  return new Set(dices).size === 1;
}

function isCarre(dices: number[]): boolean {
  const counts = new Map<number, number>();
  for (const de of dices) {
      counts.set(de, (counts.get(de) || 0) + 1);
  }
  return Array.from(counts.values()).includes(4);
}

function isDouble(dices: number[]): boolean {
  const counts = new Map<number, number>();
  for (const de of dices) {
      counts.set(de, (counts.get(de) || 0) + 1);
  }
  const occurrences = Array.from(counts.values());
  return occurrences.includes(2) && occurrences.filter(count => count === 2).length === 2;
}

function bestCombination(dices: number[]): number {
  if (isYams(dices)) {
      return 3;
  } else if (isCarre(dices)) {
      return 2;
  } else if (isDouble(dices)) {
      return 1;
  } else {
      return 0;
  }
}

export { launchDices, bestCombination };