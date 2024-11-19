/// <reference types="cypress" />

describe('API Testing using Cypress',()=>{

    it('Request Chaining',()=>{

        cy.request({
            method:'GET',
            url:'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
        }).then((res)=>{
          //  cy.log(JSON.stringify(res.body.Results))
            const vehicals=res.body.Results;
            return vehicals;
        })  
            .then((vehicals)=>{
              //  cy.log(vehicals[0].MakeName)
                for(let i=0;i<vehicals.length;i++){
                        cy.log(vehicals[i].MakeName)

                        cy.request({
                            method:'GET',
                            url:'https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/'+vehicals[i].MakeName+'?format=json'
                        }).then((res)=>{
                            cy.log(res.body.Results[i].MakeName)
                        })



                }


            })
    })




})