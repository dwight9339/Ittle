import fetchRedirect from "utils/fetchRedirect";
import Cors from "cors";

const cors = Cors({
  methods: ["GET", "HEAD"]
});

const applyCors = (req, res) => {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

const slugRedirect = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).send();
  }

  await applyCors(req, res);

  const { slug } = req.query;
  try {
    const redirect = await fetchRedirect(slug);

    res.redirect(redirect.redirect_url);
  } catch(err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

export default slugRedirect;