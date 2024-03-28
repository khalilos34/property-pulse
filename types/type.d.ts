export interface createUserParams {
  clerkId: string;
  username: string;
  email: string;
  image?: string;
}
export interface updateUserParams {
  username: string;

  image?: string;
}
