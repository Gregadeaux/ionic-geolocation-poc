import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import { PositionComponent } from '../components/PositionComponent/PositionComponent';
import {
  PermissionStatusEnum,
  usePosition,
  useWatchPosition,
} from '../hooks/useGeolocation';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PositionComponent />
      </IonContent>
    </IonPage>
  );
};

export default Home;
