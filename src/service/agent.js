import { BASE_URL } from "../constants/api";
import axios from 'axios'
import axiosClient from "./axiosClient";
const axiosMethods = {
    GET: axiosClient.get,
    POST: axiosClient.post,
    PUT: axiosClient.put,
    DELETE: axiosClient.delete,
  };
function serialize(object) {
    const params = [];
  
    for (const param in object) {
      if (Object.hasOwnProperty.call(object, param) && object[param] != null) {
        params.push(`${param}=${encodeURIComponent(object[param])}`);
      }
    }
  
    return params.join('&');
  }
  
const agent = async (url, body, method = "GET") => {
    try{
        const {data} = await axiosMethods[method](url, body);
       return data
    }catch(error){
   
        throw error 
    }
}

const requests = {
    del : (url) => agent(url, undefined, "DELETE"),
    get: (url, query = {}) => {
        if (Number.isSafeInteger(query?.page)) {
            query.limit = query.limit ? query.limit : 10;
            query.offset = query.page * query.limit;
          }
          delete query.page;
          const isEmptyQuery = query == null || Object.keys(query).length === 0;
      
          return agent(isEmptyQuery ? url : `${url}?${serialize(query)}`);
    }, 
    put: (url, body) => agent(url, body, "PUT"),
    post: (url, body) => agent(url, body, "POST")
}

const Auth = {
    current: () => requests.get('/user'),
    login: (email, password) => {
        requests.post('auth/login', {user: {email, password}})
    },
    register: (name, email, password, phone) =>
        requests.post('auth/register', { user: { name, email, password, phone } }),
    save: (user) => requests.put('/user', { user }),
}
const Product = {
    getProductByID: (id) => requests.get('product/' + id),
    getProductByCate: (cate, rangePrice = [0,5000000],page = 1) => requests.get(`product?cate=${cate}&priceMin=${rangePrice[0]}&priceMax=${rangePrice[1]}&page=${page}` ),
    searchProductByKeyword: (keyword) => requests.get('product/search/' + keyword),
    getProduct : (body) => requests.post('product/search', body),
    createProduct : (body) => requests.post('product', body)
}
const Category = {
    getAllCategory: (id) => requests.get("category")
}
const Cart = {
    addToCart: (productId, quantity, size, price, name, img, percentReduce) => 
        requests.post('cart/user', {products: {productId, quantity, size, price, name,img, percentReduce}}),
    getToCart: () => requests.get('cart/user/'),
    updateCartByUser: (productId, type, size) => requests.put('cart/user/' + productId, {type, size})
}
const Order = {
    getOrderById : (id) => requests.get('order/' + id),
    getOrders : (body) => requests.post('order/search', body)
}
export default {
    Auth,
    Product,
    Category,
    Cart,
    Order

};