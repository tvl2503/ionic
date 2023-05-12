import React, { useState } from 'react'
import './Checkout.scss'
import Address from './Address'
import { useSelector } from 'react-redux'
import ListProductOrder from './ListProductOrder'
import axiosClient from './../../service/axiosClient';
import { useHistory } from 'react-router'
// import { useNavigate } from 'react-router-dom'

const initialValues = {
  name : "",
  phone: "",
  address: "",
  note : ""
}
const Checkout = () => {
    const user = useSelector(state => state.auth?.user)
    const [address, setAddress] = useState({...initialValues, name : user?.fullname, phone : user?.phone});
    const [isLoading, setIsLoading]  = useState(false);
    const history = useHistory();
    const handleSubmit = async () => {
      setIsLoading(true)
      try {
        const res = await axiosClient.post("/checkout", {...address})
        if(res.data.code === 200){
            const id =  res.data.result._id
            history.push(`/checkout-success/${id}`)
        }
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.log(error);
      }
    }
  return (
    <div className='container-class'>
      <div className="order">
        <Address address = {address} setAddress = {setAddress} />
        <ListProductOrder />
        <div className="order--payment">
          <button disabled = {isLoading} onClick={handleSubmit} >{ isLoading ? <div className="loader"></div> : 'Đặt hàng'}</button>
        </div>
        
      </div>
    </div>
  )
}

export default Checkout