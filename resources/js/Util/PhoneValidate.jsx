function PhoneValidate(e,number,handleChange) {
    const inputValue = e.target.value;
    if (inputValue.length > number) {
        const requiredValue = inputValue.slice(0, number);
        handleChange(e.target.name,requiredValue);
    } else {
        handleChange(e.target.name,inputValue);
    }
}
export default PhoneValidate;
