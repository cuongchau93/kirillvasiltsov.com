const fs = require("fs");
const Jimp = require("jimp");
const twitterCard = require("wasm-twitter-card");
const path = require("path");
const { getPostSlugs, getTitleBySlug } = require("./src/routes/_posts.js");

const WIDTH = 1200;
const HEIGHT = 630;

async function writeTextToCard(buffer) {
  return new Jimp({ data: buffer, width: WIDTH, height: HEIGHT });
}

async function generateBackground(background) {
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
  title = "Writing",
  author = "Kirill Vasiltsov",
  background = path.join(process.cwd(), "assets", "social_card.png"),
  fontColor = "#ffffff",
  titleFontSize = 96,
  subtitleFontSize = 48,
  fontStyle = "custom",
  separator = "|",
  fontFile = path.join(process.cwd(), "assets", "inter.ttf"),
}) => {
  const details = `${title} ${separator} ${author}`;

  const output = path.join(
    process.cwd(),
    "__sapper__",
    "export",
    "writing",
    "post",
    slug,
    "twitter-card.jpg"
  );

  const fontToUint8Array = fontFile
    ? fs.readFileSync(require.resolve(fontFile), null)
    : new Uint8Array();

  const buffer = twitterCard.generate_text(
    postTitle,
    details,
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

const generateAllImages = async () => {
  const postSlugs = getPostSlugs();
  const imagePromises = postSlugs.map((slug) => {
    return generateImage({ postTitle: getTitleBySlug(slug), slug });
  });
  await Promise.all(imagePromises);
};

generateAllImages();
