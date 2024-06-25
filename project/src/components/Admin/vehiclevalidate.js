export default function vehvalidate(chassis,vehno,vehname,rent,capacity,image){
    const errors={};
    if(chassis===0){
        errors.chassis="Enter chassis no.";
    }
    if(vehno===0){
        errors.vehno="Enter vehicle no.";
    }
    if(vehname===""){
        errors.vehname="Enter vehicle name.";
    }
    if(rent===0){
        errors.rent="Enter some rent.";
    }
    if(capacity===0){
        errors.capacity="Enter the capacity.";
    }
    if(image===""){
        errors.image="Enter a image";
    }
    return errors;
}