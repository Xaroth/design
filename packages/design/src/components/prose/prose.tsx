import './prose.scss'
import type { HTMLAttributes } from 'react'
import { codeBlockClass, codeHtml, proseClass } from './index.ts'

export type ProseProps = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'article' | 'section' | 'main'
}

export function Prose({ as: Tag = 'div', className, ...rest }: ProseProps) {
  return (
    <Tag
      {...rest}
      className={proseClass({ className })}
    />
  )
}

export type CodeBlockProps = Omit<HTMLAttributes<HTMLElement>, 'title' | 'children'> & {
  code: string
  lang?: string
  title?: string
}

export function CodeBlock({ code, lang, title, className, ...rest }: CodeBlockProps) {
  return (
    <figure
      {...rest}
      className={codeBlockClass({ className })}
    >
      {(title || lang) && (
        <figcaption className="x-code__bar">
          {title && <span className="x-code__title">{title}</span>}
          {lang && <span className="x-code__lang">{lang}</span>}
        </figcaption>
      )}
      <pre
        className="x-code__pre"
        tabIndex={0}
      >
        <code dangerouslySetInnerHTML={{ __html: codeHtml(code, lang) }} />
      </pre>
    </figure>
  )
}
