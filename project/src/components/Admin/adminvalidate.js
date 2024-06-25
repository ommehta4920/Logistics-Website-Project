export default function validate(values){
    const errors={};
    const email_pattern= /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    const contact_pattern=/^[6-9]{1}[0-9]{9}/;
    if(values.cust_email===""){
        errors.cust_email="Email is reqired";
    }
    else if(!email_pattern.test(values.cust_email) && values.cust_email!=undefined){
        errors.cust_email="Email isn't in correct format";
    }
    if(values.dri_email===""){
        errors.dri_email="Email is reqired";
    }
    else if(!email_pattern.test(values.dri_email) && values.dri_email!=undefined){
        errors.dri_email="Email isn't in correct format";
    }
    if(values.username===""){
        errors.username="Username is reqired";
    }
    if(values.cust_contact===""){
        errors.contact="Contact is required";
    }
    else if(!contact_pattern.test(values.cust_contact) && values.cust_contact!=undefined){
        errors.cust_contact="Enter a valid number";
    }
    if(values.state_name===""){
        errors.state_name="State name is required";
    }
    if(values.city_name===""){
        errors.city_name="City name is required";
    }
    if(values.state_id===""){
        errors.state_id="State id is required";
    }
    else if(values.state_id == 0){
        errors.state_id="Enter a valid state id";
    }
    if(values.dri_contact===""){
        errors.dri_contact="Cintact is required";
    }
    else if(!contact_pattern.test(values.dri_contact) && values.dri_contact!=undefined){
        errors.dri_contact="Enter a valid number";
    }
    if(values.chassis_no===""){
        errors.chassis_no="Enter Chassis number";
    }
    if(values.veh_no===""){
        errors.veh_no="Vehicle number is needed";
    }
    if(values.veh_desc===""){
        errors.veh_desc="Vehicle name is needed";
    }
    if(values.rent ===""){
        errors.rent="Please provide rent";
    }
    if(values.capacity===""){
        errors.capacity="Please enter capacity";
    }
    return errors;
}