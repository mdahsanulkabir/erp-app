import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './Sku.module.css';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useGetProductBase from '../../../hooks/product/useGetProductBase';
import useGetProductVariant from '../../../hooks/product/useGetProductVariant';
import { useState } from 'react';
import useGetProductSeriesCategory from '../../../hooks/product/useGetProductSeriesCategory';

interface CreateSKUFormInput {
    skuCode: string;
    productVariantId: string;
    productBaseId: string;
    productCapacity: string;
    seriesCategoryId: string;
    feature?: Record<string, string | number> | null;
    picture1?: string | null;
    picture2?: string | null;
    picture3?: string | null;
    picture4?: string | null;
    picture5?: string | null;

}

const Sku = () => {
    const axiosPrivate = useAxiosPrivate();
    const productBases = useGetProductBase();
    const productVariants = useGetProductVariant();
    const productSeriesCategories = useGetProductSeriesCategory();
    const [selectedProductBaseId, setSelectedProductBaseId] = useState<string | undefined>(undefined);
    const { register, handleSubmit, formState: { errors }, } = useForm<CreateSKUFormInput>();



    const onSubmit: SubmitHandler<CreateSKUFormInput> = async (data) => {
        console.log(data)
        try {
            const response = await axiosPrivate.post('/product/sku',
                JSON.stringify(data),
            )
            console.log(response?.data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <section className={styles.sku}>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={styles.h1}>Create SKU</h1>

                    <label>SKU</label>
                    <input {...register("skuCode", { required: true })} />
                    {errors.skuCode?.type === "required" && (
                        <p role="alert">SKU is required</p>
                    )}
                    
                    <select id="productVariantId-select" {...register("productVariantId", {required : true})}>
                        <option value="">--Please choose a product variant--</option>
                        {
                            productVariants?.map(productVariant => (
                                <option key={productVariant.id} value={productVariant.id}>
                                    {productVariant.productVariant}
                                </option>
                            ))
                        }
                    </select>
                    {errors.productVariantId?.type === "required" && (
                        <p role="alert">Product Variant is required</p>
                    )}

                    <br />
                    <select id="productBaseId-select" {...register("productBaseId", {required : true})}
                        onChange={e => setSelectedProductBaseId(e.target.value)}
                    >
                        <option value="">--Please choose a product base--</option>
                        {
                            productBases?.map(productBase => (
                                <option key={productBase.id} value={productBase.id}>
                                    {productBase.baseProduct}
                                </option>
                            ))
                        }
                    </select>
                    {errors.productBaseId?.type === "required" && (
                        <p role="alert">Product Base is required</p>
                    )}
                    <br />
                    <select id="productSeriesId-select" {...register("seriesCategoryId", {required : true})}>
                        <option value="">--Please choose a product series category--</option>
                        {
                            productSeriesCategories?.map(productSeriesCategory => (
                                <option key={productSeriesCategory.id} value={productSeriesCategory.id}>
                                    {productSeriesCategory.seriesName}
                                </option>
                            ))
                        }
                    </select>
                    {errors.seriesCategoryId?.type === "required" && (
                        <p role="alert">Product Series is required</p>
                    )}
                    
                    <br />
                    {
                        selectedProductBaseId && 
                            <>
                                <label>Capacity</label>
                                <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
                                    <input type='number' style={{width: '100px'}} {...register("productCapacity", { required: true })} />
                                    <p> Unit {productBases?.find(productBase => productBase.id === selectedProductBaseId)?.productCapacityUnit}</p>
                                </div>
                            </>
                    }
                    {errors.productCapacity?.type === "required" && (
                        <p role="alert">Product Capacity is required</p>
                    )}
                    
                    <input className={styles.btn} type="submit" />
                </form>
            </div>
        </section>
    );
};

export default Sku;