const setupTestEnv = require('./setupTestEnv')

const app = setupTestEnv();

describe("Intgretation tests for CRUD operations connected to test postgres Db",()=>{

    test("Should create an item via POST route", async ()=>{
        const item={
            title:'title 8',
            message:'This is a test item',
            gross_amount:20
        }

        const response = await app.inject({
            method:"POST",
            url:"/v2",
            payload:item
        })
        expect(response.statusCode).toBe(201)
        expect(response.json()).toMatchObject(item)
    })
})