//@desc Get all contacts
//@route GET /api/contacts
//@access public
const Contact=require("../models/contactModel")
const asyncHandler=require("express-async-handler")
const getContacts=async(req,res)=>
{
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json({contacts});
};
//@desc Create New contact
//@route POST /api/contacts
//@access public
const createContact=asyncHandler(async(req,res)=>
{
    console.log("The request body is :"+req.body)
    const{name,email,phone}=req.body
    if(!name||!email||!phone)
    {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    else{
        const contact=await Contact.create({
            name,email,phone,user_id: req.user.id
        })
    res.status(201).json(contact);
    }
});
//@desc get specific contact
//@route GET /api/contacts/:id
//@access public
const getContact=asyncHandler(async(req,res)=>
{
console.log(req.params.id)
    const contact1= await Contact.find({name:req.params.id})
    if(!contact1)
    {
        res.status(404)
        throw new Error("contact not found")
    }
    res.status(200).json(contact1);
});
//@desc update specific contact
//@route POST /api/contacts/:id
//@access public
const updateContact=asyncHandler(async(req,res)=>
{
    const contact2= await Contact.findById(req.params.id)
    if(!contact2)
    {
        res.status(404)
        throw new Error("contact not found")
    }
    if(contact2.user_id.toString()!=req.user.id)
    {
        res.status(403)
        throw new Error("User dont have permission to update other user contacts")
    }
    const updatedContact= await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedContact);
});
//@desc delete specific contact
//@route delete /api/contacts/:id
//@access private
const deleteContact=asyncHandler(async(req,res)=>
{ 
    const contact3= await Contact.findById(req.params.id)
    if(!contact3)
    {
        res.status(404)
        throw new Error("contact not found")
    }
    if(contact3.user_id.toString()!=req.user.id)
    {
        res.status(403)
        throw new Error("User dont have permission to delete other user contacts")
    }
    const contact4= await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json(contact4);
})
module.exports={getContacts,createContact,getContact,updateContact,deleteContact}