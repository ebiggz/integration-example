import {
  Integration,
  IntegrationController,
  IntegrationData,
  IntegrationEvents,
} from "@crowbartools/firebot-custom-scripts-types";
import { Logger } from "@crowbartools/firebot-custom-scripts-types/types/modules/logger";
import { TypedEmitter } from "tiny-typed-emitter";

class IntegrationEventEmitter extends TypedEmitter<IntegrationEvents> {}

type IntegrationSettings = {
  exampleCategory: {
    exampleSetting: string;
  };
};

class ExampleIntegration
  extends IntegrationEventEmitter
  implements IntegrationController<IntegrationSettings>
{
  connected = false;

  constructor(private readonly logger: Logger) {
    super();
  }

  init(
    linked: boolean,
    integrationData: IntegrationData<IntegrationSettings>
  ): void | PromiseLike<void> {
    this.logger.info(
      "Example Integration Initialized",
      integrationData.userSettings?.exampleCategory?.exampleSetting
    );
  }

  onUserSettingsUpdate?(
    integrationData: IntegrationData<IntegrationSettings>
  ): void | PromiseLike<void> {
    this.logger.info(
      "Example Integration settings updated",
      integrationData.userSettings?.exampleCategory?.exampleSetting
    );
  }
}
export const getIntegration = (
  logger: Logger
): Integration<IntegrationSettings> => ({
  definition: {
    id: "example-integration",
    name: "Example Integration",
    description: "Example integration that doesn't do anything.",
    linkType: "none",
    configurable: true,
    connectionToggle: false,
    settingCategories: {
      exampleCategory: {
        title: "Example Category",
        settings: {
          exampleSetting: {
            title: "Example Setting",
            type: "string",
            default: "Hello World!",
            description: "Example description",
            validation: {
              required: true,
            },
          },
        },
      },
    },
  },
  integration: new ExampleIntegration(logger),
});
