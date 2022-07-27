/** 
 * @jest-environment node 
 */ 
import { createMocks } from "node-mocks-http";
import createUrl from "pages/api/create-url";
import loginTestUser from "__tests__/utils/loginTestUser";

describe("create-url API Endpoint", () => {
  test("Doesn't accept non-post requests", async () => {
    const cookie = await loginTestUser();
    const { req, res } = createMocks({ 
      method: "GET",
      headers: {
        cookie
      }
    });

    await createUrl(req, res);

    expect(res.statusCode).toBe(405);
  });
});