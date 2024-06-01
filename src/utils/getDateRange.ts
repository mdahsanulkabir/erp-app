export const getDatesInRange = (startDate: Date, endDate: Date): Date[] => {
    const datesArray: Date[] = [];
    
    // Ensure both dates are at the start of the day to ignore time part
    const start = new Date(startDate.toISOString().split('T')[0]);
    const end = new Date(endDate.toISOString().split('T')[0]);

    // Add the first date
    const currentDate = start;
    
    while (currentDate <= end) {
        datesArray.push(new Date(currentDate));
        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return datesArray;
}
