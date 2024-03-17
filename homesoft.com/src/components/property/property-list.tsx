import { useEffect, useState } from "react"
import { getApiV1Instance } from "../../utils/axios-instance"

const PropertyList = ()=>{
    const [properties, setProperties] = useState([])

    const getProperties = async()=>{
        try{
            const propertiesRes = await getApiV1Instance().get('/properties/public/')
        }catch(err){

        }
    }
    useEffect(()=>{

    },[])
}
export default PropertyList