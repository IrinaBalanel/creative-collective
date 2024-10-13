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

export function formatDate(date){
    // const formattedDate = date.split("T")[0];
    // return formattedDate;
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',  // full month name
        year: 'numeric',
    });
    return formattedDate;  // returns format like 11 October 2024
}

export function formatTime(time) {
    const formattedTime = new Date(time).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // display time in 24-hour format. if true, 12-hour format
    });
    return formattedTime;
}
