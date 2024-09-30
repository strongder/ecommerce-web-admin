import React, { useState } from "react";
import "./ProductAdd.scss";
import { categories } from '../../data/data';

const ProductAdd = ({ onClose, onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    imageUrls: [""],
    category: "", 
    description: "",
    price: "",
    varProducts: [{ attribute: [{ key: "", value: "" }], stock: "" }],
  });

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleArrayChange = (field, index, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleVarProductChange = (index, attrIndex, field, value) => {
    const updatedVarProducts = [...formData.varProducts];
    updatedVarProducts[index].attribute[attrIndex][field] = value;
    setFormData({ ...formData, varProducts: updatedVarProducts });
  };

  const handleAddArrayItem = (field, item) => {
    setFormData({ ...formData, [field]: [...formData[field], item] });
  };

  const handleAddVarProduct = () => {
    handleAddArrayItem("varProducts", { attribute: [{ key: "", value: "" }], stock: "" });
  };

  const handleAddAttribute = (index) => {
    const updatedVarProducts = [...formData.varProducts];
    updatedVarProducts[index].attribute.push({ key: "", value: "" });
    setFormData({ ...formData, varProducts: updatedVarProducts });
  };

  const handleAddProduct = () => {
    const formattedVarProducts = formData.varProducts.map(({ attribute, stock }) => ({
      attribute: Object.fromEntries(attribute.map(({ key, value }) => [key, value])),
      stock: parseInt(stock, 10),
    }));

    onAddProduct({
      ...formData,
      category: formData.category,
      price: parseFloat(formData.price),
      varProducts: formattedVarProducts,
    });
  };

  return (
    <div className="add-product">
      <div className="dialog">
        <div className="dialog-content">
          <h2>Thêm sản phẩm</h2>
          <input
            type="text"
            placeholder="Tên sản phẩm"
            value={formData.name}
            onChange={handleInputChange("name")}
            className="dialog-input"
          />

          <div className="image-url">
            <h4>Hình ảnh sản phẩm</h4>
            {formData.imageUrls.map((url, index) => (
              <input
                key={index}
                type="text"
                placeholder={`URL hình ảnh ${index + 1}`}
                value={url}
                onChange={(e) => handleArrayChange("imageUrls", index, e.target.value)}
                className="dialog-input"
              />
            ))}
            <button onClick={() => handleAddArrayItem("imageUrls", "")} className="dialog-button">
              Thêm URL hình ảnh
            </button>
          </div>

          <select
            value={formData.category} 
            onChange={handleInputChange("category")} 
            className="dialog-input"
          >
            <option value="">Chọn danh mục</option>
            {categories.map(({ id, name }) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Mô tả sản phẩm"
            value={formData.description}
            onChange={handleInputChange("description")}
            className="dialog-textarea"
          />

          <input
            type="number"
            placeholder="Giá"
            value={formData.price}
            onChange={handleInputChange("price")}
            className="dialog-input"
          />

          <div className="var-product">
            <h4>Thuộc tính sản phẩm</h4>
            {formData.varProducts.map((varProduct, index) => (
              <div key={index} className="var-product-group">
                {varProduct.attribute.map((attr, attrIndex) => (
                  <div key={attrIndex} className="attribute-group">
                    <input
                      type="text"
                      placeholder="Tên thuộc tính"
                      value={attr.key}
                      onChange={(e) =>
                        handleVarProductChange(index, attrIndex, "key", e.target.value)
                      }
                      className="dialog-input"
                    />
                    <input
                      type="text"
                      placeholder="Giá trị thuộc tính"
                      value={attr.value}
                      onChange={(e) =>
                        handleVarProductChange(index, attrIndex, "value", e.target.value)
                      }
                      className="dialog-input"
                    />
                  </div>
                ))}
                <button
                  onClick={() => handleAddAttribute(index)}
                  className="dialog-button"
                >
                  Thêm thuộc tính
                </button>
                <input
                  type="number"
                  placeholder="Số lượng"
                  value={varProduct.stock}
                  onChange={(e) =>
                    handleArrayChange("varProducts", index, {
                      ...varProduct,
                      stock: e.target.value,
                    })
                  }
                  className="dialog-input"
                />
              </div>
            ))}
            <button onClick={handleAddVarProduct} className="dialog-button">
              Thêm biến thể
            </button>
          </div>

          <div className="dialog-actions">
            <button onClick={handleAddProduct} className="dialog-button">
              Thêm
            </button>
            <button onClick={onClose} className="dialog-button">
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;