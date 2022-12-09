export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: string;
  location: string;
  image: string;
}

export interface DBResponse {
  characters: [Character];
}