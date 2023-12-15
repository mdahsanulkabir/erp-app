import { useEffect, useState } from "react";
import useAxiosPrivate from "../useAxiosPrivate"

interface IProductVariant {
    id: string;
    productVariant: string;
}

const useGetProductVariant = () => {

    const [productVariants, setProductVariants] = useState<IProductVariant[] | null>(null);

    const axiosPrivate = useAxiosPrivate();
    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get('/product/productVariant');
                // console.log(response?.data);
                setProductVariants(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
        
    }, [axiosPrivate])

    return productVariants;

}

export default useGetProductVariant;