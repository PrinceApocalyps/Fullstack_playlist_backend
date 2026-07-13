import express from "express";

const PORT = 8000;

const app = express();

app.get("/", (req, res)=>{
    res.send("Server working")
})

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost${PORT}`)
})