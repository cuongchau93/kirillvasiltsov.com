const glob = require("glob");
const path = require("path");

// Based on: https://github.com/jackfranklin/rollup-plugin-import-glob

export default function globImport() {
  const generatedCodes = new Map();

  return {
    name: "plugin-glob-import",
    resolveId(importee) {
      if (!importee.includes("*")) {
        return null;
      }

      const searchRoot = process.cwd();

      const files = glob
        .sync(importee, {
          cwd: searchRoot,
        })
        .map((f) => {
          return {
            pathName: f,
          };
        });

      const generatedCodeImports = files.map((f, i) => {
        const resolvedPath = path.resolve(searchRoot, f.pathName);
        return `import * as file${i} from '${resolvedPath}'`;
      });

      const exportCode = `export {${files
        .map((_, i) => `file${i}`)
        .join(", ")}}`;

      const finalCode = generatedCodeImports.join("\n") + "\n" + exportCode;

      const tmpFileName = path.join(
        searchRoot,
        importee.replace(/\W/g, (c) => `_${c.codePointAt(0)}_`)
      );

      generatedCodes.set(tmpFileName, finalCode);

      return tmpFileName;
    },

    load(id) {
      return generatedCodes.get(id);
    },
  };
}
