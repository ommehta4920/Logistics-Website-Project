export default function validate(values){
    const errors={};
    const email_pattern= /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    const contact_pattern=/^[6-9]{1}[0-9]{9}/;
    if(values.first_name===""){
        errors.fname="First name is required";
    }
    if(values.last_name===""){
        errors.lname="Last name is required";
    }
    if(values.username===""){
        errors.username="Username is required";
    }
    if(values.dri_email===""){
        errors.email="Email is required";
    }
    else if(!email_pattern.test(values.dri_email)){
        errors.email="Enter email in correct form";
    }
    if(values.dri_contact===""){
        errors.contact="Contact No is required";
    }
    else if(!contact_pattern.test(values.dri_contact)){
        errors.contact="Enter a valid number";
    }
    if(values.gender===""){
        errors.gender="Genedr is required";
    }
    if(values.password===""){
        errors.password="Password is required";
    }
    if(values.address===""){
        errors.address="Address is required";
    }
    if(values.area===""){
        errors.area="Area is required";
    }
    if(values.dri_license===""){
        errors.license="License no is required";
    }
    return errors;
}