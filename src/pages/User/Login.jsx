import { IonButton, IonCol, IonItem, IonLabel, IonRow, IonText } from "@ionic/react"
import Helmet from './../../components/Helmet/index';
import './User.scss';
import { Formik } from "formik";
import { Link } from "react-router-dom";
import * as yup from 'yup';
import Input from "../../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../../service/auth/authSlice";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { isValidEmail, isValidPassword } from './../../utils/validate';

const validateSchema = yup.object().shape({
    email : yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
})
const initialValues = { email: "", password: ""}
const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(selectUser)
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({ email: "", password: ""})
    const handleChange = ({ currentTarget: input }) => {
        console.log(input.value);
        setFormValues({...formValues,[input.name]: input.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(login(formValues))
    
  
    }
    const hanldeBlur = (e) => {
        const name = e.target.name
        const error = validate(formValues)
        if(name  === "email"){
            setFormErrors({...formErrors, [name] : error.email})
        }
        else if(name === "password"){
            setFormErrors({...formErrors, [name] : error.password})

        }
    }
    const validate = (values) => {
        const errors = { email: "", password: ""}
        if(!values.email){
            errors.email = "Vui lòng nhập email!"
        }
        else if(!isValidEmail(values.email)){
            errors.email = "Vui lòng nhập đúng email!"
        }
        if(!values.password){
            errors.password = "Vui lòng nhập mật khẩu!"
        }
        else if(!isValidPassword(values.password)){
            errors.password = "Mật khẩu ít nhất 6 ký tự!"

        }
        
        return errors
    }
    useEffect(() => {
        if(user){
            history.push("/")
        }
        dispatch(logout)
    }, [user])
    return(
            <Helmet title = "Đăng nhập" >
            <IonRow className="login">
                <IonCol className="login__title">
                   <IonText color = {"light"}><h1>Đăng nhập</h1></IonText> 
                </IonCol>
                <IonCol className="login__content">
                    <div className="login__content__form">

                        <Input type="text" placeholder='Email'
                            name = "email" value={formValues.email} 
                            error = {formErrors.email}
                            onChange = {handleChange}
                            onBlur = {hanldeBlur}
                            />
                        <Input type="password" placeholder='Mật khẩu' 
                            name = "password"  value={formValues.password}  
                            onChange={handleChange}
                            style = {{marginTop : 30}}
                            error = {formErrors.password}
                            onBlur = {hanldeBlur}
                            />
                        <IonButton onClick={handleSubmit} disabled = {!isValidEmail(formValues.email) || !isValidPassword(formValues.password)}  color={'primary'} style={{marginTop: 30}}>
                            {/* {inProgress? <div className="loader"></div> : 'Đăng nhập'} */}
                            Đăng nhập
                        </IonButton>
                    <IonItem lines="none" text-center color={'transparent'} className="forgot--password">
                           <IonLabel>
                                <Link to = "/forgot--password">Quên mật khẩu?</Link>
                           </IonLabel>
                       </IonItem>
                       <IonItem lines="none" text-center color={'transparent'} className="forgot--password">
                           <IonLabel>
                                <Link to = "/user/register">Đăng ký</Link>
                           </IonLabel>
                       </IonItem>
                    </div>
                </IonCol>
            </IonRow>
            </Helmet>
    )
}
export default Login