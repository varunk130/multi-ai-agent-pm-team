/**
 * MarkdownRenderer — Custom markdown-to-JSX renderer.
 * Handles headings, paragraphs, bold, italic, inline code, code blocks,
 * lists, blockquotes, tables, horizontal rules, and links.
 */

function parseInline(text) {
  if (!text) return text;

  const tokens = [];
  // Process inline patterns: bold, italic, inline code, links
  const regex = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(_[^_]+_)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // Inline code
      tokens.push(
        <code key={match.index} className="bg-[#1E293B] px-1.5 py-0.5 rounded text-[0.85em] text-[#E879F9]">
          {match[1].slice(1, -1)}
        </code>
      );
    } else if (match[2]) {
      // Bold
      tokens.push(<strong key={match.index} className="font-semibold text-[#F1F5F9]">{match[2].slice(2, -2)}</strong>);
    } else if (match[3]) {
      // Italic *text*
      tokens.push(<em key={match.index}>{match[3].slice(1, -1)}</em>);
    } else if (match[4]) {
      // Italic _text_
      tokens.push(<em key={match.index}>{match[4].slice(1, -1)}</em>);
    } else if (match[5]) {
      // Link
      tokens.push(
        <a key={match.index} href={match[7]} className="text-indigo-400 hover:underline" target="_blank" rel="noopener noreferrer">
          {match[6]}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    tokens.push(text.slice(lastIndex));
  }

  return tokens.length === 0 ? text : tokens;
}

function parseMarkdown(content) {
  if (!content) return [];

  const lines = content.split('\n');
  const elements = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Code block
    if (line.trim().startsWith('```')) {
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <pre key={key++} className="bg-[#0B1120] border border-[#1E293B] rounded-lg p-4 overflow-x-auto mb-4">
          <code className="text-sm text-[#94A3B8]">{codeLines.join('\n')}</code>
        </pre>
      );
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim()) || /^\*\*\*+$/.test(line.trim())) {
      elements.push(<hr key={key++} className="border-none border-t border-[#1E293B] my-6" />);
      i++;
      continue;
    }

    // Headings
    if (line.startsWith('### ')) {
      elements.push(<h3 key={key++}>{parseInline(line.slice(4))}</h3>);
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={key++}>{parseInline(line.slice(3))}</h2>);
      i++;
      continue;
    }
    if (line.startsWith('# ')) {
      elements.push(<h1 key={key++}>{parseInline(line.slice(2))}</h1>);
      i++;
      continue;
    }

    // Table
    if (line.includes('|') && i + 1 < lines.length && /^\|?[\s-:|]+\|?$/.test(lines[i + 1]?.trim())) {
      const headerCells = line.split('|').map((c) => c.trim()).filter(Boolean);
      i += 2; // skip header + separator
      const rows = [];
      while (i < lines.length && lines[i].includes('|') && lines[i].trim() !== '') {
        rows.push(lines[i].split('|').map((c) => c.trim()).filter(Boolean));
        i++;
      }
      elements.push(
        <table key={key++} className="w-full border-collapse mb-4">
          <thead>
            <tr>
              {headerCells.map((cell, ci) => (
                <th key={ci} className="bg-[#1E293B] px-3 py-2 text-left text-xs font-semibold text-[#F1F5F9] border-b border-[#1E293B]">
                  {parseInline(cell)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} className="px-3 py-2 text-sm text-[#94A3B8] border-b border-[#1E293B]">
                    {parseInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <blockquote key={key++} className="border-l-3 border-[#8B5CF6] pl-4 my-4 text-[#64748B] italic">
          {quoteLines.map((ql, qi) => (
            <p key={qi}>{parseInline(ql)}</p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Unordered list
    if (/^[\s]*[-*+]\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^[\s]*[-*+]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[\s]*[-*+]\s/, ''));
        i++;
      }
      elements.push(
        <ul key={key++} className="list-disc pl-6 mb-3 space-y-1">
          {items.map((item, ii) => (
            <li key={ii} className="text-[#94A3B8] leading-relaxed">{parseInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={key++} className="list-decimal pl-6 mb-3 space-y-1">
          {items.map((item, ii) => (
            <li key={ii} className="text-[#94A3B8] leading-relaxed">{parseInline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Paragraph (default)
    elements.push(<p key={key++} className="mb-3 leading-relaxed text-[#94A3B8]">{parseInline(line)}</p>);
    i++;
  }

  return elements;
}

export function MarkdownRenderer({ content, className = '' }) {
  if (!content) return null;

  return (
    <div className={`markdown-content ${className}`}>
      {parseMarkdown(content)}
    </div>
  );
}
