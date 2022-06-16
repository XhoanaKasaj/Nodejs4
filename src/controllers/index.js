const { v4:uuidv4 } = require('uuid') 
let {items}=require('../items')

const getItems = (req,reply) =>
{
    reply.send(items)
}

const getItem = (req,reply) =>
{
    const {id} =req.params
    
    const item =items.find((item) =>item.id === id)
    reply.send(item)
}

const addItem = (req, reply) =>
{

    const {title,message} =req.body
    
    const item = {
        id: uuidv4(),
        title,
        message
    }
    items = [...items,item]
    reply.code(201).send(item)
}


const delItem = (req, reply) =>
{
    const {id} = req.params

    items=items.filter(item => item.id !== id)

    reply.send({message: `Item ${id} has been deleted`})
}



const putItem = (req, reply) =>
{
    const {id} = req.params
    const {title,message}=req.body

    const newItem = items.find((item) => item.id === id);

    newItem.id = id;
    newItem.title = title;
    newItem.message = message;

    reply.send(newItem);
}




module.exports ={
    getItems,
    getItem,
    addItem,
    delItem,
    putItem
}