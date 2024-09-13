import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './CreateImportRmRequirementTag.module.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

interface IImportRmRequirementTag {
    importRmRequirementTag: string;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CreateImportRmRequirementTag = ({rowData, setRowData}: any) => {
    const axiosPrivate = useAxiosPrivate();
    const { register, handleSubmit,formState: { errors }, } = useForm<IImportRmRequirementTag>()

    const onSubmit: SubmitHandler<IImportRmRequirementTag> = async (data) => {
        console.log(data)
        try {
            const response = await axiosPrivate.post('/api/mrpImport/tag',
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
                        importRmRequirementTag: response.data.newImportRmRequirementTag.importRmRequirementTag,
                    }
                ])
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <section className={styles.createImportRmRequirementTag}>
            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={styles.h1}>Create Import RM Requirement Tag</h1>
                    <label>Tag Name</label>
                    <input {...register("importRmRequirementTag", {required : true})} />
                    {errors.importRmRequirementTag?.type === "required" && (
                        <p role="alert">Import RM requirement tag is required</p>
                    )}
                    {/* <label>Password</label>
                    <input {...register("password", {required : true})} /> */}
                    <input className={styles.btn} type="submit" />
                </form>
            </div>
        </section>
    );
};

export default CreateImportRmRequirementTag;