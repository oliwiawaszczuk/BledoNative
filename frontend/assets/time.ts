export const getCurrentDateTime = (): {time: string, date: string} => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString();

    return {"time": `${hours}:${minutes}`, "date": `${day}.${month}.${year}`};
};
