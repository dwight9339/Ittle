/** 
 * @jest-environment node 
 */ 
 import { createMocks } from "node-mocks-http";
 import loginTestUser from "__tests__/utils/loginTestUser";
 import { 
   getRedirect,
   clearAllRedirects,
   createMultipleRedirects,
   verifyRedirects
 } from "__tests__/utils/testDataHelper";
 import fetchUrls from "pages/api/fetch-urls";
 
 let cookie;
 
 beforeAll(async () => {
   cookie = await loginTestUser();
 });
 
 afterEach(async () => {
   await clearAllRedirects();
 });
 
 describe("fetch-urls API endpoint", () => {
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

   test("Returns redirect records associated with user", async () => {
    const { req, res } = createMocks({ 
      method: "GET",
      headers: {
        cookie
      }
    });
    const numRedirects = 5;
    const baseSlug = await createMultipleRedirects(req, res, numRedirects);
    const slugs = [...Array(numRedirects).keys()].map((i) => baseSlug + `${i}`);

    const redirectsCreated = await verifyRedirects(slugs);

    expect(redirectsCreated).toBeTruthy();

    await fetchUrls(req, res);

    const redirects = res._getData();
    expect(Array.isArray(redirects)).toBeTruthy();
    
    slugs.forEach((slug) => {
      expect(redirects.find((redirect) => redirect._id === slug)).toBeDefined();
    });
  });
 });