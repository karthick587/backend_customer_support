const express= require("express");
const mysql= require("mysql");
const cors=require("cors");

const app=express();
app.use(express.json());
app.use(cors());

const con=mysql.createConnection({
   
   host:"p2h.in",
    user:"p2h_kaviyapriya",
    password:'CustomerSupport@mm',
    database:"p2h_mm_customer_support"
});

con.connect((err) =>{
    if(!err)
        console.log('connected successfully');
    else
        console.log('connected failed \n Error :' + JSON.stringify(err,undefined,2));
});

app.get('/admin',(req,res)=>{
    con.query("SELECT * FROM admin",(err,rows)=>{
        if(!err)
            res.send(rows);
        else
            res.send(err);
    })
})

app.get('/admin/:id',(req,res)=>{
    con.query("SELECT * FROM admin where id=?",[req.params.id],(err,rows)=>{
        if(!err)
            res.send(rows);
        else
            res.send(err);
    })

})

app.post("/admin",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    
    con.query(
        "SELECT * FROM admin WHERE username= ? AND password= ? ",
        [username,password],(err,result)=>{
            if(err){
                console.log({err:err});
            }
            if(result.length>0){
                res.send(result)
            }else{ 
                res.send({message:"Wrong Username/Password combination!"})
            }
    });
});

app.put('/admin/:id',(req,res)=>{

    const id= req.params.id;
    const phoneno = req.body.phoneno;
    const url = req.body.url;
    const address = req.body.address;
    const about = req.body.about;
 
    con.query(
         'UPDATE admin SET phoneno=?,url=?,address=?,about=? WHERE id=?',
         [phoneno,url,address,about,id],(err,result)=>{
            if(!err)
                res.send(result)
            else
              res.send(err)
     })
  });  

app.get('/register',(req,res)=>{
    con.query("SELECT * FROM admin",(err,rows)=>{
        if(!err)
            res.send(rows);
        else
            res.send(err);
    })
})

app.post("/register",(req,res)=>{

    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;

    con.query(
        "SELECT * FROM admin WHERE username= ? ",
        [username],(err,result)=>{
            if(err){
                res.send({err:err});
            }
            if(result.length>0){
                res.send({message:"Username already Exists!"})
            }else{
                con.query(
                    "INSERT INTO admin (firstname,lastname,username,email,password) VALUES (?,?,?,?,?)",
                    [firstname,lastname,username,email,password],(err,result)=>{
                        if(!err)
                            res.send(result)
                        else
                            res.send(err)
                });
            }
    });
   
});

app.get('/adduser',(req,res)=>{
    con.query("SELECT * FROM users",(err,rows)=>{
        if(!err)
            res.send(rows);
        else
            res.send(err);
    })
});

app.post("/adduser",(req,res)=>{

    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const username=req.body.username;
    const email=req.body.email
    const password=req.body.password;

    con.query(
        "SELECT * FROM users WHERE username= ? ",
        [username],(err,result)=>{
            if(err){
                res.send({err:err});
            }
            if(result.length>0){
                res.send({message:"Username already Exists!"})
            }else{
                con.query(
                    "INSERT INTO users (firstname,lastname,username,email,password) VALUES (?,?,?,?,?)",
                    [firstname,lastname,username,email,password],(err,result)=>{
                        if(!err)
                            res.send(result)
                        else
                            res.send(err)
                });
            }
    });
});

app.get('/users',(req,res)=>{
    con.query("SELECT * FROM users",(err,rows)=>{
        if(!err)
            res.send(rows);
        else
            res.send(err);
    })
});

app.post("/users",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    con.query(
        "SELECT * FROM users WHERE username= ? AND password= ? ",
        [username,password],(err,result)=>{
            if(err){
                res.send({err:err});
            }
            if(result.length>0){
                res.send(result)
            }else{
                res.send({message:"Wrong Username/Password combination!"})
            }
    });
});

app.put('/users/:id',(req,res)=>{

    const id= req.params.id;
    const phoneno = req.body.phoneno;
    const url = req.body.url;
    const address = req.body.address;
    const about = req.body.about;
 
    con.query(
        'UPDATE users SET phoneno=?,url=?,address=?,about=? WHERE id=?',
         [phoneno,url,address,about,id],(err,result)=>{
            if(!err)
                res.send(result)
            else
                res.send(err)
     })
  });  

  app.get('/users/:id',(req,res)=>{
    con.query("SELECT * FROM users where id=?",[req.params.id],(err,rows)=>{
        if(!err)
            res.send(rows);
        else
            res.send(err);
    })
});

app.get('/addIssues',(req,res)=>{
    con.query("SELECT * FROM issues ORDER BY IssuesFoundIn DESC",(err,rows)=>{
        if(!err)
            res.send(rows);
        else
            res.send(err);
    })
});

app.post("/addIssues",(req,res)=>{
    const UserName=req.body.UserName;
    const DomainName=req.body.DomainName;
    const IssuesFoundIn=req.body.IssuesFoundIn;
    const Description=req.body.Description;
    const Team=req.body.Team;
    const Status=req.body.Status;
    
    con.query(
        "INSERT INTO issues (username,DomainName,IssuesFoundIn,Description,Team,Status) VALUES (?,?,?,?,?,?)",
        [UserName,DomainName,IssuesFoundIn,Description,Team,Status],(err,result)=>{
            if(!err)
                res.send(IssuesFoundIn)
            else
                res.send(err)
    });
});

app.get('/addIssues/:id',(req,res)=>{
    con.query("SELECT * FROM issues where id=?",[req.params.id],(err,rows)=>{
        if(!err)
            res.send(rows);
        else
            res.send(err);
    })
});

app.put('/addIssues',(req,res)=>{
    const team = req.body.team;
    const status = req.body.status; 
    const id = req.body.id;
    
    con.query(
        'UPDATE issues SET Team=?,Status=? WHERE id=?',
        [team,status,id],(err,rows)=>{
            if(!err){
                res.send(rows)
            }
            else{
                res.send(error)
            }
    })
});


app.listen();








