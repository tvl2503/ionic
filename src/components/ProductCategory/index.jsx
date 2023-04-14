import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import agent from "../../service/agent";
import { IonButton, IonCol, IonGrid, IonImg, IonRow, IonText, IonToolbar } from '@ionic/react';
import "./ProductCategory.scss";
import ProductCard from './../ProductCard/index';
import Loading from "../Loading";
const ProductCategory = ({category}) => {
    const history = useHistory();
    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(false)
    const getProduct =  async () => {
        setLoading(true)
        try{
        const pro = await agent.Product.getProduct({categoryId : category._id, page: 1, page_size : 8})
        setLoading(false)
        setProducts(pro.result.items)
    
        }
        catch(err){
        setProducts({})
        setLoading(false)
        }
    }
    useEffect(() => {
        getProduct()
    }, [category._id])
    return(
        <IonGrid class = "product-category">
            <IonRow  className="title" >
                    <IonText ><h2 className="title-name">{category.name}</h2></IonText>
                    <IonText onClick={() => {
                        history.push(`/${category.path}`)
                    }} className="view-more">Xem thêm</IonText>
            </IonRow>
            <IonRow>
                <div className = "image-category">
                    <IonImg  src={category.image} />
                </div>
                {
                    products.length > 0 && !loading &&
                    <div className="list-product">
                        {
                            products.map((item, index) => (
                                <div key = {index} style={{width : '25%'}}>
                                    <ProductCard product = {item} />
                                </div>
                            ))
                        }
                    </div>
                }
                { loading && <Loading />}
            </IonRow>
        </IonGrid>
    )
}

export default ProductCategory