import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './ProductBase.module.css';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useGetProductCapacityUnit from '../../../hooks/product/useGetProductCapacityUnit';

interface CreateProductBaseFormInput {
    baseProduct: string;
    productCapacityUnitId: string;
}

const ProductBase = () => {
    const axiosPrivate = useAxiosPrivate();
    const capacityUnits = useGetProductCapacityUnit();
    // console.log(capacityUnits)
    const { register, handleSubmit, formState: { errors }, } = useForm<CreateProductBaseFormInput>()

    const onSubmit: SubmitHandler<CreateProductBaseFormInput> = async (data) => {
        console.log(data)
        try {
            const response = await axiosPrivate.post('/api/product/productBase',
                JSON.stringify(data),
            )
            console.log(response?.data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <section className={styles.productBase}>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={styles.h1}>Create Product Base</h1>
                    <label>Product Base</label>
                    <input {...register("baseProduct", { required: true })} />
                    {errors.baseProduct?.type === "required" && (
                        <p role="alert">Product Base is required</p>
                    )}
                    <label>Capacity Units</label>
                    {/* <input {...register("productCapacityUnitId", {required : true})} /> */}
                    <select id="unit-select" {...register("productCapacityUnitId", {required : true})}>
                        <option value="">--Please choose a unit--</option>
                        {
                            capacityUnits?.map(unit => (
                                <option key={unit.id} value={unit.id}>
                                    {unit.productCapacityUnit}
                                </option>
                            ))
                        }
                    </select>
                    <input className={styles.btn} type="submit" />
                </form>
            </div>
        </section>
    );
};

export default ProductBase;