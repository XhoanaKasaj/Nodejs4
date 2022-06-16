const fastify=require('fastify')({logger:true})
fastify.register(require('@fastify/swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger:{
        info: {title: 'fastify-api'},
    }
})
fastify.register(require('./routes/index'))

const PORT=5000

const run=async() =>{
    try {
        await fastify.listen(PORT)
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

run()
