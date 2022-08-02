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
import deleteUrl from "pages/api/delete-url";

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

    await deleteUrl(req, res);

    expect(res.statusCode).toBe(401);
  });

  test("Doesn't accept non-post requests", async () => {
    const { req, res } = createMocks({ 
      method: "GET",
      headers: {
        cookie
      }
    });

    await deleteUrl(req, res);

    expect(res.statusCode).toBe(405);
  });
});