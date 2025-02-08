import { useState, forwardRef, useLayoutEffect } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { useRecoilValue } from 'recoil';
import type { TextareaAutosizeProps } from 'react-textarea-autosize';
import store from '~/store';

export const TextareaAutosize = forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>(
  (props, ref) => {
    const [, setIsRerendered] = useState(false);
    const chatDirection = useRecoilValue(store.chatDirection).toLowerCase();
    useLayoutEffect(() => setIsRerendered(true), []);
    return <ReactTextareaAutosize dir={chatDirection} {...props} ref={ref} />;
  },
);
