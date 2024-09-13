import { useForm, SubmitHandler } from 'react-hook-form';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import styles from './CreateExternalContact.module.css';
import { useEffect, useState } from 'react';

interface ICreateExternalContact {
    name: string;
    email: string;
    phone: string;
    supplierId: string;
}

interface ISupplierLoaded {
    id: string;
    supplierName: string;
    supplierAlternateName: string;
    country: string;
}
interface ISupplier {
    supplierId: string;
    supplierName: string;
    supplierAlternateName: string;
    country: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CreateExternalContact = ({rowData, setRowData}: any) => {
    const axiosPrivate = useAxiosPrivate();
    const { register, handleSubmit,formState: { errors }, } = useForm<ICreateExternalContact>()

    const onSubmit: SubmitHandler<ICreateExternalContact> = async (data) => {
        console.log(data)
        try {
            const response = await axiosPrivate.post('/api/supplier/contact',
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
                        name: response.data.newExternalContact.name,
                        email: response.data.newExternalContact.email,
                        phone: response.data.newExternalContact.phone,
                        supplierId: response.data.newExternalContact.supplierId,
                        supplierName: response.data.newExternalContact.Supplier.supplierName,
                    }
                ])
            }
        } catch (err) {
            console.log(err)
        }
    }
    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get('/api/supplier/list');
                console.log(response?.data);
                const allSuppliers = response?.data?.map((supplier: ISupplierLoaded) => ({
                    supplierId: supplier.id,
                    supplierName: supplier.supplierName,
                    supplierAlternateName: supplier.supplierAlternateName,
                    country: supplier.country,
                }))
                console.log(allSuppliers)
                setSuppliers(allSuppliers);

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
        
    }, [axiosPrivate])
    return (
        <section className={styles.createExternalContact}>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={styles.h1}>Create Supplier</h1>
                    <label>Contact Person Name</label>
                    <input {...register("name", {required : true})} />
                    {errors.name?.type === "required" && (
                        <p role="alert">Contact person name is required</p>
                    )}
                    <br />
                    <label>Email</label>
                    <input {...register("email", {required : true})} />
                    {errors.email?.type === "required" && (
                        <p role="alert">Contact person email is required</p>
                    )}
                    <br />
                    <label>Phone</label>
                    <input {...register("phone", {required : true})} />
                    {errors.phone?.type === "required" && (
                        <p role="alert">Contact person phone is required</p>
                    )}

                    {/* Selection of supplier */}
                    <label>Supplier Name</label>
                    {/* <input {...register("productCode", { required: true })} /> */}
                    <select id="supplier-select" {...register("supplierId", { required: true })}>
                        <option value="">--Please choose a Supplier--</option>
                        {
                            suppliers?.map(supplier => (
                                <option key={supplier.supplierId} value={supplier.supplierId}>
                                    {supplier.supplierName}
                                </option>
                            ))
                        }
                    </select>
                    {errors.supplierId?.type === "required" && (
                        <p role="alert">Supplier name is required</p>
                    )}
                    {/* <label>Password</label>
                    <input {...register("password", {required : true})} /> */}
                    <input className={styles.btn} type="submit" />
                </form>
            </div>
        </section>
    );
};

export default CreateExternalContact;