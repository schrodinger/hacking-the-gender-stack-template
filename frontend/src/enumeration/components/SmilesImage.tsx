import type { ImgHTMLAttributes } from 'react';

import { getApiUrl } from '../../shared/xhr/utils';

const IMAGE_API_URL = '/api/image/';

interface SmilesImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Smiles string for a structure
   */
  smiles: string;
}

/**
 * Component that renders an image of a structure given its smiles
 */
function SmilesImage(props: SmilesImageProps) {
  const { smiles, ...imgProps } = props;
  const smilesImageUrl = getApiUrl(IMAGE_API_URL);
  smilesImageUrl.search = new URLSearchParams({ smiles }).toString();

  return <img {...imgProps} src={smilesImageUrl.toString()} alt={smiles} />;
}

export type { SmilesImageProps };
export default SmilesImage;
