import { existsSync, readdirSync, statSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const routerLoader = (app) => {
  const modulesPath = path.join(__dirname, "modules");

  readdirSync(modulesPath).forEach(async (dir) => {
    const modulePath = path.join(modulesPath, dir);

    if (statSync(modulePath).isDirectory()) {
      const controllerPath = path.join(modulePath, `${dir}.controller.js`);

      if (existsSync(controllerPath)) {
        const { default: controller } = await import(`file:///${controllerPath}`);

        if (controller && typeof controller === "function") {
          app.use(controller);
        }
      }
    }
  });
};
