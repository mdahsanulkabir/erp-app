import { useEffect, useState } from "react";
import useAxiosPrivate from "../useAxiosPrivate"
import { IRow as ISku } from "../../pages/skus/Skus"

// interface ISku {
//     skuId: string
//     skuCode: string;
//     skuSAPCode: string;
//     productVariantId: string;
//     productVariant: string;
//     productBaseId: string;
//     baseProduct: string;
//     productCapacity: number;
//     productCapacityUnitId: string;
//     seriesCategoryId: string;
//     seriesName: string;
//     feature: string;
//     picture1: string;
//     picture2: string;
//     picture3: string;
//     picture4: string;
//     picture5: string;
//     obsolete: string;
//     comment: string;
// }

const useGetAllSkus = () => {

    const [allSkus, setAllSkus] = useState<ISku[] | null>(null);

    const axiosPrivate = useAxiosPrivate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get('/product/sku');
                console.log(response?.data);
                const skus = response?.data?.map((sku: ISku) => ({
                    skuId: sku.skuId,
                    skuCode: sku.skuCode,
                    skuSAPCode: sku.skuSAPCode,
                    productVariantId: sku.productVariantId,
                    productVariant: sku.productVariant,
                    productBaseId: sku.productBaseId,
                    baseProduct: sku.baseProduct,
                    productCapacity: sku.productCapacity,
                    productCapacityUnitId: sku.productCapacityUnitId,
                    seriesCategoryId: sku.seriesCategoryId,
                    seriesName: sku.seriesName,
                    feature: sku.feature,
                    picture1: sku.picture1,
                    picture2: sku.picture2,
                    picture3: sku.picture3,
                    picture4: sku.picture4,
                    picture5: sku.picture5,
                    obsolete: sku.obsolete,
                    comment: sku.comment,
                }))
                // console.log(skus)
                setAllSkus(skus)

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();

    }, [axiosPrivate])

    return allSkus;

}

export default useGetAllSkus;