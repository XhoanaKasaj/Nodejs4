const {getItems, getItem, addItem, delItem, putItem } = require('../controllers/index')

const index1 = {
    type:'object',
     properties:{
        id:{type:'string'},
        title:{type:'string'},
        message:{type:'string'}
    },
}

const getIndex={
    schema:{
        response:{
            200:{
                type:'array',
                items:index1,
            },
        },
    },
    handler:getItems,
}

const getIndex1={
    schema:{
        response:{
            200:index1,
        },
    },
    handler:getItem,
}


const postItem={
    schema:{
        response:{
            201:index1,
        },
    },
    handler:addItem,
}



const deleteItem={
    schema:{
        response:{
            200:{
                type:'object',
                properties:{
                    message:{type:'string'}
                },
            },
        },
    },
    handler:delItem,
}


const updateItem={
    schema:{
        response:{
            200:index1,
        },
    },
    handler:putItem,
}


function index(fastify,options,done) {
    
fastify.get('/items',getIndex)

fastify.get('/items/:id',getIndex1)

fastify.post('/items',postItem)

fastify.delete('/items/:id',deleteItem)

fastify.put('/items/:id',putItem)

done()
}

module.exports=index