import { randomBytes } from "crypto";

export default () => {
  return randomBytes(4)
    .toString('base64')
    .replace(/\//g,'_')
    .replace(/\+/g,'-')
    .replace(/\=/g,'');
}