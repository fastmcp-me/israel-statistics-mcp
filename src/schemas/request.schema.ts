import { z } from "zod"
import {
  chapterSchema,
  languageSchema,
  periodSchema,
  searchTypeSchema,
  currencySchema,
  formatSchema,
  oldFormatSchema,
} from "./shared.schema"

// Common global parameters for all API calls
const globalParamsSchema = {
  lang: languageSchema.optional(),
  page: z
    .number()
    .min(1)
    .optional()
    .describe(
      "Page number for pagination. Start with 1 for first page. Use with pagesize to navigate large result sets."
    ),
  pagesize: z
    .number()
    .min(1)
    .max(1000)
    .optional()
    .describe(
      "Number of results per page (maximum 1000). Controls how many items to return. Use with page for pagination."
    ),
}

export const getIndexTopicsSchema = z.object({
  period: periodSchema.optional(),
  searchText: z
    .string()
    .optional()
    .describe(
      "Search for specific topics by name. For example, use 'housing' to find housing-related indices, or 'food' for food price indices."
    ),
  searchType: searchTypeSchema.optional(),
  ...globalParamsSchema,
  explanation: z
    .string()
    .optional()
    .describe("Additional explanation or context for the request"),
})

export const getCatalogChaptersSchema = z.object({
  ...globalParamsSchema,
  explanation: z
    .string()
    .optional()
    .describe("Additional explanation or context for the request"),
})

export const getChapterTopicsSchema = z.object({
  chapterId: chapterSchema,
  ...globalParamsSchema,
  explanation: z
    .string()
    .optional()
    .describe("Additional explanation or context for the request"),
})

export const getSubjectCodesSchema = z.object({
  subjectId: z
    .number()
    .describe(
      "The numeric ID of the topic you want index codes for. Get this ID first by calling getChapterTopics or getIndexTopics."
    ),
  searchText: z
    .string()
    .optional()
    .describe(
      "Filter index codes by description. For example, search 'bread' to find bread-related price indices within the topic."
    ),
  searchType: searchTypeSchema.optional(),
  ...globalParamsSchema,
  explanation: z
    .string()
    .optional()
    .describe("Additional explanation or context for the request"),
})

export const getIndexCalculatorSchema = z.object({
  indexCode: z
    .number()
    .describe(
      "The numeric index code to use for price linkage calculation. Get this from getIndexData or getSubjectCodes first."
    ),
  value: z
    .number()
    .describe(
      "The original amount in the currency you want to link/adjust for inflation. For example, 100 for 100 shekels."
    ),
  fromDate: z
    .string()
    .describe(
      "Starting date for the linkage calculation in mm-dd-yyyy format (e.g., '01-01-2020'). This is when your original amount was valued."
    ),
  toDate: z
    .string()
    .describe(
      "Target date for the linkage calculation in mm-dd-yyyy format (e.g., '01-01-2024'). This shows what the amount is worth at this later date."
    ),
  currency: currencySchema.optional(),
  ...globalParamsSchema,
  explanation: z
    .string()
    .optional()
    .describe("Additional explanation or context for the request"),
})

export const getMainIndicesSchema = z.object({
  oldFormat: oldFormatSchema.optional(),
  ...globalParamsSchema,
  explanation: z
    .string()
    .optional()
    .describe("Additional explanation or context for the request"),
})

export const getMainIndicesByPeriodSchema = z.object({
  startDate: z
    .string()
    .describe(
      "Starting period in yyyymm format, e.g., '202001' for January 2020. Cannot be earlier than 199701 (January 1997)."
    ),
  endDate: z
    .string()
    .describe(
      "Ending period in yyyymm format, e.g., '202412' for December 2024. Must be later than startDate."
    ),
  ...globalParamsSchema,
  explanation: z
    .string()
    .optional()
    .describe("Additional explanation or context for the request"),
})

export const getAllIndicesSchema = z.object({
  oldFormat: oldFormatSchema.optional(),
  chapter: chapterSchema.optional(),
  ...globalParamsSchema,
  explanation: z
    .string()
    .optional()
    .describe("Additional explanation or context for the request"),
})

export const getIndexDataSchema = z.object({
  code: z
    .string()
    .describe(
      "The index code (numeric string) you want price data for. Get this code first from getSubjectCodes or getIndexTopics. Example: '120010' for general CPI."
    ),
  startPeriod: z
    .string()
    .optional()
    .describe(
      "Starting period in mm-yyyy format like '01-2020' for January 2020. Leave empty to get data from the beginning of the series."
    ),
  endPeriod: z
    .string()
    .optional()
    .describe(
      "Ending period in mm-yyyy format like '12-2024' for December 2024. Leave empty to get data up to the most recent available."
    ),
  format: formatSchema.optional(),
  last: z
    .number()
    .optional()
    .describe(
      "Get only the N most recent data points instead of the full series. Useful for getting just the latest values, e.g., use 12 for the last year of monthly data."
    ),
  coef: z
    .boolean()
    .optional()
    .describe(
      "Set to true to include linkage coefficients for inflation calculations. Only needed if you plan to do manual price adjustments."
    ),
  ...globalParamsSchema,
  explanation: z
    .string()
    .optional()
    .describe("Additional explanation or context for the request"),
})
