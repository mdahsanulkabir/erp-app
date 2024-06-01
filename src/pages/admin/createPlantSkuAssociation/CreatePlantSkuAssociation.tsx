import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './CreatePlantSkuAssociation.module.css';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useGetAllSkus from '../../../hooks/skus/useGetAllSkus';
import useGetPlants from '../../../hooks/plant/useGetPlants';

interface CreatePlantSkuAssociationFormInput {
    sKUId: string;
    plantId: string;
}

const CreatePlantSkuAssociation = () => {
    const axiosPrivate = useAxiosPrivate();
    const allSkus = useGetAllSkus();
    const plants = useGetPlants();
    console.log("all skus", allSkus)
    const { register, handleSubmit } = useForm<CreatePlantSkuAssociationFormInput>()
    // const { register, handleSubmit, formState: { errors }, } = useForm<CreatePlantSkuAssociationFormInput>()

    const onSubmit: SubmitHandler<CreatePlantSkuAssociationFormInput> = async (data) => {
        console.log(data)
        try {
            const response = await axiosPrivate.post('/plant/sku-association',
                JSON.stringify(data),
            )
            console.log(response?.data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <section className={styles.createPlantSkuAssociation}>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={styles.h1}>Create Plant SKU Assciation</h1>

                    <label>Select SKU</label>
                    {/* <input {...register("productCapacityUnitId", {required : true})} /> */}
                    <select id="unit-select" {...register("sKUId", { required: true })}>
                        <option value="">--Please choose a SKU--</option>
                        {
                            allSkus?.map(sku => (
                                <option key={sku.skuId} value={sku.skuId}>
                                    {sku.skuCode}
                                </option>
                            ))
                        }
                    </select>
                    <br />
                    <label>Select Plant</label>
                    {/* <input {...register("productCapacityUnitId", {required : true})} /> */}
                    <select id="unit-select" {...register("plantId", { required: true })}>
                        <option value="">--Please choose a Plant--</option>
                        {
                            plants?.map(plant => (
                                <option key={plant.id} value={plant.id}>
                                    {plant.plantName}
                                </option>
                            ))
                        }
                    </select>
                    <br /><br />
                    <input className={styles.btn} type="submit" />
                </form>
            </div>
        </section>
    );
};

export default CreatePlantSkuAssociation;