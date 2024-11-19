/// <reference types="cypress" />

describe('API Testing using Cypress',()=>{

    const data=require('/cypress/fixtures/Testdata.json')

    it('GET Users Request',()=>{

        cy.request({
            
            method:'GET',
            url:data.baseURL,
            headers:{
                'authorization':data.token
            }
        }).then((res)=>{
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(200)
            
        })
    })

    it('Get Specific id User Request',()=>{
        cy.request({
            method:'GET',
            url:"https://gorest.co.in/public/v2/users/7520573",
            headers:{
                'authorization':data.token
            }
        }).then((res)=>{
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(200)
            expect(res.body.name).to.contain('Bhat')
        })
    })


})