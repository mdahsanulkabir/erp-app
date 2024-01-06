import { useForm, SubmitHandler } from 'react-hook-form';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import styles from './CreateSupplier.module.css';

interface ICreateSupplier {
    supplierName: string;
    supplierAlternateName: string;
    country: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CreateDepartment = ({rowData, setRowData}: any) => {
    const axiosPrivate = useAxiosPrivate();
    const { register, handleSubmit,formState: { errors }, } = useForm<ICreateSupplier>()

    const onSubmit: SubmitHandler<ICreateSupplier> = async (data) => {
        console.log(data)
        try {
            const response = await axiosPrivate.post('/supplier/list',
                JSON.stringify(data),
                // {
                //     headers: { 'Content-Type': 'application/json' },
                // }
            )
            console.log("saved Data", response?.data)
            if(response.status === 201) {
                setRowData([
                    ...rowData,
                    {
                        sl: rowData.length+1,
                        supplierName: response.data.newSupplier.supplierName,
                        supplierAlternateName: response.data.newSupplier.supplierAlternateName,
                        country: response.data.newSupplier.country,
                    }
                ])
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <section className={styles.createSupplier}>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={styles.h1}>Create Supplier</h1>
                    <label>Supplier Name</label>
                    <input {...register("supplierName", {required : true})} />
                    {errors.supplierName?.type === "required" && (
                        <p role="alert">Supplier name is required</p>
                    )}
                    <br />
                    <label>Supplier Alternate Name</label>
                    <input {...register("supplierAlternateName", {required : true})} />
                    {errors.supplierAlternateName?.type === "required" && (
                        <p role="alert">Supplier alternate name is required</p>
                    )}
                    <br />
                    <label>Supplier Country</label>
                    <input {...register("country", {required : true})} />
                    {errors.country?.type === "required" && (
                        <p role="alert">Supplier country is required</p>
                    )}
                    {/* <label>Password</label>
                    <input {...register("password", {required : true})} /> */}
                    <input className={styles.btn} type="submit" />
                </form>
            </div>
        </section>
    );
};

export default CreateDepartment;