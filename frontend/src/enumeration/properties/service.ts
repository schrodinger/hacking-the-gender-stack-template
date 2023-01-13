import ApiError from '../../shared/xhr/ApiError';
import fetch from '../../shared/xhr/fetch';

interface PropertiesResponse {
  products: {
    [smiles: string]: Record<string, number>;
  };
}

type ProductProperties = { id: string; compound: string } & Record<string, number>;

const propertiesApiUrl = {
  create: '/api/properties/',
};

async function fetchProductProperties(productSmilesList: string[]) {
  const response = await fetch(propertiesApiUrl.create, {
    method: 'POST',
    body: JSON.stringify({ product_smiles: productSmilesList }),
  });

  if (!response.ok) {
    throw new ApiError(response.clone());
  }

  const { products } = (await response.json()) as PropertiesResponse;
  return Object.entries(products).map(
    ([productSmiles, properties], index) =>
      ({
        id: `${index + 1}`,
        compound: productSmiles,
        ...properties,
      } as ProductProperties)
  );
}

export type { ProductProperties };
export { fetchProductProperties };
