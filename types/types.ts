export type UserType = {
  name: string,
  role: 'admin' | 'non-admin',
};

export interface TokenType extends UserType {
  id: string,
};
