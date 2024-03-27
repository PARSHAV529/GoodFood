import { Select, Option } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from 'axios'; // Import axios for HTTP requests

export default function PositionedMenuAdmin({ onSelect,defcategory }) {
  const [value, setValue] = useState(""); // Initialize value state to an empty string
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://goodfood-909g.onrender.com/api/categories');
        setCategory(response.data);
        // Set default value to the first category name
        if (response.data.length > 0) {
          console.log(defcategory)
          setValue(defcategory);
          if (onSelect) {
            onSelect(response.data[0]); // Pass the first category object as default value
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleOptionClick = (optionValue, optionId) => {
    setValue(optionValue);
    if (onSelect) {
      onSelect(optionId);
    }
  };

  return (
    <div className="w-1/3">
      <Select size="lg" value={value} className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-3">
          {category.map((cat, index) => (
            <Option key={index} onClick={() => handleOptionClick(cat.name, cat)}>
              {cat.name}
            </Option>
          ))}
        </div>
      </Select>
    </div>
  );
}
