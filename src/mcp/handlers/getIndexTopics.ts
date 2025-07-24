import { secureFetch, GlobalParams } from "../helpers/fetcher"
import {
  indexTopicsResponseSchema,
  type TransformedIndexTopicsResponse,
} from "../../schemas/response.schema"
import { getIndexTopicsSchema } from "../../schemas/request.schema"
import { z } from "zod"

export async function getIndexTopics(
  args?: z.infer<typeof getIndexTopicsSchema>
): Promise<TransformedIndexTopicsResponse> {
  const params: Record<string, string> = {
    format: "json",
    download: "false",
  }

  if (args?.period) params.period = args.period
  if (args?.searchText) params.q = args.searchText
  if (args?.searchType) params.string_match_type = args.searchType

  // Extract global parameters
  const globalParams: GlobalParams = {
    lang: args?.lang,
    page: args?.page,
    pagesize: args?.pagesize,
  }

  const data = await secureFetch(
    "index/catalog/tree",
    params,
    indexTopicsResponseSchema,
    globalParams
  )
  // Add statistical benefit: count topics
  const topicCount = data.chapters.flatMap((c) =>
    c.subject.flatMap((s) => s.code)
  ).length
  return { topics: data.chapters, summary: `Found ${topicCount} index codes.` }
}
