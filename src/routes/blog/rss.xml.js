import { getAllPosts } from "../../posts";
import siteMetadata from "../../siteMetadata";

const render = (items) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
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
			<title>${item.meta.title}</title>
			<link>${siteMetadata.url}/blog/${item.meta.slug}</link>
			<description>${item.meta.spoiler}</description>
      <pubDate>${new Date(item.meta.date).toUTCString()}</pubDate>
      <content:encoded><![CDATA[${item.html}]]></content:encoded>
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

  const feed = render(getAllPosts());
  res.end(feed);
}
