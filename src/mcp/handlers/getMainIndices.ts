import { secureFetch, GlobalParams } from "../helpers/fetcher"
import {
  mainIndicesXmlResponseSchema,
  mainIndicesByPeriodXmlResponseSchema,
  type TransformedMainIndicesResponse,
  type TransformedMainIndicesByPeriodResponse,
} from "../../schemas/response.schema"
import {
  getMainIndicesSchema,
  getMainIndicesByPeriodSchema,
} from "../../schemas/request.schema"
import { z } from "zod"

export async function getMainIndices(
  args?: z.infer<typeof getMainIndicesSchema>
): Promise<TransformedMainIndicesResponse> {
  const params: Record<string, string> = {
    format: "json",
    download: "false",
  }

  if (args?.oldFormat) params.oldformat = "true"

  // Extract global parameters
  const globalParams: GlobalParams = {
    lang: args?.lang,
    page: args?.page,
    pagesize: args?.pagesize,
  }

  const data = await secureFetch(
    "index/data/price_selected",
    params,
    mainIndicesXmlResponseSchema,
    globalParams
  )

  // Transform XML data to a more usable format - handle all elements properly
  const transformedIndices = data.indices.date.flatMap((dateEntry) =>
    dateEntry.code.map((codeEntry) => ({
      code: codeEntry.code[0], // Single value per code entry
      name: codeEntry.name[0], // Single value per code entry
      percent: parseFloat(codeEntry.percent[0]), // Single value per code entry
      year: dateEntry.year[0], // Single value per date entry
      month: dateEntry.month[0], // Single value per date entry
      indices: codeEntry.index.map((idx) => ({
        value: parseFloat(idx._), // Text content, not in array
        base: idx.base[0], // Attributes are in arrays with explicitArray:true
        chainingCoefficient: idx.chainingCoefficient
          ? parseFloat(idx.chainingCoefficient[0])
          : undefined,
      })),
    }))
  )

  return {
    indices: transformedIndices,
    updateDate: data.indices.UpdateDate[0],
    summary: `Retrieved ${transformedIndices.length} main indices updated on ${data.indices.UpdateDate[0]}.`,
  }
}

export async function getMainIndicesByPeriod(
  args: z.infer<typeof getMainIndicesByPeriodSchema>
): Promise<TransformedMainIndicesByPeriodResponse> {
  const params = {
    StartDate: args.startDate,
    EndDate: args.endDate,
    format: "xml",
    download: "false",
  }

  // Extract global parameters
  const globalParams: GlobalParams = {
    lang: args.lang,
    page: args.page,
    pagesize: args.pagesize,
  }

  const data = await secureFetch(
    "index/data/price_selected_b",
    params,
    mainIndicesByPeriodXmlResponseSchema,
    globalParams
  )

  // Transform XML data to a more usable format
  const transformedIndices = data.indices.ind.map((indEntry) => ({
    code: indEntry.code[0], // Get first element from array
    name: indEntry.n?.[0] || "Unknown Index", // Get first element from array (note: 'n', not 'name')
    percent: parseFloat(indEntry.percent[0]), // Get first element from array
    date: indEntry.date[0], // Get first element from array (YYYY-MM format)
    index: parseFloat(indEntry.index[0]), // Index value as number
    base: indEntry.base[0], // Base period description
  }))

  // Group by date for better organization
  const groupedByDate = transformedIndices.reduce(
    (acc, curr) => {
      const date = curr.date
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(curr)
      return acc
    },
    {} as Record<string, typeof transformedIndices>
  )

  return {
    indices: transformedIndices,
    groupedByDate,
    dateRange: `${args.startDate} to ${args.endDate}`,
    totalIndices: transformedIndices.length,
    summary: `Retrieved ${transformedIndices.length} main indices from ${args.startDate} to ${args.endDate}.`,
  }
}
