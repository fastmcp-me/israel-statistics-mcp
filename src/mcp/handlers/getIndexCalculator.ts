import { secureFetch, GlobalParams } from "../helpers/fetcher"
import { indexCalculatorResponseSchema } from "../../schemas/response.schema"
import { getIndexCalculatorSchema } from "../../schemas/request.schema"
import { z } from "zod"

export async function getIndexCalculator(
  args: z.infer<typeof getIndexCalculatorSchema>
) {
  const params: Record<string, string> = {
    value: args.value.toString(),
    date: args.fromDate,
    toDate: args.toDate,
    format: "json",
    download: "false",
  }

  if (args.currency) params.currency = args.currency

  // Extract global parameters
  const globalParams: GlobalParams = {
    lang: args.lang,
    page: args.page,
    pagesize: args.pagesize,
  }

  const data = await secureFetch(
    `index/data/calculator/${args.indexCode}`,
    params,
    indexCalculatorResponseSchema,
    globalParams
  )
  return {
    request: data.request,
    answer: data.answer,
    summary: `Linked ${data.request.sum} from ${data.request.from_date} to ${data.request.to_date}: ${data.answer.to_value} (${data.answer.change_percent}% change)`,
  }
}
