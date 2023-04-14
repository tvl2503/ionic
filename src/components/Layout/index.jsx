import { IonContent, IonPage, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Header from './Header';
import Footer from './Footer';
import Login from '../../pages/User/Login';
import Register from '../../pages/User/Register';
import NotFound from './../../pages/NotFound';
import Products from './../../pages/Products';
import ProductDetail from '../../pages/ProductDetail';
import { useSelector } from 'react-redux';
import Cart from './../../pages/Cart';
import Search from '../../pages/Search';
import Admin from '../../pages/Admin';

const Layout = () => {
    const categorys = useSelector(state => state.category)
    const {user} = useSelector(state => state.auth)
    return(
        <IonRouterOutlet>
            <IonPage>
                <IonContent color={'dark'} fullscreen >

                    <Header />
                    <Route exact path={"/"} component={Home} />
                    {categorys.map((item, index) => (
                    <Route 
                        key = {index} 
                        path = {`/${item.path}`} 
                        component={() => (<Products  category = {item} />)} />
                    ))}
                    <Route path={"/product/:id"} component={ProductDetail} />
                    <Route path={"/cart"} component={Cart} />
                    <Route path = "/search" component = {Search} />
                    <Route path = "/user/login" component={Login} />
                    <Route path = "/user/register" component={Register} />

                    {
                        user?.isAdmin && 
                        <Route path={"/admin"} component = {Admin} />
                    }
                      <Footer />
                </IonContent>
            </IonPage>
        </IonRouterOutlet>
    )
}

export default Layout;