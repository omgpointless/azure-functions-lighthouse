import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import pool from "../lib/pool";
import getElapsedTimeInSeconds from "../lib/util";

const parseData = (data: string | JSON) => {
    const res = typeof data === 'string' ? JSON.parse(data) : data;
    const transferSize = res && res.audits['total-byte-weight'] && res.audits['total-byte-weight'].numericValue;

    return {
        transferSize
    };
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const url = (req.query.url || (req.body && req.body.url));
    const startTime = Date.now();

    const worker = await pool.proxy()
    const result = await worker.doLighthouseRun(url);

    const time = getElapsedTimeInSeconds(startTime);
    context.log(`Lighthouse run completed in ${time}s`);

    const {lhr} = result;
    const response = parseData(lhr);
    context.res = {
        headers: { "Content-Type": "application/json" },
        body: response
    };
};

export default httpTrigger;