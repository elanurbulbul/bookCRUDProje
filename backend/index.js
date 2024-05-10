import express from "express"
import mysql from "mysql"

const app= express()

app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"newprojecloud"
})

app.get("/", (req,res)=>{
    res.json("hello ")
})

app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books"
    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)    
    })
})

app.post("/books", (req, res) => {
    const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.price,
      req.body.cover,
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  

app.listen(8080, ()=>{
    console.log("Connected to backend")    
})