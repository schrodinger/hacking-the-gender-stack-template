import { chunk, kebabCase, pick } from 'lodash';
import { useLayoutEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import type { Palette } from '@mui/material/styles';

type ChannelTuple = [string, string, string];

/**
 * Transforms RGB and HEX color values into a space separated string of RGB channel values
 * ```
 * 'rgb(12, 34, 56)' => '12 34 56'
 * '#abcdef' => '171 205 239'
 * ```
 *
 *
 * @param colorValue - CSS color value in rgb, rgba, or hex formats
 */
function getColorChannels(colorValue: string) {
  const rgbMatch = colorValue.match(/^rgba?\((?<channels>.+)\)$/);
  const hexMatch = colorValue.match(/^#(?<hexValue>.+)$/);

  if (rgbMatch) {
    const [r, g, b] = rgbMatch.groups!.channels!.split(',') as ChannelTuple;
    return `${r} ${g} ${b}`;
  }

  if (hexMatch) {
    const hexValue = hexMatch.groups!.hexValue!.trim();
    const digitLength = hexValue.length === 3 ? 1 : 2;
    const [r, g, b] = chunk(hexValue, digitLength).map((digits) => {
      // In CSS if there's only 1 hex digit it is doubled i.e. #fff => #ffffff
      const hexChannel = digits.length === 1 ? `${digits[0]!}${digits[0]!}` : digits.join('');
      return `${parseInt(hexChannel, 16)}`;
    }) as ChannelTuple;
    return `${r} ${g} ${b}`;
  }

  throw new Error(`Color value "${colorValue}" is neither an rgb value nor a hex value`);
}

/**
 * Returns a dictionary of CSS variables with values from a MUI theme palette
 *
 * @param palette - A MUI theme palette
 */
function getPaletteVars(palette: Palette) {
  const colorDicts = pick(palette, [
    'primary',
    'secondary',
    'error',
    'warning',
    'info',
    'success',
    'common',
    'grey',
    'text',
    'background',
  ]);

  return Object.entries(colorDicts).reduce((varsDict, [colorKey, color]) => {
    Object.entries(color).forEach(([variant, colorValue]: [string, string]) => {
      const channels = getColorChannels(colorValue);
      const varName = `--palette-${kebabCase(colorKey)}-${kebabCase(variant)}`;
      const channelsVarName = `${varName}-channels`;

      varsDict[channelsVarName] = channels;
      varsDict[varName] = `rgb(var(${channelsVarName}))`;
    });

    return varsDict;
  }, {} as Record<string, string>);
}

/**
 * Injects the provided CSS variables into the DOM defining the CSS variables under the specified scope
 *
 * @param varsDict - A dictionary object of CSS variables
 * @param opts.scope - Scope under which the CSS variables should be defined
 * @returns - The style element injected into the DOM
 */
function injectVarsInDOM(varsDict: Record<string, string>, opts: { scope: string }) {
  const { scope } = opts;
  const styleEl = document.createElement('style');
  styleEl.setAttribute('data-mui-theme-vars', '');

  document.head.appendChild(styleEl);
  styleEl.sheet!.insertRule(`
    ${scope} {
      ${Object.entries(varsDict)
        .map(([key, value]) => `${key}: ${value};`)
        .join('\n')}
    }`);

  return styleEl;
}

interface ThemeVarsInjectorProps {
  /**
   * The scope under which CSS variables will be defined. This should be a CSS selector.
   */
  scope?: string;
}

/**
 * React component that injects CSS variables with the MUI theme values under the specified scope.
 * If no scope is specified, injects variables under `:root`
 */
function ThemeVarsInjector(props: ThemeVarsInjectorProps) {
  const { scope = ':root' } = props;
  const theme = useTheme();

  useLayoutEffect(() => {
    const paletteVars = getPaletteVars(theme.palette);
    const varsStyleEl = injectVarsInDOM(paletteVars, { scope });

    return () => varsStyleEl.remove();
  }, [scope, theme]);

  return null;
}

export type { ThemeVarsInjectorProps };
export default ThemeVarsInjector;
