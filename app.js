const express = require("express")
const req = require("express/lib/request")
const app = express()
const db = require("./config/db")
const User = require("./model/User")


db.authenticate().then(() => console.log("berhasil terkoneksi database"))

app.use(express.urlencoded({extends: true}))

app.get('/', (req, res) => res.send("respon nodejs berhasil"))

app.post("/add", async (req,res) => {
    try {
        const {username, password, email} = req.body
        const newUser = new User({
            username, email, password
        })
        await newUser.save()
        res.json(newUser)
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error")
    }
})

/**
 * Menampilkan semua data
 */
app.get("/getAll", async (req, res) => {
    try {
        const getAllUser = await User.findAll({})
        res.json(getAllUser)        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error")
        
    }
})

/**
 * Menampilkan data berdasarkan id
 */
app.get("/getById/:id", async (req, res) => {
    try {
        const id = req.params.id
        const getUserById = await User.findOne({
            where: {id:id}
        })
        res.json(getUserById)        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error")
        
    }
})

/**
 * Menghapus data berdasarkan id
 */
app.delete("/delete/:id", async (req, res) => {
    try {   
        const id = req.params.id
        const deleteUser = await User.destroy({
            where : {id:id}
        }) 
        await deleteUser
        res.json("data berhasil di hapus")        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error")
        
    }
})

/**
 * Mengupdate data username, password dan email berdasarkan id
 */
app.put("/update/:id", async (req, res) => {
    try {   
        const {username, email, password} = req.body
        const id = req.params.id

        const updateUser = await User.update({
            username, 
            email,
            password
        },
        {where : {id:id}}            
        ) 
        await updateUser
        res.json("data berhasil di ubah")        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error")
        
    }
})

app.listen(4500, () => console.log("aplikasi berjalan di 4500"))
