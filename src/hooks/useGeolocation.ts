import {
  ClearWatchOptions,
  Geolocation,
  PermissionStatus,
  Position,
  PositionOptions,
} from '@capacitor/geolocation';
import { useState } from 'react';

export enum PermissionStatusEnum {
  Granted,
  Denied,
  NotEnabled,
  NotImplemented,
  Unknown,
}

interface UsePositionHooks {
  position?: Position;
  positionError: any;
  permissionStatus: PermissionStatusEnum;
  requestUpdate: (options?: PositionOptions) => void;
  requestPermission: () => void;
}

interface WatchPositionHooks {
  position?: Position | null;
  positionError: any;
  permissionStatus: PermissionStatusEnum;
  startWatch: (options?: PositionOptions) => void;
  clearWatch: (options: ClearWatchOptions) => Promise<void>;
  requestPermission: () => void;
}

export function usePosition(): UsePositionHooks {
  const [position, setPosition] = useState<Position>();
  const [positionError, setError] = useState();
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>();
  const [permissionStatusError, setPermissionStatusError] = useState();

  const requestPermission = requestPermissionBuilder(
    setPermissionStatus,
    setPermissionStatusError
  );
  const requestUpdate = (options?: PositionOptions) => {
    Geolocation.getCurrentPosition(options).then(
      (pos: Position) => setPosition(pos),
      (error) => setError(error)
    );
  };

  return {
    position,
    positionError,
    permissionStatus: parsePermissionError(
      permissionStatusError,
      permissionStatus
    ),
    requestUpdate,
    requestPermission,
  };
}

export function useWatchPosition(): WatchPositionHooks {
  const [position, setPosition] = useState<Position | null>();
  const [positionError, setError] = useState();
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>();
  const [permissionStatusError, setPermissionStatusError] = useState();

  const requestPermission = requestPermissionBuilder(setPermissionStatus, setPermissionStatusError);
  const startWatch = (options: PositionOptions = {}) => {
    Geolocation.watchPosition(options, (pos: Position | null, error?: any) => {
      if (error) setError(error);
      setPosition(pos);
    });
  };

  const clearWatch = Geolocation.clearWatch;

  return {
    position,
    positionError,
    permissionStatus: parsePermissionError(
      permissionStatusError,
      permissionStatus
    ),
    startWatch,
    clearWatch,
    requestPermission,
  };
}

function requestPermissionBuilder(setStatus: (status: PermissionStatus) => void, setError: (error: any) => void): () => void {
  return () => {
    Geolocation.requestPermissions().then(
      (status: PermissionStatus) => setStatus(status),
      (error) => setError(error)
    );
  };
}

function parsePermissionError(
  permissionStatusError?: string,
  permissionStatus?: PermissionStatus
): PermissionStatusEnum {
  if (!permissionStatusError) {
    if (permissionStatus === undefined) {
      return PermissionStatusEnum.Unknown;
    } else if (permissionStatus.location === 'granted') {
      return PermissionStatusEnum.Granted;
    } else if (permissionStatus.location === 'denied') {
      return PermissionStatusEnum.Denied;
    } else {
      return PermissionStatusEnum.Unknown;
    }
  } else if (permissionStatusError !== 'Error: Not implemented on web.') {
    return PermissionStatusEnum.Granted; /* no need to display an error in this case */
  } else {
    return PermissionStatusEnum.NotEnabled;
  }
}
