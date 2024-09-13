import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './ProductSourceCategory.module.css';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useGetProductBase from '../../../hooks/product/useGetProductBase';

interface CreateProductSourceCategoryFormInput {
    sourceCategory: string;
    productBaseId: string;
}

const ProductSourceCategory = () => {
    const axiosPrivate = useAxiosPrivate();
    const productBases = useGetProductBase();
    const { register, handleSubmit, formState: { errors }, } = useForm<CreateProductSourceCategoryFormInput>()

    const onSubmit: SubmitHandler<CreateProductSourceCategoryFormInput> = async (data) => {
        console.log(data)
        try {
            const response = await axiosPrivate.post('/api/product/productSourceCategory',
                JSON.stringify(data),
            )
            console.log(response?.data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <section className={styles.productSourceCategory}>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={styles.h1}>Create Product Source Category</h1>
                    <label>Product Source Category</label>
                    <input {...register("sourceCategory", { required: true })} />
                    {errors.sourceCategory?.type === "required" && (
                        <p role="alert">Product Source Category is required</p>
                    )}
                    <select id="productBaseId-select" {...register("productBaseId", {required : true})}>
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
                    <input className={styles.btn} type="submit" />
                </form>
            </div>
        </section>
    );
};

export default ProductSourceCategory;