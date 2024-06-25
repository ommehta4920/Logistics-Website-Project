export default function validate(values){
    const errors={};
    const email_pattern= /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
   // const contact_pattern=/^\d{10}$/;
   const contact_pattern=/^[6-9]{1}[0-9]{9}/;
    if(values.fname===""){
        errors.fname="First name is reqired";
    }
    if(values.lname===""){
        errors.lname="Last name is reqired";
    }
    if(values.username===""){
        errors.username="Username is reqired";
    }
    if(values.email===""){
        errors.email="Email is reqired";
    }
    else if(!email_pattern.test(values.email)){
        errors.email="Email isn't correct"
    }
    if(values.gender===""){
        errors.gender="Gender is reqired";
    }
    if(values.password===""){
        errors.password="Password is reqired";
    }
    if(values.cpassword===""){
        errors.cpassword="Confirm password is reqired";
    }
    else if(values.password!==values.cpassword){
        errors.cpassword="This should be same as password";
    }
    if(values.fname===""){
        errors.fname="First name is reqired";
    }
    if(values.contact===""){
        errors.contact="Contact no is reqired";
    }
    else if(!contact_pattern.test(values.contact)){
        errors.contact="Enter a valid number";
    }
    else if(values.contact>9999999999){
        errors.contact="Enter a valid number";
    }
    if(values.address===""){
        errors.address="Address is reqired";
    }

    if(values.area===0){
        errors.area="Area is reqired";
    }
    if(values.license===""){
        errors.license="License no is req";
    }
    return errors;
}