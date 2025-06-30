import HeaderAddress from "../components/HeaderAddress"
import ListAddress from "../components/ListAddress"
import axios from "axios"
import { useEffect, useState } from "react"

const Address = () => {
  const [listAddress, setListAddress] = useState([])
  const linkUrlApiGetAllAddress = "http://localhost:3000/api/v1/address/get-all-address"

  const isFetchApiData = async () => {
    try {
      const result = await axios.get(linkUrlApiGetAllAddress, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      setListAddress(result.data?.listAddress)
    } catch (error) {
      console.log(error.response?.data?.message)
    }
  }

  useEffect(() => {
    isFetchApiData()
  }, [])
  return (
    <div className="w-[80%] p-10 shadow-lg shadow-Gray/30 border border-gray-100 rounded-md">
        <HeaderAddress isFetchApiData={isFetchApiData} />
        <ListAddress isFetchApiData={isFetchApiData} listAddress={listAddress}/>
    </div>
  )
}

export default Address