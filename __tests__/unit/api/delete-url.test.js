/** 
 * @jest-environment node 
 */ 
import { createMocks } from "node-mocks-http";
import loginTestUser from "__tests__/utils/loginTestUser";
import { 
  getRedirect,
  getAvailableSlug,
  clearAllRedirects,
  createOneRedirect,
  clearAvailableSlugs
} from "__tests__/utils/testDataHelper";
import deleteUrl from "pages/api/delete-url";

let cookie;

beforeAll(async () => {
  cookie = await loginTestUser();
});

afterEach(async () => {
  await clearAllRedirects();
  await clearAvailableSlugs();
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

  test("Deletes specified redirect rec", async () => {
    const { req, res } = createMocks({ 
      method: "POST",
      headers: {
        cookie
      }
    });
    const slug = await createOneRedirect(req, res);
    let redirect = await getRedirect(slug);

    expect(redirect).not.toBeNull();

    req._addBody("slug", slug);

    await deleteUrl(req, res);
    redirect = await getRedirect(slug);

    expect(redirect).toBeNull();
  });

  test("Deleted redirect slug added to available_slugs collection", async () => {
    const { req, res } = createMocks({ 
      method: "POST",
      headers: {
        cookie
      }
    });
    const slug = await createOneRedirect(req, res);
    let available_slug = await getAvailableSlug(slug);

    expect(available_slug).toBeNull();

    req._addBody("slug", slug);

    await deleteUrl(req, res);
    available_slug = await getAvailableSlug(slug);

    expect(available_slug).not.toBeNull();
  });
});