import { getDatesInRange } from "../getDateRange";
import { IPlant } from "../../hooks/plant/useGetPlants";

interface ISku {
    skuId: string
    skuCode: string;
    skuSAPCode: string;
    productVariantId: string;
    productVariant: string;
    productBaseId: string;
    baseProduct: string;
    productCapacity: number;
    productCapacityUnitId: string;
    seriesCategoryId: string;
    seriesName: string;
    feature: string;
    picture1: string;
    picture2: string;
    picture3: string;
    picture4: string;
    picture5: string;
    obsolete: string;
    comment: string;
}

interface IProductionRecord {
    comment: string;
    createdAt: string;
    id: string;
    plant: {
        id: string;
        plantCode: number;
        plantName: string;
    }
    plantId: string;
    productionDate: Date;
    quantity: number;
    sKUId: string;
    sku: {
        skuCode: string;
    }
    updateReason: string;
    updatedAt: string;
}

interface IProductionEntry {
    plantName: string;
    skuCode: string;
    quantities: { [date: string]: number };
}

export const createProductionTable = (
    allProductionData: IProductionRecord[] | null | undefined, 
    startDate: Date, 
    endDate: Date, 
    allSkus: ISku[] | null | undefined, 
    plants: IPlant[] | null | undefined): IProductionEntry[] => {
    const productionEntries: IProductionEntry[] = [];
    if (!allProductionData || !allSkus || !plants) return productionEntries; // Return empty array if any of the required parameters is null or undefined
    const dates: Date[] = getDatesInRange(startDate, endDate);

    plants.forEach(plant => {
        const plantSpecificEntries = allProductionData.filter(data => plant.id === data.plantId);
        allSkus.forEach(sku => {
            const skuSpecificEntries = plantSpecificEntries.filter(data => sku.skuId === data.sKUId);
            const quantities = getQuantitiesForDates(skuSpecificEntries, dates).reduce((acc, curr) => {
                acc[curr.date] = curr.quantity
                return acc
            }, {} as { [date: string]: number });
            productionEntries.push({
                plantName: plant.plantName,
                skuCode: sku.skuCode,
                quantities
            });
        });
    });

    return productionEntries;
}

const getQuantitiesForDates = (skuSpecificEntries: IProductionRecord[], dates: Date[]) : {date: string; quantity: number}[] => {
    return dates.map(date => {
        const entry = skuSpecificEntries.find(skuEntry =>
            new Date(skuEntry.productionDate).toISOString().split('T')[0] === date.toISOString().split('T')[0]
        );
        return {date: date.toISOString().split('T')[0], quantity : entry ? entry.quantity : 0};
    });
}