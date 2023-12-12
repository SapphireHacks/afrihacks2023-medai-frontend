'use client';
import { useEffect, useMemo, useCallback, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export default function useSocket({
  onConnect,
  onError,
  onReconnectError,
  onReconnect,
  onDisconnect,
  namespace = ''
}: {
  onConnect?: () => void;
  onError?: () => {};
  onReconnectError?: () => {};
  onReconnect?: () => {};
  onDisconnect?: () => {};
  namespace?: string;
}) {
  const [token, setToken] = useState<string | null>(null);
  const socket = useMemo(
    () =>
      io(`${process.env.NEXT_PUBLIC_MEDAI_SOCKET_HOST || "https://medai.adaptable.app"}${namespace}`, {
        auth: {
          token
        },
        reconnection: true
      }),
    [namespace, token]
  );

  const disconnect = useCallback(() => {
    socket.disconnect();
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      onConnect && onConnect();
      console.log('socket connected');
    });
    socket.on('disconnect', () => {
      onDisconnect && onDisconnect();
    });
    socket.on('error', () => {
      onError && onError();
    });
    socket.on('reconnect', () => {
      onReconnect && onReconnect();
    });
    socket.on('reconnect_error', () => {
      onReconnectError && onReconnectError();
    });
    return () => {
      socket.off('connect', () => {
        onConnect && onConnect();
      });
      socket.off('disconnect', () => {
        onDisconnect && onDisconnect();
      });
      socket.off('error', () => {
        onError && onError();
      });
      socket.off('reconnect', () => {
        onReconnect && onReconnect();
      });
      socket.off('reconnect_error', () => {
        onReconnectError && onReconnectError();
      });
    };
  }, [onConnect, onDisconnect, onError, onReconnect, onReconnectError, socket]);

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData !== null) {
      const userToken = JSON.parse(userData)?.token;
      if (userToken) setToken(userToken);
    }
  }, []);

  return { socket, disconnect };
}
