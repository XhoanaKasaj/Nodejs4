const vatCalculator = require('../../utlis/vatCalculator')

const index1 = {
    type:'object',
     properties:{
        id:{type:'string'},
        title:{type:'string'},
        message:{type:'string'},
        gross_amount:{type:'number'}
    },
}


const postItem={
    schema:{
        body:{
            type:'object',
            required:['title','message','gross_amount'],
            properties:{
                title:{type:'string'},
                message:{type:'string'},
                gross_amount:{type:'number'}
            }
        },
        response:{
            201:index1,
        },
    }
}


const itemRoute_v2=async(fastify, options, done)=>{

    fastify.get('/',async(request,reply)=>{
        try{
           
            const {rows} =await fastify.pg.query("SELECT * FROM items")
            reply.send(rows)
        }catch(error){
            reply.send(error)
        
        }
    })

    fastify.get('/:id', async(request,reply)=>{
        try {
            const {id} =request.params
            const {rows} = await fastify.pg.query("SELECT * FROM items WHERE id=$1",[id])
            reply.send(rows[0])
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.post('/',postItem ,async(request, reply)=>{
        

        try{
            const client = await fastify.pg.connect();
            const {title,message,gross_amount} =request.body

            const net_amount = vatCalculator.calculateNetAmount(gross_amount)

            const vatAmount = vatCalculator.calculateVAT(net_amount)

            const {rows} = await fastify.pg.query("INSERT INTO items (title, message, gross_amount, net_amount,excluded_vat_amount ) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
            [title,message, gross_amount, net_amount,vatAmount]
            );

            reply.code(201).send(rows[0]);
        }
        catch(err){
            reply.send(err)
        }finally{
            client.release();
        }
    })

    fastify.put('/:id',async(request,reply)=>{
        try {
            const {id} =request.params
            const {title,message}=request.body
            const {rows} =await fastify.pg.query("UPDATE items SET title=$1,message=$2 WHERE id=$3 RETURNING *",
            [title,message,id])
            reply.send(rows[0])

            } catch (error) {
             reply.send
        }
    })

    fastify.delete('/:id', async(request,reply)=>{
        try {
            const {id} =request.params
            await fastify.pg.query("DELETE FROM items WHERE id=$1",[id])
            reply.send(`Item with id:${id} has been deleted`)
        } catch (error) {
            reply.send(error)
        }
    })
    done()
    
}

module.exports ={itemRoute_v2}