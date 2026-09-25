import { bem } from '../../bem.ts'

// Path data from Tabler Icons (MIT, https://tabler.io/icons), outline set on a 24px grid.
export const icons = {
  'arrow-right': ['M5 12l14 0', 'M13 18l6 -6', 'M13 6l6 6'],
  'arrow-left': ['M5 12l14 0', 'M5 12l6 6', 'M5 12l6 -6'],
  'arrow-up': ['M12 5l0 14', 'M18 11l-6 -6', 'M6 11l6 -6'],
  'arrow-down': ['M12 5l0 14', 'M18 13l-6 6', 'M6 13l6 6'],
  'arrow-up-right': ['M17 7l-10 10', 'M8 7l9 0l0 9'],
  external: ['M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6', 'M11 13l9 -9', 'M15 4h5v5'],
  'chevron-down': ['M6 9l6 6l6 -6'],
  'chevron-up': ['M6 15l6 -6l6 6'],
  'chevron-left': ['M15 6l-6 6l6 6'],
  'chevron-right': ['M9 6l6 6l-6 6'],
  check: ['M5 12l5 5l10 -10'],
  close: ['M18 6l-12 12', 'M6 6l12 12'],
  menu: ['M4 6l16 0', 'M4 12l16 0', 'M4 18l16 0'],
  search: ['M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0', 'M21 21l-6 -6'],
  info: ['M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0', 'M12 9h.01', 'M11 12h1v4h1'],
  success: ['M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0', 'M9 12l2 2l4 -4'],
  warning: [
    'M12 9v4',
    'M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z',
    'M12 16h.01',
  ],
  danger: [
    'M12.802 2.165l5.575 2.389c.48 .206 .863 .589 1.07 1.07l2.388 5.574c.22 .512 .22 1.092 0 1.604l-2.389 5.575c-.206 .48 -.589 .863 -1.07 1.07l-5.574 2.388c-.512 .22 -1.092 .22 -1.604 0l-5.575 -2.389a2.036 2.036 0 0 1 -1.07 -1.07l-2.388 -5.574a2.036 2.036 0 0 1 0 -1.604l2.389 -5.575c.206 -.48 .589 -.863 1.07 -1.07l5.574 -2.388a2.036 2.036 0 0 1 1.604 0z',
    'M12 8v4',
    'M12 16h.01',
  ],
  copy: [
    'M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z',
    'M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1',
  ],
  plus: ['M12 5l0 14', 'M5 12l14 0'],
  minus: ['M5 12l14 0'],
  sort: ['M3 9l4 -4l4 4m-4 -4v14', 'M21 15l-4 4l-4 -4m4 4v-14'],
  'sort-asc': ['M4 6l7 0', 'M4 12l7 0', 'M4 18l9 0', 'M15 9l3 -3l3 3', 'M18 6l0 12'],
  'sort-desc': ['M4 6l9 0', 'M4 12l7 0', 'M4 18l7 0', 'M15 15l3 3l3 -3', 'M18 6l0 12'],
  filter: ['M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z'],
  user: ['M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0', 'M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2'],
  mail: ['M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z', 'M3 7l9 6l9 -6'],
  github: [
    'M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5',
  ],
  calendar: [
    'M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z',
    'M16 3v4',
    'M8 3v4',
    'M4 11h16',
    'M11 15h1',
    'M12 15v3',
  ],
  clock: ['M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0', 'M12 7v5l3 3'],
  link: [
    'M9 15l6 -6',
    'M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464',
    'M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463',
  ],
  download: ['M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2', 'M7 11l5 5l5 -5', 'M12 4l0 12'],
  rss: ['M4 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0', 'M4 4a16 16 0 0 1 16 16', 'M4 11a9 9 0 0 1 9 9'],
  'map-pin': [
    'M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0',
    'M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z',
  ],
} as const satisfies Record<string, readonly string[]>

export type IconName = keyof typeof icons

export const iconNames = Object.keys(icons) as IconName[]

export type IconOptions = {
  name: IconName
  /** CSS length or px number. Without it the icon is 1em and follows the text size. */
  size?: string | number
  /** Accessible name. Without it the icon is decorative and hidden from assistive tech. */
  label?: string
  className?: string
}

const icon = bem('x-icon')

export const iconClass = ({ className }: Pick<IconOptions, 'className'> = {}): string => icon({}, className)

export const iconState = ({ size, label }: Pick<IconOptions, 'size' | 'label'>) => ({
  ...(size !== undefined && { width: size, height: size }),
  ...(label ? { role: 'img' as const, 'aria-label': label } : { 'aria-hidden': 'true' as const }),
})
