import { randomBytes } from "crypto";

const generateSlug = () => {
  return randomBytes(4)
    .toString('base64')
    .replace(/\//g,'_')
    .replace(/\+/g,'-')
    .replace(/\=/g,'');
}

export default generateSlug;