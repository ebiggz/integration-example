import { Firebot } from "@crowbartools/firebot-custom-scripts-types";
import { getIntegration } from "./example-integration";

const script: Firebot.CustomScript = {
  getScriptManifest: () => {
    return {
      name: "Starter Integration Script",
      description: "A starter custom script for building integrations.",
      author: "SomeDev",
      version: "1.0",
      firebotVersion: "5",
      startupOnly: true,
    };
  },
  getDefaultParameters: () => {
    return {};
  },
  run: (runRequest) => {
    const { logger, integrationManager } = runRequest.modules;
    integrationManager.registerIntegration(getIntegration(logger));
  },
};

export default script;
