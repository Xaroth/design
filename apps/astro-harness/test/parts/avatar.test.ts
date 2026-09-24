import { createElement } from 'react'
import { describe, it } from 'vitest'
import { Avatar } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'
import { Avatar as AstroAvatar } from '@xaroth.nl/design/astro'

const cases: { name: string; props: Record<string, unknown> }[] = [
  { name: 'initials from one word', props: { name: 'Xaroth' } },
  { name: 'initials from full name', props: { name: 'Xaroth Brook' } },
  { name: 'custom initials', props: { name: 'Xaroth Brook', initials: 'X' } },
  { name: 'custom label', props: { name: 'Xaroth', alt: 'Profile of Xaroth' } },
  { name: 'decorative initials', props: { name: 'Xaroth', alt: '' } },
  { name: 'image', props: { name: 'Xaroth', src: '/avatar.jpg' } },
  { name: 'image with alt', props: { name: 'Xaroth', src: '/avatar.jpg', alt: 'Xaroth in a flight suit' } },
  { name: 'decorative image', props: { name: 'Xaroth', src: '/avatar.jpg', alt: '' } },
  { name: 'small', props: { name: 'Xaroth', size: 'sm' } },
  { name: 'explicit md', props: { name: 'Xaroth', size: 'md' } },
  { name: 'large', props: { name: 'Xaroth', size: 'lg' } },
  { name: 'extra large', props: { name: 'Xaroth', size: 'xl' } },
  { name: 'extra class and attrs', props: { name: 'Xaroth', class: 'site-avatar', title: 'Xaroth' } },
]

describe('Avatar renders the same HTML in Astro and React', () => {
  for (const { name, props } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      await expectSameHtml(AstroAvatar, { props }, createElement(Avatar, { ...rest, className } as never))
    })
  }
})
