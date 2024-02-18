"use client";

import Header from "@/components/Utilities/Header";
import { useEffect, useState } from "react";
import Loading from "../loading";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [cashierData, setCashierData] = useState([])
  const email = 'rama@gmail.com'

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/v1/getUserInfo/${email}`)

      console.log(res)
      if(res.ok){
        const data = await res.json()
        setCashierData(data)
      }

      setIsLoading(false)
    } catch(error) {
      console.log(error)
      setIsLoading(false)
    }
    
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log(cashierData)

  return(
    <div>
      {isLoading ? "Loading" : (

        <h3>{cashierData.body?.name}</h3>
      )}
    </div>
  )
}

export default Page;
