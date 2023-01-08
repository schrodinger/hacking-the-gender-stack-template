import ApiError from '../../shared/xhr/ApiError';
import fetch from '../../shared/xhr/fetch';
import { getApiUrl } from '../../shared/xhr/utils';

interface Core {
  id: number;
  smiles: string;
  rgroup_labels: string[];
}

const coreApiUrls = {
  getAll: getApiUrl('api/core/'),
  registerCore: getApiUrl('api/core/'),
};

async function fetchAllCores(): Promise<Core[]> {
  const response = await fetch(coreApiUrls.getAll, { method: 'GET' });

  if (!response.ok) {
    throw new ApiError(response.clone());
  }

  return response.json() as Promise<Core[]>;
}

async function registerNewCore(smiles: string): Promise<Core> {
  const response = await fetch(coreApiUrls.registerCore, {
    method: 'POST',
    body: JSON.stringify({ smiles }),
  });

  if (!response.ok) {
    throw new ApiError(response.clone());
  }

  return response.json() as Promise<Core>;
}

export type { Core };
export { fetchAllCores, registerNewCore };
