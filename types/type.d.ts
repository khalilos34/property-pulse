export interface createUserParams {
  first_name: string;
  last_name: string;
  clerkId: string;
  username: string;
  email: string;
  photo: string;
}
export interface updateUserParams {
  first_name: string;
  last_name: string;
  username: string;
  photo?: string;
}
