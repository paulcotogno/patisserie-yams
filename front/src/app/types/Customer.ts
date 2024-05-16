export interface CustomerType {
  email: string;
  firstName: string;
  lastName: string;
  launches: Array<{
    dices: number[],
    pastries: number,
    gain: Array<string>
  }>;
}