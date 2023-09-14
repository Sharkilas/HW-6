import { randomUUID } from "crypto";
import request from "supertest"
import { app } from "../../app";
import { httpStatusCodes } from "../../http-status-codes/http-status-codes";



// const createdBlog = {
//   id: randomUUID(),
//   name: "",
//   description: "string1",
//   websiteUrl: "string1",
//   createdAt: "string2",
//   isMembership: true};
   
  
// const headers= {
//         "Authorization": 'Basic YWRtaW46cXdlcnR5'
//     }


describe ('/users', () => {
    beforeAll(async () => {
        await request(app)
        .delete('/testing/all-data')
        .expect(httpStatusCodes.NO_CONTEND_204)
    })

    it ('should return 200 add empty array', async () => {
        await request(app)
            .get("/users")
            .expect (httpStatusCodes.OK_200)
            })
    it ('should return 404 for not existing users', async () => {
    await request(app)
        .get("/users/11")
        .expect (httpStatusCodes.NOT_FOUND_404)
       })

    it ("should'nt create users with incorrect input data", async () => {
    await request(app)
        .post ('/users')
        .auth('admin', 'qwerty')
        .send ({name : ''})
        .expect(httpStatusCodes.BAD_REQUEST_400)
        })
        
     it ("should create users with correct input data", async () => {
        const inputData = {
            login : 'VASILICH',
            password:	"123",
            email: "SSD@mail.ru",
                    }
        const createResponse  =  await request(app)
            .post ('/users')
            .auth('admin', 'qwerty')
            .send (inputData)
            
            .expect(httpStatusCodes.CREATED_201)
        
        const createdUsers = createResponse.body;
        expect(createdUsers).toEqual({
            id : expect.any(String),
            login : inputData.login,
            password : inputData.password,
            email : inputData.email,
            createdAt : expect.any(String),
                    })
               
        const getRes = await request(app).get("/users/" + createdUsers.id)

        expect(getRes.status).toBe(httpStatusCodes.OK_200,)
        expect(getRes.body).toEqual(createdUsers)
        }) 

  
  

it ("should'nt Unauthorized", async () => {
    await request(app)
    .post ('/users/')
    .send ({name : 'good title'})
    .expect(httpStatusCodes.UNAUTHORIZED_401)
             })
 
    afterAll (done => {
    done()
    })

})