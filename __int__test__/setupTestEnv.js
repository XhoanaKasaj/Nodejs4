const {build} = require("../src/app")

const createTableSQL = 
"CREATE TABLE IF NOT EXISTS items (id SERIAL, title VARCHAR(200),message VARCHAR (500), gross_amount NUMERIC, net_amount NUMERIC, excluded_vat_amount NUMERIC);"

const clearTableSQL="DELETE FROM items"

const insertFakeItemSQL=
"INSERT INTO items (title,message,gross_amount, net_amount, excluded_vat_amount) VALUES ($1, $2, $3, $4, $5)";

module.exports = function setupTestEnv(){
    const app = build({logger: true}, {},
        {connectionString : 'postgres://postgres:postgres@127.0.0.1:5432/postgres_test'})

        beforeAll(async()=>{
            await app.ready()
            await app.pg.query(createTableSQL)
            await app.pg.query(clearTableSQL )
        })

        beforeEach(async () =>{
            await app.pg.query(insertFakeItemSQL,["Test Item", "This is a test item", 20,16, 3])
        })

        afterEach(async () =>{
            await app.pg.query(clearTableSQL)
        })

        afterAll(async () =>{
            app.close()
        })

        return app
}