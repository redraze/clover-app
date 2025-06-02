export type UserType = {
  name: string,
  enterprise: string,
  enterprise_id: number,
  role: 'admin' | 'non-admin',
};

export interface TokenType extends UserType {
  id: string,
};

export type TowerType = {
  id: number,
  region: string,
  state: string,
};

export type ContractType = {
  tower_id: number,
  allowedOS: string[],
};

export type FreeTowerType = {
  [id: number]: {
    region: string,
    state: string,
  },
}

export type ContractedTowerType = {
  [id: number]: {
    allowedOS: {
      [OS: string]: boolean,
    },
    region: string,
    state: string,
  },
};
