import { Starship } from './starship';

export interface Starships {
  count: number;
  next: string;
  previous: string | null;
  results: Starship[];
}
