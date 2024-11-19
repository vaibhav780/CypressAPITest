/// <reference types="cypress" />

describe('API Post Testing using Cypress', () => {

    const data=require('/cypress/fixtures/Testdata.json')
    const data2 = require('/cypress/fixtures/PostData.json')
    let randomText =''
    let testEmail=''
   let userid=''
    
    it('Post Users Request', () => {
        
        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for (var i = 0; i < 10; i++)
        randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length));
        testEmail = randomText + '@gmail.com'
        console.log(testEmail)
        cy.request({
            method: 'POST',
            url: data.baseURL,
            headers: {
                'authorization': data.token
            },
            body: {
                "name": data2.name,
                "email": testEmail,
                "gender": data2.gender,
                "status": data2.status
            }
        }).then((res) => {
            cy.log(JSON.stringify(res.body))
             userid=JSON.stringify(res.body.id)
            expect(res.status).to.eq(201)
            console.log(userid)

        }).then((res)=>{
            cy.request({
                method:'GET',
                url:'https://gorest.co.in/public/v2/users/'+userid,
                headers: {
                    'authorization': data.token
                }
            }).then((res)=>{
                cy.log(JSON.stringify(res.body))
                expect(res.status).to.eq(200)
                expect(JSON.stringify(res.body.id)).to.eq(userid)
            })
        })
    })


})