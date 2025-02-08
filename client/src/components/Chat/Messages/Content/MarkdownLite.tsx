import { memo } from 'react';
import rehypeHighlight from 'rehype-highlight';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import supersub from 'remark-supersub';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import type { PluggableList } from 'unified';
import { ArtifactProvider, CodeBlockProvider } from '~/Providers';
import { a, p, code, codeNoExecution } from './Markdown';
import { langSubset } from '~/utils';

const MarkdownLite = memo(
  ({ content = '', codeExecution = true }: { content?: string; codeExecution?: boolean }) => {
    const rehypePlugins: PluggableList = [
      [rehypeKatex, { output: 'mathml' }],
      [
        rehypeHighlight,
        {
          detect: true,
          ignoreMissing: true,
          subset: langSubset,
        },
      ],
    ];

    return (
      <ArtifactProvider>
        <CodeBlockProvider>
          <ReactMarkdown
            remarkPlugins={[
              /** @ts-ignore */
              supersub,
              remarkGfm,
              [remarkMath, { singleDollarTextMath: true }],
            ]}
            /** @ts-ignore */
            rehypePlugins={rehypePlugins}
            // linkTarget="_new"
            components={
              {
                code: codeExecution ? code : codeNoExecution,
                a,
                p,
              } as {
                [nodeType: string]: React.ElementType;
              }
            }
          >
            {content}
          </ReactMarkdown>
        </CodeBlockProvider>
      </ArtifactProvider>
    );
  },
);

export default MarkdownLite;
