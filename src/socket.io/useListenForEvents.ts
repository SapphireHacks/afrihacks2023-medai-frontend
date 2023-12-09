import { useEffect } from 'react';
import { Socket } from 'socket.io-client';

export default function useListenForEvents(
  socket: Socket | (() => void),
  {
    events,
    handlers
  }: {
    events: string[];
    handlers: { [x: string]: (...args: any[]) => void };
  }
) {
  useEffect(() => {
    events.forEach(event => {
      (socket as Socket).on(
        event,
        data =>
          handlers[event as keyof typeof handlers] &&
          handlers[event as keyof typeof handlers](data)
      );
    });

    return () => {
      events.forEach(event => {
        (socket as Socket).off(event, handlers[event as keyof typeof handlers]);
      });
    };
  }, [events, handlers, socket]);
}
