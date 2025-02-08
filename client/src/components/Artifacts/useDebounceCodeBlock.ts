import { useEffect, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import debounce from 'lodash/debounce';
// client/src/hooks/useDebounceCodeBlock.ts
import type { CodeBlock } from '~/common';
import { codeBlocksState, codeBlockIdsState } from '~/store/artifacts';

export function useDebounceCodeBlock() {
  const setCodeBlocks = useSetRecoilState(codeBlocksState);
  const setCodeBlockIds = useSetRecoilState(codeBlockIdsState);

  const updateCodeBlock = useCallback((codeBlock: CodeBlock) => {
    console.log('Updating code block:', codeBlock);
    setCodeBlocks((prev) => ({
      ...prev,
      [codeBlock.id]: codeBlock,
    }));
    setCodeBlockIds((prev) =>
      prev.includes(codeBlock.id) ? prev : [...prev, codeBlock.id],
    );
  }, [setCodeBlocks, setCodeBlockIds]);

  const debouncedUpdateCodeBlock = useCallback(
    debounce((codeBlock: CodeBlock) => {
      updateCodeBlock(codeBlock);
    }, 25),
    [updateCodeBlock],
  );

  useEffect(() => {
    return () => {
      debouncedUpdateCodeBlock.cancel();
    };
  }, [debouncedUpdateCodeBlock]);

  return debouncedUpdateCodeBlock;
}
