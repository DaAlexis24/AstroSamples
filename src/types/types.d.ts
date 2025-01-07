export type Char = {
  isAlive: boolean;
  message: string;
  name: string;
  family: string;
  age: number;
  reignYears: number;
  category: string;
  weapon?: string;
  skillLevel?: number;
  adviseTo?: Char;
  serveLevel?: number;
  servesTo?: Char;
};
