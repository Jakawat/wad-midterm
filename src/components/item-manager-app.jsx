import "./item-manager-app.css"
import { useState, useRef } from "react";

import deleteLogo from '../assets/delete.svg';
import stationaryLogo from '../assets/ink_pen.svg';
import kitchenwareLogo from "../assets/flatware.svg";
import applianceLogo from "../assets/electrical_services.svg";

function ItemManager () {
  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const itemName = useRef(null);

  const getCategoryIcon = (cat) => {
    if (cat === "Stationary") return stationaryLogo;
    if (cat === "Kitchenware") return kitchenwareLogo;
    if (cat === "Appliance") return applianceLogo;
    return null;
  };

  const handleAddItem = () => {
    const nameValue = itemName.current.value.trim();

    if (!nameValue) {
      setErrorMsg("Item name must not be empty");
      return;
    }
    
    const isDuplicate = items.some(item => item.name.toLowerCase() === nameValue.toLowerCase());
    if (isDuplicate) {
      setErrorMsg("Item must not be duplicated");
      return;
    }

    if (!category) {
      setErrorMsg("Please select a category");
      return;
    }

    if (price === "" || parseFloat(price) < 0) {
      setErrorMsg("Price must not be less than 0");
      return;
    }

    const newItem = {
      id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
      name: nameValue,
      category: category,
      price: parseFloat(price).toFixed(2)
    };

    setItems([...items, newItem]);
    
    itemName.current.value = "";
    setCategory("");
    setPrice("");
    setErrorMsg("");
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <>
      <div id="h1">Item Management</div>
      <div id="data-area">
        <table id="item-table" className="item-table">
          <thead>
            <tr>
              <th id="col-item-id">ID</th>
              <th id="col-item-name">Name</th>
              <th id="col-item-category">Category</th>
              <th id="col-item-price">Price</th>
              <th id="col-item-action">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <img src={getCategoryIcon(item.category)} alt={item.category} width="20" />
                </td>
                <td>{item.price}</td>
                <td>
                  <img 
                    src={deleteLogo} 
                    alt="delete" 
                    style={{cursor: 'pointer'}} 
                    onClick={() => deleteItem(item.id)} 
                  />
                </td>
              </tr>
            ))}

            <tr>
              <td></td>
              <td>
                <input ref={itemName} type="text" placeholder="" />
              </td>
              <td>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value=""></option>
                  <option value="Stationary">Stationary</option>
                  <option value="Kitchenware">Kitchenware</option>
                  <option value="Appliance">Appliance</option>
                </select>
              </td>
              <td>
                <input 
                  type="number" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  placeholder="" 
                />
              </td>
              <td>
                <button onClick={handleAddItem}>Add Item</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="error-message" style={{color: 'red', marginTop: '10px'}}>
         {errorMsg}
      </div>
    </>
  );
}

export default ItemManager;