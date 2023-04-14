import { IonButton, IonCol, IonInput, IonItem, IonLabel, IonRow, IonText } from "@ionic/react"
import Helmet from './../../components/Helmet/index';
import './User.scss';
import { Formik } from "formik";
import { Link } from "react-router-dom";
import * as yup from 'yup';
import Input from "../../components/Input";

const validateSchema = yup.object().shape({
    email : yup.string().email("Vui lòng nhập đúng email").required("Vui lòng nhập email"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
    fullName: yup.string().required("Vui lòng nhập họ và tên"),
    phone: yup.string().required("Vui lòng nhập số điện thoại")
})
const Register = () => {
    console.log("login");
    return(
            <Helmet title = "Đăng ký" >
            <IonRow className="login">
                <IonCol className="login__title">
                   <IonText color = {"light"}><h1>Đăng nhập</h1></IonText> 
                </IonCol>
                <IonCol className="login__content">
                    <div className="login__content__form">
                    <Formik
                        initialValues={{fullName: "", phone: "", email : "", password: ""}}
                        validationSchema={validateSchema}
                    >
                        {({handleSubmit, values, handleChange, handleBlur, errors, isSubmitting}) => (
                            <>
                                    <Input type="text" placeholder='Họ và Tên'
                                        name = "fullName" value={values.fullName} onChange={handleChange}
                                        error = {errors.fullName}
                                        onBlur={handleBlur}
                                        />
                                    <Input type="text" placeholder='Email'
                                        name = "email" value={values.email} onChange={handleChange}
                                        error = {errors.email}
                                        onBlur={handleBlur}
                                        style = {{marginTop : 30}}
                                        />

                                    <Input type="password" placeholder='Mật khẩu' 
                                        name = "password"  value={values.password}  onChange={handleChange}
                                        error = {errors.password}
                                        onBlur={handleBlur}
                                        style = {{marginTop : 30}}
                                        />  
                                    <Input type="text" placeholder='Điện thoại'
                                        name = "phone" value={values.phone} onChange={handleChange}
                                        error = {errors.phone}
                                        onBlur={handleBlur}
                                        style = {{marginTop : 30}}
                                        />                              
                                    <IonButton disabled = {isSubmitting} color={'transparent'} style={{marginTop: 30}}>
                                    {/* {inProgress? <div className="loader"></div> : 'Đăng nhập'} */}
                                    Đăng ký
                                </IonButton>
                            </>
                        )}
                    </Formik>
                       <IonItem lines="none" text-center color={'transparent'} className="forgot--password">
                           <IonLabel>
                                <Link to = "/user/login">Đăng nhập</Link>
                           </IonLabel>
                       </IonItem>
                    </div>
                </IonCol>
            </IonRow>
            </Helmet>
    )
}
export default Register