const vatCalculator= require('../src/utlis/vatCalculator')

describe("VAT calculator",()=>{

    test("Should return the correct VAT excluded amount for 20% VAT", ()=>{
        const result = vatCalculator.calculateVAT(16.67)
        expect(result).toBe(3.33)
    })
    
    test("Should return correct gross amount of 20% VAT", ()=>{
        const result =vatCalculator.calculateGrossAmount(16.67)
        expect(result).toBe(20)
    })

    test("Should return correct net amount of 20% VAT", ()=>{
        const result =vatCalculator.calculateNetAmount(20)
        expect(result).toBe(16.67)
    })
})