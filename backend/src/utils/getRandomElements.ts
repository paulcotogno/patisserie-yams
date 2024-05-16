function getRandomElements<T>(arr: T[], numElements: number): T[] {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numElements);
}

export default getRandomElements;