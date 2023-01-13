import ApiError from '../../shared/xhr/ApiError';
import fetch from '../../shared/xhr/fetch';

interface RGroup {
  id: number;
  smiles: string;
}

interface EnumerateResponse {
  products: string[];
}

const rgroupApiUrls = {
  getAll: '/api/rgroup/',
  create: '/api/rgroup/',
};

const enumerationApiUrls = {
  create: '/api/enumerate/',
};

async function fetchAllRGroups() {
  const response = await fetch(rgroupApiUrls.getAll, { method: 'GET' });

  if (!response.ok) {
    throw new ApiError(response.clone());
  }

  return response.json() as Promise<RGroup[]>;
}

async function registerNewRGroup(smiles: string) {
  const response = await fetch(rgroupApiUrls.create, {
    method: 'POST',
    body: JSON.stringify({ smiles }),
  });

  if (!response.ok) {
    throw new ApiError(response.clone());
  }

  return response.json() as Promise<RGroup>;
}

async function enumerateProperties(enumerationOpts: {
  core_smiles: string;
  rgroup_smiles: Record<string, string[]>;
}) {
  const response = await fetch(enumerationApiUrls.create, {
    method: 'POST',
    body: JSON.stringify(enumerationOpts),
  });

  if (!response.ok) {
    throw new ApiError(response.clone());
  }

  return response.json() as Promise<EnumerateResponse>;
}

export type { RGroup, EnumerateResponse };
export { fetchAllRGroups, registerNewRGroup, enumerateProperties };
