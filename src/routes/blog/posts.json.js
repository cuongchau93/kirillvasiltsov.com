import fs from 'fs';

const getAllPosts = () => {
  return fs.readdirSync('posts');
}

export function get(req, res, next) {
  res.writeHead(200, {
    "Content-Type": "application/json"
  })

  res.end(JSON.stringify(getAllPosts()));
}
