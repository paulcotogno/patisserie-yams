export interface CustomerType {
  email: string;
  firstName: string;
  lastName: string;
  launchs: Array<{
    dices: number[],
    pastries: number,
    gain: Array<string>
  }>;
}