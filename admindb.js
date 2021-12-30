const express= require("express");
const mysql= require("mysql");
const cors=require("cors");

const app=express();
app.use(express.json());
app.use(cors());

const con=mysql.createConnection({
    host:"mindmadetech.in",
    user:"mindmadetech_mindmadetech",
    password:'f&?7&4,081m1',
    database:"mindmadetech_customersupport_database"
});

con.connect((err) =>{
    if(!err)
        console.log('connected successfully');
    else
        console.log('connected failed Error :');
});

//get the admin list
app.get('/api/admin/list',(req,res)=>{
    con.query("SELECT * FROM admin",(err,rows)=>{
        if(!err)
            res.send(rows);
        else
            res.send(err);
    });
});

//get the admin list according to id
app.get('/api/admin/list/:id',(req,res)=>{
    con.query("SELECT * FROM admin where adminId=?",[req.params.id],(err,rows)=>{
        if(!err)
            res.send(rows);
        else
            res.send(err);
    });

});

//validate the admin
app.post("/api/admin/validate",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    
    con.query(
        "SELECT * FROM admin WHERE username= ? AND password= ? ",
        [username,password],(err,result)=>{
            if(err){
                console.log({err:err});
            }
            if(result.length>0){
                res.send(result);
            }else{ 
                res.send({message:"Invalid - Username or Password!"});
            }
    });
});

//get the customer list
app.get('/api/customer/list',(req,res)=>{
    con.query("SELECT * FROM customer",(err,rows)=>{
        if(!err)
            res.send(rows);
        else
            res.send(err);
    });
});

//get the customer list according to id
app.get('/api/customer/list/:id',(req,res)=>{
    con.query("SELECT * FROM customer where usersId=?",[req.params.id],(err,rows)=>{
        if(!err)
            res.send(rows);
        else
            res.send(err);
    });

});


//add new customer 
app.post("/api/customer/new",(req,res)=>{

    const Name=req.body.Name;
    const Username=req.body.Username;
    const Password=req.body.Password;

    con.query(
        "SELECT * FROM customer WHERE Username= ? ",
        [Username],(err,result)=>{
            if(err){
                res.send({err:err});
            }
            if(result.length>0){
                res.send({message:"Username already Exists!"});
            }else{
                con.query(
                    "INSERT INTO customer (Name,Username,Password) VALUES (?,?,?)",
                    [Name,Username,Password],(err,result)=>{
                        if(!err)
                            res.send(result);
                        else
                            res.send(err);
                });
            }
    });
});

//validate the customer
app.post("/api/customer/validate",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    con.query(
        "SELECT * FROM customer WHERE username= ? AND password= ? ",
        [username,password],(err,result)=>{
            if(err){
                res.send({err:err});
            }
            if(result.length>0){
                res.send(result);
            }else{
                res.send({message:"Invalid - Username or Password!"});
            }
    });
});

//update the customer details
app.put('/api/customer/update/:id',(req,res)=>{
    const id= req.params.id;
    const email = req.body.email;
    const phoneno = req.body.phonenumber;
    const address = req.body.address;
    
 
    con.query(
        'UPDATE customer SET Email=?,Phonenumber=?,Address=? WHERE usersId=?',
         [email,phoneno,address,id],(err,result)=>{
            if(!err)
                res.send(result)
            else
                res.send(err)
     })
  });  

//get the customer list based on id
 app.get('/api/customer/list/:id',(req,res)=>{
    con.query("SELECT * FROM customer where usersId=?",[req.params.id],(err,rows)=>{
        if(!err)
            res.send(rows);
        else
            res.send(err);
    });
});

//get the team list
app.get('/api/team/list',(req,res)=>{
    con.query("SELECT * FROM team",(err,rows)=>{
        if(!err)
            res.send(rows);
        else
            res.send(err);
    });
});

//add new team
app.post("/api/team/new",(req,res)=>{

    const Username=req.body.Username;
    const Password=req.body.Password;
    const Team=req.body.Team;

    con.query(
        "SELECT * FROM team WHERE Username= ? ",
        [Username],(err,result)=>{
            if(err){
                res.send({err:err});
            }
            if(result.length>0){
                res.send({message:"Username already Exists!"});
            }else{
                con.query(
                    "INSERT INTO team (Username,Password,Team) VALUES (?,?,?)",
                    [Username,Password,Team],(err,result)=>{
                        if(!err)
                            res.send(result);
                        else
                            res.send(err);
                });
            }
    });
});
// validate team
app.post("/api/team/validate",(req,res)=>{
    const Username=req.body.username;
    const Password=req.body.password;
    
    con.query(
        "SELECT * FROM team WHERE Username= ? AND Password= ? ",
        [Username,Password],(err,result)=>{
            if(err){
                console.log({err:err});
            }
            if(result.length>0){
                res.send(result);
            }else{ 
                res.send({message:"Invalid - Username or Password!"});
            }
    });
});

app.delete("/api/team/delete/:id",(req,res)=>{
    const id=req.params.id;
    
    con.query(
        "DELETE from team WHERE teamId = ?",[id],(err,result)=>{
            if(!err)
            res.send(result);
            else
            res.send(err);
        });
});
app.delete("/api/customer/delete/:id",(req,res)=>{
    const id=req.params.id;
    
    con.query(
        "DELETE from customer WHERE usersId = ?",[id],(err,result)=>{
            if(!err)
            res.send(result);
            else
            res.send(err);
        });
});

//get the ticket list
app.get('/api/tickets/list',(req,res)=>{
    con.query("SELECT * FROM tickets ORDER BY Date DESC",(err,rows)=>{
        if(!err)
            res.send(rows);
        else
            res.send(err);
    });
});

//add new ticket
app.post("/api/tickets/new",(req,res)=>{
    const UserName=req.body.UserName;
    const Email=req.body.Email;
    const Phonenumber=req.body.Phonenumber;
    const DomainName=req.body.DomainName;
    const Date=req.body.Date;
    const Description=req.body.Description;
    
    con.query(
        "INSERT INTO tickets (Username,Email,Phonenumber,DomainName,Date,Description) VALUES (?,?,?,?,?,?)",
        [UserName,Email,Phonenumber,DomainName,Date,Description],(err,result)=>{
            if(!err)
               res.send(result);
            else
                res.send(err);
    });
});

//get the ticket list based on ticket id
app.get('/api/tickets/:id',(req,res)=>{
    con.query("SELECT * FROM tickets WHERE ticketsId=?",[req.params.id],(err,rows)=>{
        if(!err)
            res.send(rows);
        else
            res.send(err);
    });
});

//update the ticket list
app.put('/api/tickets/update/:id',(req,res)=>{
    const Team = req.body.Team;
    const Status = req.body.Status; 
    const ticketsId = req.params.id;
    
    con.query(
        'UPDATE tickets SET Team=?,Status=? WHERE ticketsId=?',
        [Team,Status,ticketsId],(err,rows)=>{
            if(!err){
                res.send(rows);
            }
            else{
                res.send(error);
            }
    });
});


app.listen(3001);
