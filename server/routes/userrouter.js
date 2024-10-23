const express=require('express')
const { allUser, addUser, editUser, deleteUser } = require('../controllers/userControllers')
const router=express.Router()

router.get('/',allUser
)

router.post('/add',addUser)


router.put('/edit/:id',editUser
)

router.delete('/delete/:id',deleteUser)


    

    module.exports=router
