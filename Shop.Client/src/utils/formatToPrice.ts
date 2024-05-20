export default function formatToPrice(price: number | string) {
    let format = '';
    const fraction = price.toString().split('.')[1];
    price = price.toString().split('.')[0];
    
    for (let i = 1; i < Math.ceil(price.length / 3) + 1; i++) {
        format = format + ' ' + price.split('').reverse().join('').slice(3 * i - 3, 3 * i);
    }
    return format.split('').reverse().join('').substring(0, format.length - 1) + '.' + fraction;
}