export function capitalizeFirstLetter (string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};

//cuts the last letter, in this case 'S'
export function cutS (string) {
    if (!string) return '';
    return string.slice(0, -1);
};


export function isValidUrl(url){
    // const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/
    const urlRegex = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/
    return urlRegex.test(url);

}

export function isValidCalendlyUrl(url){
    const calendlyRegex = /^https:\/\/calendly\.com\/[\w-]+\/[\w-]+$/;
    return calendlyRegex.test(url);

}

export function isValidDecimal(decimal){
    const decimalRegex = /^\d*\.?\d*$/;
    return decimalRegex.test(decimal);
}

export function isPhoneNumberValid(phoneNumber){
    const phoneNumberRegex = /^\+?[1-9]\d{9,14}$/;
    return phoneNumberRegex.test(phoneNumber);
}