import React, { useEffect } from 'react';
import { PositionComponent } from '../../components/PositionComponent/PositionComponent';
import {
  useWatchPosition,
  PermissionStatusEnum,
  usePosition,
} from '../../hooks/useGeolocation';

interface PositionComponentProps {
  className?: string;
  style?: React.CSSProperties;
}

export const PositionContainer: React.FC<PositionComponentProps> = ({ className, style }) => {
  const { position, permissionStatus, positionError, requestPermission, requestUpdate } = usePosition();
//   const { position, permissionStatus, positionError, requestPermission, startWatch } = useWatchPosition();

  useEffect(() => {
    switch (permissionStatus) {
      case PermissionStatusEnum.Unknown:
        requestPermission();
        break;
      case PermissionStatusEnum.Granted:
        requestUpdate();
        // startWatch();
        break;
    }
  }, [permissionStatus]);

  return (
    <PositionComponent
      style={style}
      className={className}
      position={position} 
      positionError={positionError}
      permissionStatus={permissionStatus} />
  );
};
