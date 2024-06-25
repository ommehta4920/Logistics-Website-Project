export default function Validation(values){
    const errors={}
    const email_pattern= /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    if(values.email===""){
        errors.email="Email is reqired";
    }
    else if(!email_pattern.test(values.email)){
        errors.email="Email isn't correct"
    }
    
    if(values.password===""){
        errors.password="Password is required";
    }

    return errors;
}