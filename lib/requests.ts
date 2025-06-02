import { ContractedTowerType, FreeTowerType, TokenType, UserType } from "@/types/types";
import { towers } from '@/dummyData/towers.json';
import { contracts } from '@/dummyData/contracts.json';
import { logs } from '@/dummyData/logs.json';
import { enterprises } from '@/dummyData/enterprises.json';


// returns info about user
export const callLoginAPI = async (user: UserType) => {
  // get enterpise id of logged in enterprise user
	const enterpise = enterprises.find(({ enterprise }) => (enterprise === user.enterprise))
	if (!enterpise) return { data: null };

  return { 
    data: {
      token: {
        id: "xxx-xxx", // session id
        name: user.name,
        enterprise: user.enterprise,
        enterprise_id: enterpise.id,
        role: user.role,
      }
    }
  }
};


export const callFreeTowersAPI = async (token: TokenType) => {
    // get currently contracted tower ids
    const contractedTowers = new Set();
    contracts.map(({ enterprise_id, tower_id }) => {
        if (token.enterprise_id === enterprise_id) {
            contractedTowers.add(tower_id)
        };
    });
    
    // filter for free towers
    const towerData: FreeTowerType = {};
    towers.forEach(({ id, region, state }) => {
        if (contractedTowers.has(id)) return;
        towerData[id] = { region, state };
    });

    return { data: towerData }
};


export const callContractTowersAPI = async (token: TokenType) => {
    const towerData: ContractedTowerType = {};

    // format current contracted tower data
    contracts.forEach(({ enterprise_id, tower_id, allowedOS }) => {
        if (token.enterprise_id === enterprise_id) {
            towerData[tower_id] = { 
                ...towerData[tower_id],
                allowedOS,
            };
        };
    });

    // append location data to formatted tower data
    towers.forEach(({ id, region, state }) => {
        if (id in towerData) {
            towerData[id] = {
                ...towerData[id],
                region,
                state,
            }
        }
    })

    return { data: towerData }
};


export const callLogsAPI = async () => {
    return { data: logs }
};
