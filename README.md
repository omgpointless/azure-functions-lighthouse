# azure-functions-lighthouse
Azure Function to run Lighthouse on a Linux consumption plan using Puppeteer.

* NodeJS 16 LTS
* Azure Function app - Linux consumption plan (serverless)
* Endpoint authorized using App Keys, default `function` authLevel.
* Uses workerpool to ensure isolatation from other running lighthouse processes.

Instructions
--------
ZipDeploy the project using remote build. Example .vscode settings use the Azure Function extension:
```
{
  "azureFunctions.deploySubpath": ".",
  "azureFunctions.projectLanguage": "TypeScript",
  "azureFunctions.projectRuntime": "~4",
  "debug.internalConsoleOptions": "neverOpen",
  "azureFunctions.scmDoBuildDuringDeployment": true
}
```

Access endpoint at `https://<YOUR_FUNCTION_APP_URL>/api/LighthouseTrigger`, either pass `code=<YOUR_APP_KEY>` as a get parameter or do a post request with the `x-functions-key` header using your created App Key.
You also need to pass a `url` as get or post body parameter.

Modify LighthouseTrigger. Its config and output is only looking for the total transfer size, as that is what I needed for another project.

```
{
  transferSize: 123456
}
```

That's it. Happy performance auditing.
