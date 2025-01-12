const User = require('../models/user');
// const createStaff = async (req,res) =>{
//     try{
//         const user = await User.findByIdAndUpdate(req.params.id, req.body,{
//             new: true,
//         })
//         if(user){
//             res.status(200).json(user)
//         }else{
//             res.status(404).json({ error: "User not found" })
//         }
//     }catch(error){
//         res.status(500).json({ error: "Failed to update user" })
//     }
// }
