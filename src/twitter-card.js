import fs from "fs";
import Jimp from "jimp";
import twitterCard from "wasm-twitter-card";
import path from "path";
import { getPostSlugs, getTitleBySlug } from "./posts";

const WIDTH = 1200;
const HEIGHT = 630;

async function writeTextToCard(buffer) {
  return await new Jimp({ data: buffer, width: WIDTH, height: HEIGHT });
}

async function generateBackground(background) {
  if (background.match(/[0-9A-Fa-f]{6}/g)) {
    return await new Jimp(WIDTH, HEIGHT, background);
  }
  return Jimp.read(background);
}

function hexToRgb(hex) {
  const hexCode = hex.replace(/^#/, "");
  const bigint = parseInt(hexCode, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

const generateImage = ({
  postTitle,
  slug,
  title = "Blog",
  author = "Kirill Vasiltsov",
  background = path.join(process.cwd(), "assets", "social_card.png"),
  fontColor = "#ffffff",
  titleFontSize = 96,
  subtitleFontSize = 48,
  fontStyle = "monospace",
  separator = "|",
  fontFile = path.join(process.cwd(), "assets", "inter.ttf"),
}) => {
  let formattedDetails = "";
  if (title || author) {
    formattedDetails =
      title && author ? `${title} ${separator} ${author}` : title || author;
  }

  const output = path.join(
    process.cwd(),
    "__sapper__",
    "export",
    "blog",
    slug,
    "twitter-card.jpg"
  );

  const fontToUint8Array = fontFile
    ? fs.readFileSync(require.resolve(fontFile), null)
    : new Uint8Array();

  if (fontFile) {
    fontStyle = "custom";
  }

  const buffer = twitterCard.generate_text(
    postTitle,
    formattedDetails,
    titleFontSize,
    subtitleFontSize,
    hexToRgb(fontColor),
    fontStyle,
    fontToUint8Array
  );

  return Promise.all([generateBackground(background), writeTextToCard(buffer)])
    .then(([base, text]) => base.composite(text, 0, 0))
    .then((image) =>
      image
        .writeAsync(output)
        .then(() => console.log("Generated Twitter Card: ", output))
        .catch((err) => err)
    )
    .catch(console.error);
};

export const generateAllImages = async () => {
  const postSlugs = getPostSlugs();
  const imagePromises = postSlugs.map((slug) => {
    return generateImage({ postTitle: getTitleBySlug(slug), slug });
  });
  await Promise.all(imagePromises);
};
