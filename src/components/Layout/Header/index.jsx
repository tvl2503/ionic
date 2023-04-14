import { IonHeader } from "@ionic/react"
import HeaderTop from "./HeaderTop";

import "./index.styles.scss"
import HeaderBottom from "./HeaderBottom";
const Header = () => {
    return(
        <IonHeader className="header">
            <HeaderTop />
            <HeaderBottom />
        </IonHeader>
    )
}
export default Header;