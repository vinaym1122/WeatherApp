import mongoose from 'mongoose';

const roleSchema =mongoose.Schema(
    {
        role : {type: Number, required : true},
        rolename : {type : String, required : true}
    }
);

const roles = mongoose.model("roles", roleSchema);
export default roles;