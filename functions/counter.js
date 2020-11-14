const faunadb = require("faunadb");

const knownServices = ["github"];

const PLACES = 6;

function getCountImage(count) {
  // This is not the greatest way for generating an SVG but it'll do for now
  const countArray = count.toString().padStart(PLACES, "0").split("");

  const parts = countArray.reduce(
    (acc, next, index) => `
          ${acc}
          <rect id="Rectangle" fill="black" x="${
            index * 32
          }" y="0.5" width="29" height="29"></rect>
          <text id="0" font-family="Courier" font-size="24" font-weight="bold" fill="white">
              <tspan x="${index * 32 + 7}" y="22">${next}</tspan>
          </text>
  `,
    ""
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="${
    PLACES * 32
  }px" height="30px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>Count</title>
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        ${parts}
      </g>
  </svg>
  `;
}

exports.handler = async function (event) {
  const qp = event.queryStringParameters;
  if (!qp.name || !knownServices.includes(qp.name)) {
    return {
      statusCode: 404,
    };
  }

  const q = faunadb.query;
  const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET_KEY,
  });

  const docExists = await client.query(
    q.Exists(q.Match(q.Index("by_site_name"), qp.name))
  );

  if (!docExists) {
    await client.query(
      q.Create(q.Collection("sites"), {
        data: { name: qp.name, hits: 1 },
      })
    );
  }

  const doc = await client.query(
    q.Get(q.Match(q.Index("by_site_name"), qp.name))
  );

  await client.query(
    q.Update(doc.ref, {
      data: {
        hits: doc.data.hits + 1,
      },
    })
  );

  if (qp.svg) {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "max-age=0, no-cache, no-store, must-revalidate",
      },
      body: getCountImage(doc.data.hits),
    };
  }

  return {
    statusCode: 200,
    body: "",
  };
};
