import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './ProductSeries.module.css';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

interface CreateProductSeriesFormInput {
    seriesName: string;
}

const ProductSeries = () => {
    const axiosPrivate = useAxiosPrivate();
    const { register, handleSubmit, formState: { errors }, } = useForm<CreateProductSeriesFormInput>()

    const onSubmit: SubmitHandler<CreateProductSeriesFormInput> = async (data) => {
        console.log(data)
        try {
            const response = await axiosPrivate.post('/product/productSeries',
                JSON.stringify(data),
            )
            console.log(response?.data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <section className={styles.createProductSeries}>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={styles.h1}>Create Product Series</h1>
                    <label>Product Series name</label>
                    <input {...register("seriesName", { required: true })} />
                    {errors.seriesName?.type === "required" && (
                        <p role="alert">Product Series is required</p>
                    )}
                    {/* <label>Password</label>
                    <input {...register("password", {required : true})} /> */}
                    <input className={styles.btn} type="submit" />
                </form>
            </div>
        </section>
    );
};

export default ProductSeries;