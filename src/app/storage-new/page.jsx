"use client";

import { useEffect, useState } from "react";

const Page = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch("/api/v1/readMenu");

    if (response.ok) {
      const data = await response.json();
      setMenuItems(data);
    }

    setIsLoading(false);
  };

  const handleAddMenu = async (event) => {
    event.preventDefault();

    if (!name || !price) {
      alert("Please fill in all required fields");
      return;
    } else {
      const data = { name, price: parseInt(price, 10) };

      const response = await fetch("/api/v1/addMenu", {
        method: "POST",
        body: JSON.stringify(data),
      });

      setName("");
      setPrice("");

      if (response.ok) {
        fetchData();
      }
    }
  };

  const handleDeleteMenu = async (id) => {
    const response = await fetch("/api/v1/deleteMenu", {
      method: "DELETE",
      body: id,
    });

    if (response.ok) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      
    </div>
  );
};

export default Page;
