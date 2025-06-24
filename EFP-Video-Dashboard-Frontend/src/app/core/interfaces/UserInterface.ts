export interface UserInterface {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  picture: string | null;
  role: string;
  progress: number;
  dtm_last_login: Date;
}
