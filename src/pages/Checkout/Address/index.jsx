import React, { useState } from 'react'
import Input from './../../../components/Input/index';
import Grid from './../../../components/Grid/index';
import Button from './../../../components/Button/index';
import { IonInput } from '@ionic/react';

const Address = ({address, setAddress}) => {
    const handleChange = (e) => {
        setAddress({...address, [e.target.name] : e.target.value})
    }
  return (
    <div className="order--address">
          <div className="title">
              <p>Thông tin giao hàng</p>
          </div>
        <div className="order--address__add">
            <div className="order--address__add__form">
                <Grid col = {2} gap = {20}>
                    <IonInput name = {"name"} value = {address.name} label = {"Tên người nhận"} onInput = {handleChange} placeholder = "Tên người nhận" />
                    <IonInput name = {"phone"} value = {address.phone} onInput = {handleChange} label = {"Số điện thoại"} placeholder = "Số điện thoại" />
                </Grid>
                <IonInput name = {"address"} label = {"Địa chỉ giao hàng"} onInput = {handleChange} placeholder = "Địa chỉ giao hàng" />
                <IonInput name = {"note"} onInput = {handleChange} label = {"Ghi chú"} placeholder = "Ghi chú" />
            </div>
        </div>
    </div>
  )
}

export default Address
