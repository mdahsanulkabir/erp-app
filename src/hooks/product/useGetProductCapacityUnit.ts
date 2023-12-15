import { useEffect, useState } from "react";
import useAxiosPrivate from "../useAxiosPrivate"

interface ICapacityUnit {
    id: string;
    productCapacityUnit: string;
}

const useGetProductCapacityUnit = () => {

    const [capacityUnits, setCapacityUnits] = useState<ICapacityUnit[] | null>(null);

    const axiosPrivate = useAxiosPrivate();
    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get('/product/getProductCapacityUnit');
                // console.log(response?.data);
                setCapacityUnits(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
        
    }, [axiosPrivate])

    return capacityUnits;

}

export default useGetProductCapacityUnit;