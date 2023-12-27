const INRFormate = (x) => {
    // x=x.toString();
    // var lastThree = x.substring(x.length-3);
    // var otherNumbers = x.substring(0,x.length-3);
    // if(otherNumbers != '')
    //     lastThree = ',' + lastThree;
    // var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        // return "₹"+res;

    const options = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      };
    const formatted = Number(x).toLocaleString('en', options);
    return "₹"+formatted;
}

const Currency = {
    INRFormate
}

export default Currency
