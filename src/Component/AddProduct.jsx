import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToastMessage } from "../Notification/notify";
import { addproducts } from "../actions";
import customFetch from "../apiCall";

const Container = styled.div`
  width:500px;
  
  margin: auto;
  border-radius:60px;
  background-color: rgba(0, 0, 0, 0.664);
  @media only screen and (max-width: 976px) {
    width: 90%;
  }
  @media only screen and (max-width: 576px) {
    width: 100%;
    margin: 0;
  }
`;

function AddProduct() {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [thumbnail, setthumbmail] = useState("");
  const [rating, setrating] = useState("");
  
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const url = "https://my-json-server.typicode.com/Yogeshhiwal12/ecommercedata/products";
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = customFetch(url, {
      body: {
        id: Date.now(),
        title: name,
        price,
        category,
        thumbnail,
        rating,
        description,
        edit: true,
      },
      method: "POST",
    });
    result.then((data) => {
      dispatch(addproducts([data, ...products]));
      navigate("/");
    });
    showToastMessage("Product Added Successful", "success");
    setname("");
    setcategory("");
    setdescription("");
    setrating("");
    setthumbmail("");
    setprice("");
  }

  return (
    <Container className=" border border-1 border-dark p-3 ">
      <ToastContainer />
      <form className="d-flex flex-column gap-3 mt-4" onSubmit={handleSubmit} >
        <input
          type="text"
          className="p-2"
          placeholder="Name"
          onChange={(e) => setname(e.target.value)} style={{borderRadius:"13px"}}
        />
        <input
          type="text"
          className="p-2"
          placeholder="Descriptions"
          onChange={(e) => setdescription(e.target.value)}  style={{borderRadius:"13px"}}
        />
        <input
          type="text"
          className="p-2"
          placeholder="Price"
          onChange={(e) => setprice(e.target.value)}  style={{borderRadius:"13px" ,border:"none"}}
        />
        <input
          type="text"
          className="p-2"
          placeholder="category"
          onChange={(e) => setcategory(e.target.value)}  style={{borderRadius:"13px" ,border:"none"}}
        />
        <input
          type="text"
          className="p-2"
          placeholder="Thumbnail image Url"
          onChange={(e) => setthumbmail(e.target.value)}
          style={{borderRadius:"13px" ,border:"none"}}
        />
        <input
          type="text"
          className="p-2"
          placeholder="ratings"
          onChange={(e) => setrating(e.target.value)}  style={{borderRadius:"13px" ,border:"none"}}
        />
        <button
          type="submit"
          className="btn btn-primary align-self-end mt-2 "
          style={{
            width: "9rem",
            backgroundColor: "var(--nav)", borderRadius:"13px" ,border:"none"
          }}
        >
          Add to Cart
        </button>
      </form>
    </Container>
  );
}

export default  AddProduct;
