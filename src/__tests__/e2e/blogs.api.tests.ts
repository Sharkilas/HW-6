import { randomUUID } from "crypto";
import request from "supertest"
import { app } from "../../app";
import { httpStatusCodes } from "../../http-status-codes/http-status-codes";



const createdBlog = {
  id: randomUUID(),
  name: "",
  description: "string1",
  websiteUrl: "string1",
  createdAt: "string2",
  isMembership: true};
   
  
const headers= {
        "Authorization": 'Basic YWRtaW46cXdlcnR5'
    }


describe ('/blogs', () => {
    beforeAll(async () => {
        await request(app)
        .delete('/testing/all-data')
        .expect(httpStatusCodes.NO_CONTEND_204)
    })

    it ('should return 200 add empty array', async () => {
        await request(app)
            .get("/blogs")
            //.get(`${blogsRoute}/`)
            .expect (httpStatusCodes.OK_200)
            })
    it ('should return 404 for not existing blogs', async () => {
    await request(app)
        .get("/blogs/11")
        .expect (httpStatusCodes.NOT_FOUND_404)
       })

    it ("should'nt create blogs with incorrect input data", async () => {
    await request(app)
        .post ('/blogs')
        .auth('admin', 'qwerty')
        .send ({name : ''})
        .expect(httpStatusCodes.BAD_REQUEST_400)
        })
        
     it ("should create blogs with correct input data", async () => {
        const inputData = {
            name : 'VASILICH',
            description:	"description",
            websiteUrl: "http://websiteUrl.com",
            // createdAt: new Date().toISOString(),
            // isMembership: false    
        }
        const createResponse  =  await request(app)
            .post ('/blogs')
            .auth('admin', 'qwerty')
            .send (inputData)
            
            .expect(httpStatusCodes.CREATED_201)
        
        const createdBlog = createResponse.body;
        expect(createdBlog).toEqual({
            id : expect.any(String),
            name : inputData.name,
            description : inputData.description,
            websiteUrl : inputData.websiteUrl,
            createdAt : expect.any(String),
            isMembership : false
        })
               
        const getRes = await request(app).get("/blogs/" + createdBlog.id)

        expect(getRes.status).toBe(httpStatusCodes.OK_200,)
        expect(getRes.body).toEqual(createdBlog)
        }) 

  
    it ("should'nt update blogs that not exist", async () => {
        await request(app)
        .put ('/blogs/'+ "22")
        .send ({name : 'good title'})
        .auth('admin', 'qwerty')
        .expect(httpStatusCodes.BAD_REQUEST_400)
         })


it ("should'nt Unauthorized", async () => {
    await request(app)
    .put ('/blogs/'+ "-22")
    .send ({name : 'good title'})
    .expect(httpStatusCodes.UNAUTHORIZED_401)
             })
 
    afterAll (done => {
    done()
    })

})