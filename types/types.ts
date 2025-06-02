export type UserType = {
  name: string,
  enterprise: string,
  role: 'admin' | 'non-admin',
};

export interface TokenType extends UserType {
  id: string,
};
