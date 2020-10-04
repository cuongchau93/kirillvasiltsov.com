const fs = require("fs");
const path = require("path");
let redirects = "";
for (const fname of fs.readdirSync(path.join(process.cwd(), "posts"))) {
  redirects += `/writing/post/${fname} /writing/${fname}\n`;
}
fs.writeFileSync("_redirects", redirects);
