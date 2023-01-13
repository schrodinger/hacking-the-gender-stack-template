import type { ImgHTMLAttributes } from 'react';

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
  const smilesImageUrl = new URL('/api/image/', window.location.origin);
  smilesImageUrl.search = new URLSearchParams({ smiles }).toString();

  return <img {...imgProps} src={smilesImageUrl.toString()} alt={smiles} />;
}

export type { SmilesImageProps };
export default SmilesImage;
