import React, { useState, useEffect } from "react";
import "./ProductUpdate.scss";
import { categories } from "../../data/data";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchProductById,
  updateProduct,
} from "../../redux/slices/productSlice";

const ProductUpdate = () => {
  const [formData, setFormData] = useState({
    name: "",
    imageUrls: [""],
    category: "",
    description: "",
    price: "",
    varProducts: [{ id: "", attribute: [{ key: "", value: "" }], stock: "" }],
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.products.product);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    } else {
      console.error("Product ID is not provided");
      navigate("/error"); // Navigate to an error page or handle accordingly
    }
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        imageUrls: product.imageUrls?.map((image) => image.imageUrl) || [""],
        category: product?.category?.name || "",
        description: product.description || "",
        price: product.price || "",
        varProducts: product.varProducts?.map((variant) => ({
          id: variant.id || "",
          attribute: Object.entries(variant.attribute).map(([key, value]) => ({
            key,
            value,
          })),
          stock: variant.stock || "",
        })) || [{ id: "", attribute: [{ key: "", value: "" }], stock: "" }],
      });
    }
  }, [product]);

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleAddArrayItem = (field, item) => {
    setFormData({ ...formData, [field]: [...formData[field], item] });
  };

  const handleAddVarProduct = () => {
    handleAddArrayItem("varProducts", {
      attribute: [{ key: "", value: "" }],
      stock: "",
    });
  };
  const handleVarProductChange = (index, attrIndex, field, value) => {
    const updatedVarProducts = [...formData.varProducts];
    if (attrIndex !== null) {
      updatedVarProducts[index].attribute[attrIndex][field] = value;
    } else {
      updatedVarProducts[index][field] = value;
    }
    setFormData({ ...formData, varProducts: updatedVarProducts });
  };

  const handleAddAttribute = (index) => {
    const updatedVarProducts = [...formData.varProducts];
    updatedVarProducts[index].attribute.push({ key: "", value: "" });
    setFormData({ ...formData, varProducts: updatedVarProducts });
  };

  const handleRemoveArrayItem = (field, index) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleRemoveAttribute = (varProductIndex, attrIndex) => {
    const updatedVarProducts = [...formData.varProducts];
    updatedVarProducts[varProductIndex].attribute = updatedVarProducts[
      varProductIndex
    ].attribute.filter((_, i) => i !== attrIndex);
    setFormData({ ...formData, varProducts: updatedVarProducts });
  };

  const handleRemoveVarProduct = (index) => {
    const updatedVarProducts = formData.varProducts.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, varProducts: updatedVarProducts });
  };

  const handleUpdateProduct = async () => {
    if (!id) {
      console.error("Product ID is not provided for update");
      return;
    }

    const formattedVarProducts = formData.varProducts.map(
      ({ id, attribute, stock }) => ({
        id,
        attribute: Object.fromEntries(
          attribute.map(({ key, value }) => [key, value])
        ),
        stock: parseInt(stock, 10) || 0,
      })
    );

    const data = {
      ...formData,
      category: formData.category,
      price: parseFloat(formData.price) || 0,
      varProducts: formattedVarProducts,
    };

    try {
      console.log("data", data);
      await dispatch(updateProduct({ id, data })).unwrap();
      navigate(`/products/${id}`); 
      alert("Update successfully");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="update-product">
      <div className="dialog">
        <div className="dialog-content">
          <h2>Update Product</h2>
          <input
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleInputChange("name")}
            className="dialog-input"
          />

          <div className="image-url">
            <h4>Product Images</h4>
            {formData.imageUrls.map((url, index) => (
              <div key={index} className="image-url-group">
                <input
                  type="text"
                  placeholder={`Image URL ${index + 1}`}
                  value={url}
                  onChange={(e) =>
                    handleArrayChange("imageUrls", index, e.target.value)
                  }
                  className="dialog-input"
                />
                <button
                  onClick={() => handleRemoveArrayItem("imageUrls", index)}
                  className="dialog-button remove-button"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddArrayItem("imageUrls", "")}
              className="dialog-button"
            >
              Add Image URL
            </button>
          </div>

          <select
            value={formData.category}
            onChange={handleInputChange("category")}
            className="dialog-input"
          >
            <option value="">Select Category</option>
            {categories.map(({ id, name }) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Product Description"
            value={formData.description}
            onChange={handleInputChange("description")}
            className="dialog-textarea"
          />

          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange("price")}
            className="dialog-input"
          />

          <div className="var-product">
            <h4>Product Variants</h4>
            {formData.varProducts.map((varProduct, index) => (
              <div key={index} className="var-product-group">
                {varProduct.attribute.map((attr, attrIndex) => (
                  <div key={attrIndex} className="attribute-group">
                    <input
                      type="text"
                      placeholder="Attribute Name"
                      value={attr.key}
                      onChange={(e) =>
                        handleVarProductChange(
                          index,
                          attrIndex,
                          "key",
                          e.target.value
                        )
                      }
                      className="dialog-input"
                    />
                    <input
                      type="text"
                      placeholder="Attribute Value"
                      value={attr.value}
                      onChange={(e) =>
                        handleVarProductChange(
                          index,
                          attrIndex,
                          "value",
                          e.target.value
                        )
                      }
                      className="dialog-input"
                    />
                    <button
                      onClick={() => handleRemoveAttribute(index, attrIndex)}
                      className="dialog-button remove-button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddAttribute(index)}
                  className="dialog-button"
                >
                  Add Attribute
                </button>
                <input
                  type="number"
                  placeholder="Số lượng"
                  value={varProduct.stock}
                  onChange={(e) =>
                    handleVarProductChange(index, null, "stock", e.target.value)
                  }
                  className="dialog-input"
                />
                <button
                  onClick={() => handleRemoveVarProduct(index)}
                  className="dialog-button remove-button"
                >
                  Remove Variant
                </button>
              </div>
            ))}
            <button onClick={handleAddVarProduct} className="dialog-button">
              Add Variant
            </button>
          </div>

          <div className="dialog-actions">
            <button onClick={handleUpdateProduct} className="dialog-button">
              Update
            </button>
            <button
              onClick={() => navigate(-1)}
              className="dialog-button cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
