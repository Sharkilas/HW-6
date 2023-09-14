import request from "supertest"
import { app } from "../../app";
import { httpStatusCodes } from "../../http-status-codes/http-status-codes";



describe ('/posts', () => {
    beforeAll(async () => {
        await request(app)
        .delete('/testing/all-data')
        .expect(httpStatusCodes.NO_CONTEND_204)
    })                                                          // создать  юзера 

    it ('should return 200 add empty array', async () => {
        await request(app)
            .get("/posts")
            .expect (httpStatusCodes.OK_200)
        })
        it ('should return 404 for not existing posts', async () => {
             await request(app)
            .get("/posts/126261")
            .expect (httpStatusCodes.NOT_FOUND_404)
                })
         
    it ("should'nt create posts with incorrect input data", async () => {
    await request(app)
        .post ('/posts')
        .auth('admin', 'qwerty')
        .send ({name : ''})
        .expect(httpStatusCodes.BAD_REQUEST_400)
        })
        
     it ("should create posts with correct input data", async () => {
        const inputData = {
            title : 'Live in undeground',
            shortDescription:	"description",
            content: "ee33d",
            blogId: "7875807f-4152-4d8c-a9d8-4938520128c8"

        }
        const createResponse  =  await request(app)
            .post ('/posts')
            .auth('admin', 'qwerty')
            .send ({title : 'Live in undeground'})
            .send ( {shortDescription:	"description"})
            .send ( {content: "ee33d"})
            .send ( {blogId: "7875807f-4152-4d8c-a9d8-4938520128c8"})
            .expect(httpStatusCodes.CREATED_201)
        
        const createdPosts = createResponse.body;
        expect(createdPosts).toEqual({
            id : expect.any(String),
            title : inputData.title,
            shortDescription : inputData.shortDescription,
            content : inputData.content,
            blogId: inputData.blogId,
            blogName : expect.any(String),
            createdAt : expect.any(String),
            
        })
               
        const getRes = await request(app).get("/posts/" + createdPosts.id)

        expect(getRes.status).toBe(httpStatusCodes.OK_200,)
        expect(getRes.body).toEqual(createdPosts)
        }) 

  0

    it ("should'nt update blogs that not exist", async () => {
        await request(app)
        .put ('/posts/'+ "22")
        .send ({name : 'good title'})
        .auth('admin', 'qwerty')
        .expect(httpStatusCodes.BAD_REQUEST_400)
         })


it ("should'nt Unauthorized", async () => {
    await request(app)
    .put ('/posts/'+ "-22")
    .send ({name : 'good title'})
    .expect(httpStatusCodes.UNAUTHORIZED_401)
             })

    






    afterAll (done => {
    done()
    })

})