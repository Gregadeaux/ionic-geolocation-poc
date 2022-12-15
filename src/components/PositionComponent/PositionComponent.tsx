import React from 'react';
import { Position } from '@capacitor/geolocation';
import { PermissionStatusEnum } from '../../hooks/useGeolocation';

interface PositionComponentProps {
  position: Position | null | undefined,
  permissionStatus: PermissionStatusEnum,
  positionError?: string
  className?: string;
  style?: React.CSSProperties;
}

export const PositionComponent: React.FC<PositionComponentProps> = ({ position, positionError, permissionStatus, className, style }) => {
  let positionView = <></>;

  if (positionError) {
    positionView = (
      <>
        There was an error locating your position...
      </>
    )
  } else if (position) {
    positionView = (
      <>
        {position.coords.latitude}, {position.coords.longitude}
      </>
    );
  } else if (permissionStatus === PermissionStatusEnum.Unknown || (permissionStatus === PermissionStatusEnum.Granted && !position)) {
    positionView = (
      <>
        Locating you...
      </>
    );
  } else if (permissionStatus === PermissionStatusEnum.Denied) {
    positionView = (
      <>
        Please give this app permission to access your location in your OS
        settings
      </>
    );
  } else if (permissionStatus === PermissionStatusEnum.NotEnabled) {
    positionView = (
      <>
        Please enable location services
      </>
    );
  }

  return (
    <div style={style} className={className}>
      {positionView}
    </div>
  );
};
