import { useEffect, useState } from "react";
import useAxiosPrivate from "../useAxiosPrivate"

interface IProductBase {
    id: string;
    baseProduct: string;
    productCapacityUnitId: string;
    productCapacityUnit: string;
}

const useGetProductBase = () => {

    const [productBases, setProductBases] = useState<IProductBase[] | null>(null);

    const axiosPrivate = useAxiosPrivate();
    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get('/product/productBase');
                // console.log(response?.data);
                setProductBases(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
        
    }, [axiosPrivate])

    return productBases;

}

export default useGetProductBase;