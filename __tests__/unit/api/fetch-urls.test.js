/** 
 * @jest-environment node 
 */ 
 import { createMocks } from "node-mocks-http";
 import loginTestUser from "__tests__/utils/loginTestUser";
 import { 
   getRedirect,
   clearAllRedirects,
   createOneRedirect
 } from "__tests__/utils/testDataHelper";
 import fetchUrls from "pages/api/fetch-urls";
 
 let cookie;
 
 beforeAll(async () => {
   cookie = await loginTestUser();
 });
 
 afterEach(async () => {
   await clearAllRedirects();
 });
 
 describe("delete-url API endpoint", () => {
   test("Doesn't accept unauthorized requests", async () => {
     const { req, res } = createMocks({ method: "POST" });
 
     await fetchUrls(req, res);
 
     expect(res.statusCode).toBe(401);
   });
 
   test("Doesn't accept non-get requests", async () => {
     const { req, res } = createMocks({ 
       method: "POST",
       headers: {
         cookie
       }
     });
 
     await fetchUrls(req, res);
 
     expect(res.statusCode).toBe(405);
   });
 });