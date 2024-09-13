import { useEffect, useState } from "react";
import useAxiosPrivate from "../useAxiosPrivate"

interface IProductSeriesCategory {
    id: string;
    seriesName: string;
}

const useGetProductSeriesCategory = () => {

    const [productSeriesCategories, setProductSeriesCategories] = useState<IProductSeriesCategory[] | null>(null);

    const axiosPrivate = useAxiosPrivate();
    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get('/api/product/productSeries');
                // console.log(response?.data);
                setProductSeriesCategories(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
        
    }, [axiosPrivate])

    return productSeriesCategories;

}

export default useGetProductSeriesCategory;