"use client";

const { useState, useEffect } = require("react");

const Page = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
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

    const data = { name, price };

    const response = await fetch("/api/v1/addMenu", {
      method: "POST",
      body: JSON.stringify(data),
    });

    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <form onSubmit={handleAddMenu}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Name:
          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Send</button>
      </form>

      {isLoading ? (
        "Loading"
      ) : (
        <div>
          {menuItems.body?.map((menuItem, index) => {
            return (
              <div key={index} className="flex flex-row gap-40">
                <h1 className="basis-1/2">{menuItem.name}</h1>
                <h2 className="basis-1/2">{menuItem.price}</h2>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Page;
