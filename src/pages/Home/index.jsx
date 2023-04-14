import { IonContent, IonGrid, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.scss';
import { IonButton } from '@ionic/react';
import Slider from '../../components/Slider';
import ProductCategory from '../../components/ProductCategory';
import { useSelector } from 'react-redux';
const Home= () => {
  const category = useSelector(state => state.category)
  return (
      <IonGrid className='home'>
        <Slider />
        {category.map((item, index) => (
          <ProductCategory key = {index} category = {item}  />
        ))}
      </IonGrid>
  );
};

export default Home;
