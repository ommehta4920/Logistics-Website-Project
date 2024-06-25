export default function validate(values,date){
    const errors={};
    if(date === ''){
        errors.date="Please Enter a date";
    }
    else{
        const inputdate=new Date(date);
        const todaydate=new Date();
        if(inputdate.setHours(0,0,0,0) < todaydate.setHours(0,0,0,0))
            errors.date="Date should atleast be of today";
    }
    if(values.pickup==='' || values.drop===''){
        errors.pickup="Enter Proper Destination and Pickup";
        errors.drop="Enter Proper Destination and Pickup";
    }
    else if(values.pickup === values.drop){
        errors.pickup="We don't do Intracity Shipments";
        errors.drop="We don't do Intracity Shipments";
    }
    else if(values.pickup!=="ahmedabad"&& values.pickup!=="gandhinagar"&& values.pickup!=="surat"&& values.pickup!=="jaipur"){
        errors.pickup="We dont operate in that city";
    }
    else if(values.drop!=="ahmedabad"&& values.drop!=="gandhinagar" && values.drop!=="surat" && values.drop!=="jaipur"){
        errors.drop="We dont operate in that city";
    }
    return errors;
}