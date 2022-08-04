/** 
 * @jest-environment node 
 */ 
import { createMocks } from "node-mocks-http";
import createUrl from "pages/api/create-url";
import loginTestUser from "__tests__/utils/loginTestUser";
import { getRedirect, clearAllRedirects } from "__tests__/utils/testDataHelper";
import { getSession } from "@auth0/nextjs-auth0";

let cookie;

beforeAll(async () => {
  cookie = await loginTestUser();
});

afterEach(async () => {
  await clearAllRedirects();
});

describe("create-url API Endpoint", () => {
  test("Doesn't accept unauthorized requests", async () => {
    const { req, res } = createMocks({ method: "POST" });

    await createUrl(req, res);

    expect(res.statusCode).toBe(401);
  });

  test("Doesn't accept non-post requests", async () => {
    const { req, res } = createMocks({ 
      method: "GET",
      headers: {
        cookie
      }
    });

    await createUrl(req, res);

    expect(res.statusCode).toBe(405);
  });

  test("Creates new redirect record in DB", async () => {
    const redirectName = "My Test";
    const redirectUrl = "https://amazon.com";
    const startDate = new Date().toDateString();
    const endDate = (new Date()).toDateString();
    const {req, res} = createMocks({
      method: "POST",
      headers: {
        cookie
      },
      body: {
        name: redirectName,
        redirect_url: redirectUrl,
        start_date: startDate,
        end_date: endDate
      }
    });
    const { user } = getSession(req, res);

    req._addBody("user_id", user.sub);

    await createUrl(req, res);

    expect(res.statusCode).toBe(200);
    
    const { slug } = await res._getJSONData();
    const redirect = await getRedirect(slug);

    expect(redirect.name).toBe(redirectName);
    expect(redirect.user_id).toBe(user.sub);
    expect(redirect.redirect_url).toBe(redirectUrl);
    expect(redirect.start_date).toBe(startDate);
    expect(redirect.end_date).toBe(endDate);
  })
});