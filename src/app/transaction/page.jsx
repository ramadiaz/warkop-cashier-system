"use client";

import Header from "@/components/Utilities/Header";
import SmallLoading from "@/components/Utilities/SmallLoading";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";

const Page = () => {
  const [formData, setFormData] = useState({
    menuId: "",
    quantity: "",
    total: "",
  });
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('')

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch("/api/v1/readMenu");

    if (response.ok) {
      const data = await response.json();
      setMenuItems(data);
      console.log(menuItems)
    }

    setIsLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredMenuItems = menuItems.body?.filter((menuItem) => {
    return (
      menuItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      menuItem.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      menuItem.stock.toString().includes(searchTerm) ||
      menuItem.price.toString().includes(searchTerm)
    );
  });


  
  const options = filteredMenuItems?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <div className="transaction ">
      {isLoading ? (
        <SmallLoading />
      ) : (
        <div className="flex flex-col min-h-screen max-h-screen overflow-y-hidden">
          <Header title={`Transaction`} />
          <div className="flex-grow">
            
            <form>
              <ReactSelect options={options}></ReactSelect>
              <input
                placeholder="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
              />
            </form>
          </div>
          <div className="total-panel h-14 bg-emerald-500 bg-gradient-to-r from-neutral-900 from-10%"></div>
        </div>
      )}
    </div>
  );
};

export default Page;
