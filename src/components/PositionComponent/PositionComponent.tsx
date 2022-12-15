import React, { useEffect } from 'react';
import {
  useWatchPosition,
  PermissionStatusEnum,
} from '../../hooks/useGeolocation';

interface PositionComponentProps {
  className?: string;
  style?: React.CSSProperties;
}

export const PositionComponent: React.FC<PositionComponentProps> = ({
  className,
  style,
}) => {
  const { position, permissionStatus, requestPermission, startWatch } =
    useWatchPosition();

  useEffect(() => {
    switch (permissionStatus) {
      case PermissionStatusEnum.Unknown:
        requestPermission();
        break;
      case PermissionStatusEnum.Granted:
        startWatch();
        break;
    }
  }, [permissionStatus]);

  let positionView = <></>;

  if (position) {
    positionView = (
      <>
        {position.coords.latitude}, {position.coords.longitude}
      </>
    );
  } else if (
    permissionStatus === PermissionStatusEnum.Unknown ||
    (permissionStatus === PermissionStatusEnum.Granted && !position)
  ) {
    positionView = <>Locating you...</>;
  } else if (permissionStatus === PermissionStatusEnum.Denied) {
    positionView = (
      <>
        Please give this app permission to access your location in your OS
        settings
      </>
    );
  } else if (permissionStatus === PermissionStatusEnum.NotEnabled) {
    positionView = <>Please enable location services</>;
  }

  return (
    <div style={style} className={className}>
      {positionView}
    </div>
  );
};
