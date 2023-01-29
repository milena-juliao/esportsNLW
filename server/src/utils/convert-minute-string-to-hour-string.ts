export function convertMinuteToHourString(minutesAmount: number){
    const hours = Math.floor(minutesAmount / 60);
    const minutes = minutesAmount % 60;

    return `${String(hours)}:${String(minutes)}`
}