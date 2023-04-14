import React, { useCallback, useState, useEffect } from 'react'

import "./Products.scss"
import Helmet from '../../components/Helmet';
import agent from '../../service/agent';
import Banner from './Banner';
import ProductCard from '../../components/ProductCard';
import IonItemComponent from '../../components/IonItemComponent';
import { IonButton, IonIcon, IonItem, IonList, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import { chevronDownOutline } from 'ionicons/icons';
const banner = "https://mcdn.nhanh.vn/store3/97757/bn/Banner_Mule_1400x600.jpg"


const Products = ({category}) => {
  const crumbs = [
    {
      title: category.name,
      href: category.path
    }
  ]
  const [products, setProducts] = useState([]);
  // const [rangePrice, setRangePrice] = useState([0, 5000000])
  const [totalPage, setTotalPage] = useState(1);
  const [filters, setFilters] = useState({
    categoryId: category._id,
    page_size : 3,
    page : 1,
    sort : []
  })
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1)
  const handleChangePage = (e) => {
    setPage(e)
  }
  const getProduct = useCallback(async () => {
      setLoading(true);
      try{
        const pro = await agent.Product.getProduct(filters)
        setProducts(products => [...products, ...pro.result.items])
        setTotalPage(pro.result.total)
        setLoading(false);
      }
      catch(err){
        console.log(err);
        setProducts({})
        setLoading(false);
      }
  }, [filters])
  const onChangeSelect = (e) => {
    setProducts([]);
    let sortPrice = {}
    if(e.detail.value === 'asc'){
      sortPrice = {property : "price" , direction: "asc"}
    }else if(e.detail.value === 'desc'){
      sortPrice = {property : "price" , direction : "desc"}
    }
    else{
      sortPrice = {property : "percentReduce",direction : "desc"}
    }
    setFilters({...filters, sort: [sortPrice], page: 1})
  }
  // const handleFilterProduct = (value) => {
  //   setRangePrice(value)
  // }
  const handleLoadMore = () => {
    setFilters({...filters, page: filters.page + 1})
    setPage(page => page + 1)
  }
  useEffect(() => {
    getProduct()
  }, [filters])

  return (
    <Helmet title = {category.name}>
      <div className='container-class product-page'>
        <Banner src = {category.banner}  /> 
        <IonList color='transparent' style={{backgroundColor : '#fff'}}>
          <IonItemComponent >
            <IonSelect color={'light'} onIonChange={onChangeSelect} aria-label="Fruit" interface="popover" placeholder="Sắp xếp">
              <IonSelectOption value="asc">Giá tăng dần</IonSelectOption>
              <IonSelectOption value="desc">Giá giảm dần</IonSelectOption>
              <IonSelectOption value="sale">Sale</IonSelectOption>
            </IonSelect>
          </IonItemComponent>
      </IonList>
        <div className="list-product">
        {
           products.length > 0 &&  products.map((item, index) => {
            return(
                <div key = {index} style={{maxWidth : '25%', paddingLeft: 7, paddingRight: 7}}>
                    <ProductCard product = {item} />
                </div>
            )})
        }
        </div>
        {
          loading && <Loading />
        }
        { filters.page < totalPage && <div style={{width: "100%", display: 'flex', justifyContent: 'center'}}>
            <IonButton onClick={handleLoadMore} className='load-more'>
              Xem Thêm <IonIcon icon={chevronDownOutline} />
            </IonButton>
          </div>
        }
      </div>
    </Helmet>
  )
}

export default Products