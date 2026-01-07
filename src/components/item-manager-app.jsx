import "./item-manager-app.css"
import { useState, useRef } from "react";

// Required asset imports [cite: 88, 106, 109, 110, 111]
import deleteLogo from '../assets/delete.svg';
import stationaryLogo from '../assets/ink_pen.svg';
import kitchenwareLogo from "../assets/flatware.svg";
import applianceLogo from "../assets/electrical_services.svg";

function ItemManager () {
  // Required states [cite: 69]
  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // States for form inputs
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  // Required ref for item name [cite: 69]
  const itemName = useRef(null);

  // Task 11: Map categories to icons [cite: 108, 109, 110, 111]
  const getCategoryIcon = (cat) => {
    if (cat === "Stationary") return stationaryLogo;
    if (cat === "Kitchenware") return kitchenwareLogo;
    if (cat === "Appliance") return applianceLogo;
    return null;
  };

  const handleAddItem = () => {
    const nameValue = itemName.current.value.trim();

    // Task 6 & 7: Validation logic and error messages [cite: 95, 100]
    if (!nameValue) {
      setErrorMsg("Item name must not be empty"); // [cite: 96, 101]
      return;
    }
    
    // Task 6.2: Case-insensitive duplicate check [cite: 97, 102]
    const isDuplicate = items.some(item => item.name.toLowerCase() === nameValue.toLowerCase());
    if (isDuplicate) {
      setErrorMsg("Item must not be duplicated"); // [cite: 102]
      return;
    }

    if (!category) {
      setErrorMsg("Please select a category"); // [cite: 98, 103]
      return;
    }

    if (price === "" || parseFloat(price) < 0) {
      setErrorMsg("Price must not be less than 0"); // [cite: 99, 104]
      return;
    }

    // Task 8: Auto-generated incremental ID [cite: 105, 140]
    const newItem = {
      id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
      name: nameValue,
      category: category,
      price: parseFloat(price).toFixed(2)
    };

    setItems([...items, newItem]);
    
    // Reset inputs
    itemName.current.value = "";
    setCategory("");
    setPrice("");
    setErrorMsg("");
  };

  // Task 10: Delete record functionality [cite: 107, 135]
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
            {/* Task 3: Render existing items [cite: 89] */}
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

            {/* Task 12: Form at the last row [cite: 85, 112, 139] */}
            <tr>
              <td></td>
              <td>
                <input ref={itemName} type="text" placeholder="Item Name" />
              </td>
              <td>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Select Category</option>
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
                  placeholder="0.00" 
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
         {errorMsg} {/* Display required state [cite: 100, 138] */}
      </div>
    </>
  );
}

export default ItemManager;