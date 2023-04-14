import { IonIcon, IonText } from '@ionic/react';
import { cartOutline } from 'ionicons/icons';
import React,{ useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectUser } from '../../../service/auth/authSlice';
// import { useEffect } from 'react';
// import { getToCart } from '../../../service/cart/cartSlice';
const logo  = "https://res.cloudinary.com/fef/image/upload/v1656410485/nhanh_fycbje.png";
const mainNav = [
    {
        name: "Máy sinh tố",
        path: "/may-sinh-to"
    },
    {
        name: "Bếp",
        path: "/bep", 
    },
    {
        name: "Lò vi sóng",
        path: "/lo-vi-song", 
    },
    {
        name: "Máy làm kem",
        path: "/may-lam-kem", 
    },
    {
        name: "Dụng cụ bếp",
        path: "/dung-cu-bep", 
    },
]
const HeaderBottom = () => {
    const {quantity} = useSelector((state) => state.cart)
    const menuRef = useRef(null)
    const [keyword, setKeyword] = useState('')
    // const navigate = useNavigate();
    const menuAdd = () => menuRef.current.classList?.add('active')
    const menuClose = () => menuRef.current.classList?.remove('active')
    const handeChange = (e) => {
        setKeyword(e.target.value)
  
    }
    const handleSumbit = () => {
        menuRef.current.classList?.remove('active')

        // navigate('search?q='+keyword)
    }

  return (
    <div className="header__bottom">
            <div className="header__bottom__img">
                <Link to = "/" >
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <div className="header__bottom__menu" ref = {menuRef}>
                {mainNav.map((item, index) => (
                    <div key = {index} className="header__bottom__menu__item" onClick={menuClose}>
                        <IonText color={'light'}><Link to = {item.path} >
                            {item.name}
                        </Link></IonText>
                    </div>
                ))}
            </div>
            <div className="header__bottom__cart">
                <Link to = "/cart">
                    <IonIcon icon = {cartOutline} size="large" ></IonIcon>
                    {quantity > 0 && <div className='cart--quantity'>{quantity}</div>}
                </Link>
            </div>
        </div>
  )
}

export default HeaderBottom