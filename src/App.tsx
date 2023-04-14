import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import GlobalStyles from "./components/GlobalStyles";

import Layout from './components/Layout';
import { useCallback, useEffect, useState } from 'react';
import agent from './service/agent'
import { useDispatch } from 'react-redux';
import {setCategory} from './service/category';
import { ToastContainer } from 'react-toastify';
setupIonicReact();

const App = () => {
  // const [category, setCategory] = useState({});
  const dispatch =  useDispatch()
  const getCate = useCallback(async () => {
    try{
      const cate = await agent.Category.getAllCategory();
      dispatch(setCategory(cate))
      // setCategory(cate)
    }
    catch(err){
      setCategory({})
    }
  }, [])
  useEffect(() => {
    getCate()
  }, [])
  return (
    <IonApp>
      <IonReactRouter>
        <GlobalStyles>
          <>
            <ToastContainer autoClose={2000} />
            <Layout  />
          </>
        </GlobalStyles>
      </IonReactRouter>
    </IonApp>
)};

export default App;
