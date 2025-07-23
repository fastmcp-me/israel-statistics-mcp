import { secureFetch, GlobalParams } from "../helpers/fetcher"
import { catalogChaptersResponseSchema } from "../../schemas/response.schema"
import { getCatalogChaptersSchema } from "../../schemas/request.schema"
import { z } from "zod"

export async function getCatalogChapters(
  args?: z.infer<typeof getCatalogChaptersSchema>
) {
  // Extract global parameters
  const globalParams: GlobalParams = {
    lang: args?.lang,
    page: args?.page,
    pagesize: args?.pagesize,
  }

  const data = await secureFetch(
    "index/catalog/catalog",
    { format: "json", download: "false" },
    catalogChaptersResponseSchema,
    globalParams
  )
  return {
    chapters: data.chapters,
    summary: `Found ${data.chapters.length} index chapters.`,
  }
}
