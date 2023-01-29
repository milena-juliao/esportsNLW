export function convertHourStringToMinute(hourString: string){
    const [hours, minutes] = hourString.split(':').map(Number);//Separa a hora dos minutos e coloca eles em um array que transforma seus valores em números.

    const minutesAmount = (hours * 60) + minutes;

    return minutesAmount;
}