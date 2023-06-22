import {
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.scss";
import { IonButton } from "@ionic/react";
import Slider from "../../components/Slider";
import ProductCategory from "../../components/ProductCategory";
import { useSelector } from "react-redux";
import Helmet from "../../components/Helmet";
// Sử dụng component IonGrid của ionic

const Home = () => {
  const category = useSelector((state) => state.category);
  return (
    <Helmet title="Trang chủ">
      <IonGrid className="home">
        <Slider />
        {category.map((item, index) => (
          <ProductCategory key={index} category={item} />
        ))}
      </IonGrid>
    </Helmet>
  );
};

export default Home;
