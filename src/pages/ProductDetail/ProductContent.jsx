import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button"
import numberWithVND from "../../utils/numberwithvnd";
import { selectUser } from "../../service/auth/authSlice";
import { useDispatch, useSelector } from 'react-redux';
import { addTocart } from "../../service/cart/cartSlice";
import { IonIcon, IonText } from "@ionic/react";
import IonItemComponent from "../../components/IonItemComponent";
import { removeOutline, addOutline } from "ionicons/icons";
import Input from "../../components/Input";
import {toast} from 'react-toastify'
const ProductContent = ({product}) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);

  const handleIncrement = () => {
    setQuantity((state) => Number(state) + 1);
  };
  const handleDecrement = () => {
    setQuantity((state) => (state > 1 ? state - 1 : state));
  };
  const handleClick = () => {
    if(!size && product.size.length > 0){
      alert("Vui lòng chọn kích thước")
    }
    else if(user){
      dispatch(addTocart({productId: product._id, quantity, size, price: product.price, name: product.name, img: product.image[0] }))
      alert("Thêm vào giỏ hàng thành công!")
    }
    else{
      alert("Vui lòng đăng nhập!")
    }
  }
  return (
    <div className="product--detail__content">
      <IonText className="title">
        <h1>{product.name}</h1>
      </IonText>
      <IonItemComponent className="category">
        <p>
          {`Danh mục:     `}
          <span style={{marginLeft: 8}}><Link to={`/products/${product?.category?.path}`} style={{color: '#de0c19'}}> {product?.category?.name}</Link></span>
        </p>
      </IonItemComponent>
      <IonItemComponent className="description">
        <div className="description__title">
          Mô tả:
        </div>
        <div className="description__content">
            {product.description}
        </div>
      </IonItemComponent>
      <IonText className="price">
        <p>{numberWithVND(product.price*(100-product.percentReduce)/100)}</p>
        {product.percentReduce > 0 &&
          <div className="price__old">
            {numberWithVND(product.price)}
          </div>
        }
      </IonText>
      <IonItemComponent className="size">
        <IonText className="size__header">SIZE</IonText>
        <div className="size__list">
          {product.size.map((item, index) => (
            <div
              key={index}
              className={`size__list__item ${item === size ? "active" : ""}`}
            onClick = {() => setSize(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </IonItemComponent>
      <IonItemComponent className="quantity">
        <IonText className="quantity__header">Số lượng</IonText>
        <IonItemComponent className="input--quantity">
          <IonIcon className="btn__decrement" icon = {removeOutline} onClick={handleDecrement} />
          <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          />
          <IonIcon className="btn__increment" icon = {addOutline} onClick={handleIncrement} />

        </IonItemComponent>
      </IonItemComponent>
      <Button type = "submit" onclick = {handleClick}  ><i className="fal fa-cart-plus"></i> Thêm vào giỏ hàng</Button>
    </div>
  );
};

ProductContent.propTypes = {};

export default ProductContent;
