import { getAllPosts } from "../../posts";
import siteMetadata from "../../siteMetadata";

const render = (items) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
	<title>Kirill Vasiltsov's Phantasiai Blog RSS Feed</title>
	<link>${siteMetadata.url}</link>
	<description>Personal blog by Kirill Vasiltsov</description>
	<image>
		<url>${siteMetadata.url}/favicon.png</url>
		<title>Personal blog by Kirill Vasiltsov</title>
		<link>${siteMetadata.url}</link>
	</image>
	${items
    .map(
      (item) => `
		<item>
			<title>${item.title}</title>
			<link>${siteMetadata.url}/blog/${item.slug}</link>
			<description>${item.spoiler}</description>
			<pubDate>${new Date(item.date).toUTCString()}</pubDate>
		</item>
	`
    )
    .join("\n")}
</channel>
</rss>`;

export function get(req, res) {
  res.writeHead(200, {
    "Cache-Control": `max-age=0, s-max-age=${600}`, // 10 minutes
    "Content-Type": "application/rss+xml",
  });

  const feed = render(getAllPosts().map((p) => p.meta));
  res.end(feed);
}
