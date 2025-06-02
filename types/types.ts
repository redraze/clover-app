export type FormType = 'login' | 'signup';

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
  [tower_id: number]: {
    region: string,
    state: string,
  },
}

export type ContractedTowerType = {
  [tower_id: number]: {
    allowedOS: {
      [OS: string]: boolean,
    },
    region: string,
    state: string,
  },
};

export type LogType = {
  time: string,
  action: string,
  source_ip: string,
  session_id: string,
};
