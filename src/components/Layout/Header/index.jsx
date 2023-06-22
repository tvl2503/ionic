import { IonHeader } from "@ionic/react";
import HeaderTop from "./HeaderTop";

import "./index.styles.scss";
import HeaderBottom from "./HeaderBottom";
// Sử dụng component  IonHeader của ionic

const Header = () => {
  return (
    <IonHeader className="header">
      <HeaderTop />
      <HeaderBottom />
    </IonHeader>
  );
};
export default Header;
