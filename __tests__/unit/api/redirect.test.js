/** 
 * @jest-environment node 
 */ 
 import { createMocks } from "node-mocks-http";
 import { 
   getRedirect,
   clearAllRedirects,
   createOneRedirect
 } from "__tests__/utils/testDataHelper";
 import slugRedirect from "pages/api/redirect/[slug]";
 import loginTestUser from "__tests__/utils/loginTestUser";

 let testSlug;

 beforeAll(async () => {
  await clearAllRedirects();
  const cookie = await loginTestUser();
  const { req, res } = createMocks({ 
    method: "GET",
    headers: {
      cookie
    }
  });
  testSlug = await createOneRedirect(req, res);
 });
 
describe("redirect/[slug] API endpoint", () => {
  test("Doesn't accept non-get requests", async () => {
    const { req, res } = createMocks({method: "POST"});

    await slugRedirect(req, res);

    expect(res.statusCode).toBe(405);
  });

  test("Redirects user to correct URL if provided valid slug", async () => {
    const { req, res } = createMocks({method: "GET", query: { slug: testSlug }});
    const redirect = await getRedirect(testSlug);

    expect(redirect).not.toBeNull();

    await slugRedirect(req, res);

    expect(res.statusCode).toBe(302);
    expect(res._getRedirectUrl()).toEqual(redirect.redirect_url);
  });

  test("Redirects user to invalid URL page if invalid slug provided", async () => {
    const { req, res } = createMocks({method: "GET", query: { slug: "invalid_slug" }});
    const redirect = await getRedirect(testSlug);

    expect(redirect).not.toBeNull();

    await slugRedirect(req, res);

    expect(res.statusCode).toBe(302);
    expect(res._getRedirectUrl()).toEqual("/invalid_url");
  });
 });