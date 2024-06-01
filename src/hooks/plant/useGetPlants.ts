import { useEffect, useState } from "react";
import useAxiosPrivate from "../useAxiosPrivate"

export interface IPlant {
    id: string;
    plantName: string;
    plantCode: number;
}

const useGetPlants = () => {

    const [plants, setPlants] = useState<IPlant[] | null>(null);

    const axiosPrivate = useAxiosPrivate();
    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get('/plant');
                console.log("get plant data: ",response?.data);
                setPlants(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
        
    }, [axiosPrivate])

    return plants;

}

export default useGetPlants;