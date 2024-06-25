const express= require("express");
const mysql= require("mysql");
const cors= require("cors");
const cookieParser = require("cookie-parser");
const jwt= require("jsonwebtoken");
const multer= require("multer");
const path= require("path");
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173"],
    method:["POST","GET"],
    credentials: true
}));
app.use(express.static('uploads'));
const con=mysql.createConnection({
        user: "root",
        host: "localhost",
        password: "",
        port:"3307",
        database: "swift_db",
    }
)
app.post('/register',(req,res) =>{
    const fname=req.body.fname;
    const lname=req.body.lname;
    const username=req.body.username;
    const email=req.body.email;
    const gender=req.body.gender;
    const contactno=req.body.contact;
    const password=req.body.password;
    const address=req.body.address;
    const area=req.body.area;
    const q="INSERT INTO customer (`first_name`,`last_name`,`username`,`gender`,`cust_email`,`address`,`cust_contact`,`password`,`is_admin`,`otp`,`otp_used`,`area_id`) VALUES(?)";
    const values=[fname,lname,username,gender,email,address,contactno,password,0,null,null,area];
    const qy="SELECT * FROM customer where cust_email=?";
    con.query(qy,[email],(err,result)=>{
        if(result.length>0){
            res.send({message: "Email already exist"})
        }
        else{
            con.query(q,[values],(err,result) =>{
                if(result){
                    res.send(result);
                }
                else{
                    res.send({message: "Enter correct asked details"})
                }
            });
        }
    });
})
app.post('/drregister',(req,res) =>{
    const fname=req.body.fname;
    const lname=req.body.lname;
    const username=req.body.username;
    const email=req.body.email;
    const gender=req.body.gender;
    const contactno=req.body.contact;
    const password=req.body.password;
    const address=req.body.address;
    const area=req.body.area;
    const license=req.body.license;
    const q="INSERT INTO driver (`first_name`,`last_name`,`username`,`gender`,`dri_email`,`password`,`dri_contact`,`dri_license`,`is_available`,`otp`,`otp_used`,`address`,`area`) VALUES(?)";
    const values=[fname,lname,username,gender,email,password,contactno,license,null,null,null,address,area];
    const qy="SELECT * FROM driver where dri_email=?";
    con.query(qy,[email],(err,result)=>{
        if(result.length>0){
            res.send({message: "Email already exist"})
        }
        else{
            con.query(q,[values],(err,result) =>{
                if(result){
                    res.send(result);
                }
                else{
                    res.send({message: "Enter correct asked details"})
                }
            });
        }
    });
})
app.post('/drlogin',(req,res) =>{
    const email=req.body.email;
    const password=req.body.password;
    con.query("SELECT * FROM driver WHERE dri_email= ? and password= ?",[email,password],
    (err,result)=>{
        if(err){
            res.setEncoding({err : err});
        }
        else{
            if(result.length>0){
                const name=result[0].username;
                const id=result[0].dri_id;
                const token= jwt.sign({name,id}, "our-jsonwebtoken-driversecret-key", {expiresIn:'1d'});
                res.cookie('drtoken',token);
                return res.json({Status: "Success"});
            }
            else{
                res.send({message: " Incorrect email or password"});
            }
        }
    }
)
})
app.post('/alogin',(req,res) =>{
    const email=req.body.email;
    const password=req.body.password;
    con.query("SELECT * FROM customer WHERE cust_email= ? and password= ? and is_admin=1",[email,password],
    (err,result)=>{
        if(err){
            res.setEncoding({err : err});
        }
        else{
            if(result.length>0){
                const name=result[0].username;
                const token= jwt.sign({name}, "our-jsonwebtoken-secret-key", {expiresIn:'1d'});
                res.cookie('token',token);
                return res.json({Status: "Success"});
            }
            else{
                res.send({message: " Incorrect email or password"});
            }
        }
    }
)
})
app.post('/login',(req,res) =>{
    const email=req.body.email;
    const password=req.body.password;
    con.query("SELECT * FROM customer WHERE cust_email= ? and password= ? and is_admin!=1",[email,password],
    (err,result)=>{
        if(err){
            res.setEncoding({err : err});
        }
        else{
            if(result.length>0){
                const name=result[0].username;
                const id=result[0].cust_id;
                const token= jwt.sign({name,id}, "our-jsonwebtoken-loginsecret-key", {expiresIn:'1d'});
                res.cookie('ultoken',token);
                return res.json({Status: "Success"});
            }
            else{
                res.send({message: " Incorrect email or password"});
            }
        }
    }
)
})
app.get('/ahcount',(req,res) =>{
    con.query("SELECT COUNT(*) as cnt FROM customer",(err,result)=>{
        if(result){
            const count=result[0].cnt;
            res.send({count,Status: "Success"});
        }
        else{
            res.send({Message: "Error happened"});
        }
    })
})
app.get('/bkcount',(req,res) =>{
    con.query("SELECT COUNT(*) as count FROM booking",(err,result)=>{
        if(result){
            const count=result[0].count;
            res.send({count,Status: "Success"});
        }
        else{
            res.send({Message: "Error happened"});
        }})
})
app.get('/vhcount',(req,res) =>{
    con.query("SELECT COUNT(*) as cnt FROM vehicle_details",(err,result)=>{
        if(result){
            const count=result[0].cnt;
            res.send({count,Status: "Success"});
        }
        else{
            res.send({Message: "Error happened"});
        }
    })
})
const verifyadmin =(req,res,next) =>{
    const token=req.cookies.token;
    if(!token){
        return res.json({Message: "We need token."})
    }
    else{
        jwt.verify(token,"our-jsonwebtoken-secret-key",(err,decoded)=>{
            if(err){
                return res.json({Message: "Authentication failed."})
            }
            else{
                req.name= decoded.name;
                next();
            }
        })
    }
}
app.get("/",verifyadmin,(req,res) =>{
    return res.json({Status: "Success",name: req.name});
})
const verifyuser =(req,res,next) =>{
    const token=req.cookies.ultoken;
    if(!token){
        return res.json({Message: "We need token."})
    }
    else{
        jwt.verify(token,"our-jsonwebtoken-loginsecret-key",(err,decoded)=>{
            if(err){
                return res.json({Message: "Authentication failed."})
            }
            else{
                req.name= decoded.name;
                req.id=decoded.id;
                next();
            }
        })
    }
}
app.get("/userstatus",verifyuser,(req,res) =>{
    return res.json({Status: "Success",name: req.name,id: req.id});
})
const verifydriver =(req,res,next) =>{
    const token=req.cookies.drtoken;
    if(!token){
        return res.json({Message: "We need token."})
    }
    else{
        jwt.verify(token,"our-jsonwebtoken-driversecret-key",(err,decoded)=>{
            if(err){
                return res.json({Message: "Authentication failed."})
            }
            else{
                req.name= decoded.name;
                req.id= decoded.id;
                next();
            }
        })
    }
}
app.get("/dristatus",verifydriver,(req,res) =>{
    return res.json({Status: "Success",name: req.name,id: req.id});
})
app.get('/userlogout',(req,res)=>{
    res.clearCookie('ultoken');
    return res.json({Status: "Success"});
})
app.get('/drlogout',(req,res)=>{
    res.clearCookie('drtoken');
    return res.json({Status: "Success"});
})
app.get('/adminlogout',(req,res)=>{
    res.clearCookie('token');
    return res.json({Status: "Success"});
})
app.post('/admintable',(req,res)=>{
    const fetch=req.body.fetch;
    let q ='';
    if(fetch ==='customer'){
     q= "SELECT * FROM customer";
    }
    else if(fetch === 'driver'){
    q= "SELECT * FROM driver";
    }
    else if(fetch === 'city'){
        q="SELECT * FROM city";
    }
    else if(fetch === 'state'){
        q="SELECT * FROM state";
    }
    else if(fetch === 'vehicle'){
        q="SELECT * FROM vehicle_details";
    }
    else if(fetch === 'feedback'){
        q="SELECT * FROM feedback";
    }
    else if(fetch === 'booking'){
        q="SELECT * FROM booking";
    }
    con.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.send(data);
    })
})
app.post('/adtdetails',(req,res)=>{
    const role=req.body.role;
    const did=req.body.did;
    let q;
    if(role === "driver"){
        q="SELECT * FROM driver WHERE dri_id=?";
    }
    else if(role === "customer"){
        q="SELECT * FROM customer WHERE cust_id=?";
    }
    else if(role ==="state"){
        q="SELECT * FROM state WHERE state_id=?";
    }
    else if(role === "city"){
        q="SELECT * FROM city WHERE city_id=?";
    }
    else if(role ==="vehicle"){
        q="SELECT * FROM vehicle_details WHERE veh_id=?";
    }
    else if(role =="vehicle_details"){
        q="SELECT * FROM vehicle_details WHERE dri_id=?";
    }
    con.query(q,[did],(err,data)=>{
        if(err) return res.json(err);
        return res.send(data[0]);
    })
})
app.post('/bookdetails',(req,res)=>{
    const role=req.body.role;
    const did=req.body.did;
    let q;
    if(role === "booking"){
        q="SELECT *FROM booking WHERE cust_id=?"
    }
    con.query(q,[did],(err,data)=>{
        if(err) return res.json(err);
        return res.send(data);
    })
})
app.post('/booking',(req,res)=>{
    const id=req.body.id;
    const date=req.body.date;
    const pickup=req.body.pickup;
    const drop=req.body.drop;
    const dist=req.body.dist;
    const price=req.body.price;
    const q="SELECT * FROM driver WHERE is_available= ?";
    con.query(q,[1],(err,result)=>{
        if(err) return res.json(err);
        else{
            if(result.length==0)
                return res.json({Message:"No driver available"})
            const driid=result[0].dri_id;
            const vehid=result[0].alloted_vehicle;
            //console.log(driid,vehid,id,date,pickup,drop,dist,price);
            const qy="INSERT INTO booking (`book_date_time`,`pickup_address`,`drop_address`,`approx_km`,`amount`,`payment_status`,`cust_id`,`dri_id`,`veh_id`,`otp`,`payment_type`) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
            con.query(qy,[date,pickup,drop,dist,price,0,id,driid,vehid,null,1],(err,data)=>{
                if(err) return res.json(err);
                else return res.send({Status : "Success"});
            })
        }
    })
})
app.post('/driavailable', (req, res) => { 
    let is_available = req.body.is_available 
    let dri_id = req.body.dri_id 
    // console.log(" is_available : "+is_available+"\n dri_id : "+dri_id) 
    let q="UPDATE driver SET is_available = "+is_available+" WHERE dri_id = "+dri_id; 
 
    con.query(q, (err, data) => { 
        if(err) return res.json(err); 
        return res.json({message:"Status upadated successfully!"});
    })
})
app.put("/update/:id",(req,res)=>{
    const id=req.params.id;
    role=req.body.role;
    let q;
    let values;
    const olddri=req.body.olddri;
    console.log("olddri",olddri);
    if(role==="vehicle"){
        q="UPDATE vehicle_details SET chassis_no=?,veh_no=?,veh_desc=?,rent=?,capacity=?,dri_id=? WHERE veh_id=?";
        values=[
            req.body.chassis,
            req.body.vehno,
            req.body.vehname,
            req.body.rent,
            req.body.capacity,
            req.body.dri_id,
            req.params.id,
        ]
        con.query(q,[...values],(err,data)=>{
            if(err) return res.json(err);
            else{
                if(req.body.dri_id === null && olddri!== null){
                    const qu="UPDATE driver SET alloted_vehicle=? WHERE dri_id=?";
                     con.query(qu,[null,olddri],(err,result)=>{
                    if(err) return res.send({Message:"Could not update drivertable"});
                    return res.send({Message: "Success"});
                    })
                }
                else{
                    const qy="UPDATE driver SET alloted_vehicle=? WHERE dri_id=?";
                    con.query(qy,[req.params.id,req.body.dri_id],(err,result)=>{
                    if(err) return res.send({Message:"Could not update drivertable"});
                    return res.send({Message: "Success"});
                })}
            }
        })
    }
    else{
    if(role==="state"){
        q="UPDATE state SET state_name=? WHERE state_id=?";
        values=[
            req.body.state_name,
            req.params.id
        ]
    }
    if(role==="city"){
        q="UPDATE city SET city_name=?,state_id=? WHERE city_id=?";
        values=[
            req.body.city_name,
            req.body.state_id,
            req.params.id
        ]
    }
    if(role==="customer"){
        q="UPDATE customer SET username=?,cust_email=?,cust_contact=? WHERE cust_id=?";
        values=[
            req.body.username,
            req.body.cust_email,
            req.body.cust_contact,
            req.params.id,
        ]
    }
    if(role==="driver"){
        q="UPDATE driver SET username=?,dri_email=?,dri_contact=? WHERE dri_id=?";
        values=[
            req.body.username,
            req.body.dri_email,
            req.body.dri_contact,
            req.params.id,
        ]
    }
    con.query(q,[...values],(err,data)=>{
        if(err) return res.json(err);
        return res.send({Status: "Success"});
    })}
})
app.delete('/stdelete/:id',(req,res)=>{
    const id=req.params.id;
    const q="DELETE FROM state WHERE state_id=?";
    con.query(q,[id],(err,data)=>{
        if(err) return res.json(err);
        return res.send({Message: "Success"});
    })
})
app.delete('/ctdelete/:id',(req,res)=>{
    const id=req.params.id;
    const q="DELETE FROM city WHERE city_id=?";
    con.query(q,[id],(err,data)=>{
        if(err) return res.json(err);
        return res.send({Message: "Success"});
    })
})
app.delete('/cusdelete/:id',(req,res)=>{
    const id=req.params.id;
    const q="DELETE FROM customer WHERE cust_id=?";
    con.query(q,[id],(err,data)=>{
        if(err) return res.json(err);
        return res.send({Message: "Success"});
    })
})
app.delete('/vehdelete/:id',(req,res)=>{
    const id=req.params.id;
    const q="DELETE FROM vehicle_details WHERE veh_id=?";
    con.query(q,[id],(err,data)=>{
        if(err) return res.json(err);
        return res.send({Message: "Success"});
    })
})
app.delete('/dridelete/:id',(req,res)=>{
    const id=req.params.id;
    const q="DELETE FROM driver WHERE dri_id=?";
    con.query(q,[id],(err,data)=>{
        if(err) return res.json(err);
        return res.send({Message: "Success"});
    })
})
app.put("/updatedriver",(req,res)=>{
    const id=req.body.id
    const fname=req.body.fname;
    const lname=req.body.lname;
    const username=req.body.username;
    const email=req.body.email;
    const gender=req.body.gender;
    const contactno=req.body.contact;
    const password=req.body.password;
    const address=req.body.address;
    const area=req.body.area;
    const license=req.body.license;
    const q="UPDATE driver SET first_name=?,last_name=?,username=?,gender=?,dri_email=?,password=?,dri_contact=?,dri_license=?,address= ?,area= ? WHERE dri_id= "+id;
    con.query(q,[fname,lname,username,gender,email,password,contactno,license,address,area],(err,data)=>{
        if(err) return res.json(err);
        else{
        return res.send({Status: "Success"});
        }
    })
})
app.put("/updatecust",(req,res)=>{
    const id=req.body.id
    const fname=req.body.fname;
    const lname=req.body.lname;
    const username=req.body.username;
    const email=req.body.email;
    const gender=req.body.gender;
    const contactno=req.body.contact;
    const password=req.body.password;
    const address=req.body.address;
    const area=req.body.area;
    const q="UPDATE customer SET first_name=?,last_name=?,username=?,gender=?,cust_email=?,password=?,cust_contact=?,address= ?,area_id= ? WHERE cust_id= "+id;
    con.query(q,[fname,lname,username,gender,email,password,contactno,address,area],(err,data)=>{
        if(err) return res.json(err);
        else{
        return res.send({Status: "Success"});
        }
    })
})
app.post('/insert',(req,res)=>{
    const role=req.body.role;
    let values;let q;
    if(role==="state"){
        q="INSERT INTO state (`state_name`) VALUES (?)";
        values=[
            req.body.state,
        ]
    }
    if(role==="city"){
        q="INSERT INTO city (`city_name`,`state_id`) VALUES (?,?)";
        values=[
            req.body.city,
            req.body.stateid,
        ]
    }
    con.query(q,[...values],(err,data)=>{
        if(err) return res.json(err);
        else{
        return res.send({Message: "Success"});
        }
    })
})
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb) =>{
        cb(null,file.fieldname+"_"+Date.now()+ path.extname(file.originalname));
    }
})
// const isImage=(req,file,cb)=>{
//     if(file.mimetype.startswith("image")){
//         cb(null,true)
//     }
//     else{
//         cb(null,Error("only image is allowed"))
//     }
// }
const upload=multer({
    storage:storage
})
app.post('/insvehdet',upload.single('image'),(req,res)=>{
        const image=req.file.filename;
        const chassis=req.body.chassis;
        const vehno=req.body.vehno;
        const vehname=req.body.vehname;
        const driid=req.body.driid;
        const rent=req.body.rent;
        const capacity=req.body.capacity;
        // console.log("dri",driid);
        if(!driid){
        const q="INSERT INTO vehicle_details (`veh_no`,`chassis_no`,`rent`,`veh_desc`,`capacity`,`size`,`dri_id`,`veh_image`) VALUES(?)";
        const values=[vehno,chassis,rent,vehname,capacity,null,null,image];
        con.query(q,[values],(err,data)=>{ 
            if(err) return res.send({Message: "Error1"});
            return res.send({Status: "Success"});
        })}
        else{
            const q="INSERT INTO vehicle_details (`veh_no`,`chassis_no`,`rent`,`veh_desc`,`capacity`,`size`,`dri_id`,`veh_image`) VALUES(?)";
            const values=[vehno,chassis,rent,vehname,capacity,null,driid,image];
            con.query(q,[values],(err,data)=>{ 
                if(err) {
                    return res.send(err);}
                else{
                    if(!data) return res.json(data); 
                    return res.send({Status: "Success"});}
            }) 
        }
})
app.listen(8800,() =>{
    console.log("Connected to backend!");
})