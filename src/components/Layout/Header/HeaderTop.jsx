import { IonButton, IonCol, IonGrid, IonIcon, IonImg, IonInput, IonItem, IonRow, IonText } from "@ionic/react";
import { searchOutline } from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "../../../service/auth/authSlice";
import { useHistory } from "react-router";
import { remove } from "../../../service/cart/cartSlice";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import agent from "../../../service/agent";
import IonItemComponent from "../../IonItemComponent";
const HeaderTop = () => {

    const user = useSelector(selectUser);
    const dispatch = useDispatch()
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState('')
    const handeChange = (e) => {
        setKeyword(e.target.value);
        console.log(products);
    }
    const onClickProduct = (url) => {
        if(keyword !== ''){
            setKeyword('')
            history.push(url)
        }
    }
    const handleSumbit = () => {
        history.push('/search?key='+keyword)
    }
    const handleSearch = useCallback(
        async () => {
          let product = []
          if(keyword !== '')
          {
            try{
                product = await agent.Product.getProduct({keyword})
                setProducts(product?.result?.items)
            }catch(err){
                setProducts([])
            }

          }
          else{
            setProducts([])
          }
        }, [keyword]
      );
    useEffect(() => {
        handleSearch()
    }, [handleSearch])
    const handleLogout = () => {
        dispatch(logout())
        dispatch(remove())
        history.push('/user/login')
        // toast.success("Đăng xuất thành công!")
    }
    return (
        <IonGrid>
            <IonRow className="header__top">
                <IonRow className="header__top__info">
                    <IonRow className="header__top__info__email">
                        <IonText color={'light'}><p>Email:</p></IonText>
                        <IonText><span>gmail@gmail.com</span></IonText>
                    </IonRow>
                    <IonRow className="header__top__info__hotline">
                        <IonText color={'light'}><p>Hotline:</p></IonText>
                        <IonText><span>123456789</span></IonText>
                    </IonRow>
                </IonRow>
                <div className="header__top__search">
                    <form action="" onSubmit={handleSumbit}>
                        <IonRow>
                            <IonButton class = "button-search" color={'transparent'} expand = "block" type='submit'>
                                <IonIcon icon = {searchOutline} size="medium" color = {'light'}></IonIcon>
                            </IonButton>
                            {/* <IonInput onIonInput={handeChange} name="q" type="text" placeholder="Tìm kiếm sản phẩm" color={'light'}></IonInput> */}
                            <input onChange={handeChange} name="q" type="text" placeholder="Tìm kiếm sản phẩm" color={'light'} /> 
                        </IonRow>
                    </form>

                    
                {products.length > 0 &&
                        <div className="header__top__search__product">
                            {products.map((item, index) => (
                                    <div className="product" key = {index} onClick = {() => onClickProduct(`/product/${item._id}`)}>
                                        <div className="img">
                                            <IonImg src = {item.image[0]} />
                                        </div>
                                        <div className="content">
                                            <div className="name">{item.name}</div>
                                            <div className="price">{item.price}</div>
                                        </div>
                                    </div>
                            ))
                            }
                            </div>
                        }
                </div>
                <IonItemComponent className="header__top__user">
                    {
                        !user && <>
                            <Link to = "/user/login">
                                <IonText color={"light"}>
                                        Đăng nhập
                                </IonText>
                            </Link>
                            
                            <Link to = "/user/register">
                                <IonText color={"light"} style={{marginLeft : 10}}>
                                    Đăng ký
                                </IonText>
                            </Link>
                        </>
                    }
                    {
                        user && 
                        <>
                        <IonText color={'light'}><p>Xin chào, {user.fullname}</p></IonText>
                            <div className="logout"  onClick={handleLogout}>Đăng xuất</div>
                        </> 
                    }   
                </IonItemComponent>
                                    
        </IonRow>
    </IonGrid>
    )
}
export default HeaderTop;