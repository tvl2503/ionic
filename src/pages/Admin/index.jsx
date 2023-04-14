import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import agent from '../../service/agent';

const Admin = () => {
    const [data, setData] = useState({
        name: "",
        description: "",
        category: "",
        image: [],
        price: 0,
        percentReduce: 0,
        size : [],
        quantity : 0
      });
    const categories = useSelector(state => state.category)
    const handleChange = (name) => (e) => {
        const value = name === "image" ? e.target.files : e.target.value;
        setData({ ...data, [name]: value });
      };
    const handleSubmit = async () => {
        try {
            let formData = new FormData();
            formData.append("image", data.image[0]);
            formData.append("image", data.image[1]);
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("category", data.category);
            formData.append("price", Number(data.price));
            formData.append("percentReduce", Number(data.percentReduce));
            formData.append("quantity", Number(data.quantity));
       
            const res = await agent.Product.createProduct(
              formData
            );
            alert(res.data.message)
          } catch (error) {
            alert("Error")
          }
        }
  return (
    <div>
        <input type="text" placeholder='Tên sản Phẩm' onChange={handleChange("name")} />
        <input type="text" placeholder='Mô tả' onChange={handleChange("description")} />
        <select onChange={handleChange("category")}>
            {categories.length > 0 && categories.map((item, index) => (
              <option key={index} value={item._id} >{item.name}</option>
            ))}
          </select>
        <input type="file" placeholder='image' onChange={handleChange("image")} multiple />
        <input type="text" placeholder='Giá bán' onChange={handleChange("price")} />
        <input type="text" placeholder='Giá gốc' onChange={handleChange("percentReduce")} />

        <button onClick={handleSubmit}>Gửi</button>
    </div>
  )
}

export default Admin