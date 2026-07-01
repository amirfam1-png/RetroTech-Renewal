import { Fragment, type ReactNode } from 'react';

/**
 * Renders a small subset of inline markdown as JSX — bold (**text**) and
 * paragraph breaks (\n\n) and line breaks (\n). Used to display the alert
 * bodies authored in src/data/alerts.ts without resorting to
 * `dangerouslySetInnerHTML`.
 *
 * Deliberately not a full markdown parser: keeping the surface area small is
 * itself a security property.
 */
export function InlineMarkdown({ text }: { text: string }) {
  return <>{renderText(text)}</>;
}

function renderText(input: string): ReactNode {
  return input.split('\n\n').map((paragraph, pIdx, paragraphs) => (
    <Fragment key={pIdx}>
      {renderParagraph(paragraph)}
      {pIdx < paragraphs.length - 1 && (
        <>
          <br />
          <br />
        </>
      )}
    </Fragment>
  ));
}

function renderParagraph(paragraph: string): ReactNode {
  const lines = paragraph.split('\n');
  return lines.map((line, lIdx) => (
    <Fragment key={lIdx}>
      {renderInline(line)}
      {lIdx < lines.length - 1 && <br />}
    </Fragment>
  ));
}

function renderInline(text: string): ReactNode {
  // Split on **bold** segments, keep the delimiters out of the output.
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
