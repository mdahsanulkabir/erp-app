import { useForm, SubmitHandler } from 'react-hook-form';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import styles from './CreateSupplier.module.css';
import { useEffect, useState } from 'react';

interface ICreateSupplier {
    supplierName: string;
    supplierAlternateName: string;
    country: string;
    rmSourceId: string;
}

interface IRmSourceLoaded {
    id: string;
    rmSource: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CreateSupplier = ({rowData, setRowData}: any) => {
    const axiosPrivate = useAxiosPrivate();
    const { register, handleSubmit,formState: { errors }, } = useForm<ICreateSupplier>()

    const onSubmit: SubmitHandler<ICreateSupplier> = async (data) => {
        console.log(data)
        try {
            const response = await axiosPrivate.post('/api/supplier/list',
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
                        rmSourceId: response.data.newSupplier.rmSourceId,
                        rmSource: response.data.newSupplier.RmSource.rmSource
                    }
                ])
            }
        } catch (err) {
            console.log(err)
        }
    }
    const [rmSources, setRmSources] = useState<IRmSourceLoaded[]>([]);
    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get('/api/rm/rmSource');
                console.log(response?.data);
                const allRmSource = response?.data?.map((rmSource: IRmSourceLoaded) => ({
                    rmSourceId: rmSource.id,
                    rmSource: rmSource.rmSource,
                }))
                console.log(allRmSource)
                setRmSources(allRmSource);

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
        
    }, [axiosPrivate])
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
                    
                    {/* Selection of Rm Sources */}
                    <label>Set Rm Source Type</label>
                    <select id="rmSource-select" {...register("rmSourceId", { required: true })}>
                        <option value="">--Please choose a Supplier--</option>
                        {
                            rmSources?.map(rmSource => (
                                <option key={rmSource.id} value={rmSource.id}>
                                    {rmSource.rmSource}
                                </option>
                            ))
                        }
                    </select>
                    {errors.rmSourceId?.type === "required" && (
                        <p role="alert">RM source type is required</p>
                    )}
                    <input className={styles.btn} type="submit" />
                </form>
            </div>
        </section>
    );
};

export default CreateSupplier;