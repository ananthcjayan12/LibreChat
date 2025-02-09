import React, { useEffect, useContext } from 'react';
import AnnouncerContext from '~/Providers/AnnouncerContext';

interface LiveMessageProps {
  message: string;
  'aria-live': 'polite' | 'assertive';
  clearOnUnmount?: boolean | 'true' | 'false';
}

const LiveMessage: React.FC<LiveMessageProps> = ({
  message,
  'aria-live': ariaLive,
  clearOnUnmount,
}) => {
  const { announceAssertive, announcePolite } = useContext(AnnouncerContext);

  useEffect(() => {
    if (ariaLive === 'assertive') {
      // @ts-ignore
      announceAssertive(message);
    } else if (ariaLive === 'polite') {
      // @ts-ignore
      announcePolite(message);
    }
  }, [message, ariaLive, announceAssertive, announcePolite]);

  useEffect(() => {
    return () => {
      if (clearOnUnmount === true || clearOnUnmount === 'true') {
        // @ts-ignore
        announceAssertive('');
        // @ts-ignore
        announcePolite('');
      }
    };
  }, [clearOnUnmount, announceAssertive, announcePolite]);

  return null;
};

export default LiveMessage;
