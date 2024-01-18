"use client"

const { useState } = require("react")

const Page = () => {
    const [name, setName] = useState()
    const [price, setPrice] = useState()

    const handleAddMenu = async(event) => {
        event.preventDefault()
        
        const data = {name, price}

        const response = await fetch("/api/v1/addMenu", {
            method: "POST",
            body: JSON.stringify(data)
        })
    }

    return(
        <>
            <form onSubmit={handleAddMenu}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)}/>
                </label>
                <label>
                    Name:
                    <input type="number" value={price} onChange={(event) => setPrice(event.target.value)}/>
                </label>
                <br />
                <button type="submit">Send</button>
            </form>
        </>
    )
}

export default Page