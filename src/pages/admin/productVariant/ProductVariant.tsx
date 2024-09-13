import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './ProductVariant.module.css';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

interface CreateProductVariantFormInput {
    productVariant: string;
}

const ProductVariant = () => {
    const axiosPrivate = useAxiosPrivate();
    const { register, handleSubmit, formState: { errors }, } = useForm<CreateProductVariantFormInput>()

    const onSubmit: SubmitHandler<CreateProductVariantFormInput> = async (data) => {
        console.log(data)
        try {
            const response = await axiosPrivate.post('/api/product/productVariant',
                JSON.stringify(data),
            )
            console.log(response?.data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <section className={styles.createProductVariant}>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={styles.h1}>Create Product Variant</h1>
                    <label>Product Variant name</label>
                    <input {...register("productVariant", { required: true })} />
                    {errors.productVariant?.type === "required" && (
                        <p role="alert">Product Variant Color is required</p>
                    )}
                    {/* <label>Password</label>
                    <input {...register("password", {required : true})} /> */}
                    <input className={styles.btn} type="submit" />
                </form>
            </div>
        </section>
    );
};

export default ProductVariant;