import fetch, { Response } from "node-fetch"
import { z } from "zod"
import xml2js from "xml2js"

const API_BASE = "https://api.cbs.gov.il/"

export interface GlobalParams {
  lang?: "he" | "en"
  page?: number
  pagesize?: number
}

function isXmlContent(text: string): boolean {
  return text.trim().startsWith("<?xml") || text.trim().startsWith("<")
}

async function parseResponse(response: Response): Promise<unknown> {
  const text = await response.text()

  if (isXmlContent(text)) {
    // Parse XML response
    const parser = new xml2js.Parser({
      explicitArray: true, // Always return arrays to handle single elements consistently
      ignoreAttrs: false,
      mergeAttrs: true,
    })
    return new Promise((resolve, reject) => {
      parser.parseString(text, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  } else {
    // Parse JSON response
    return JSON.parse(text)
  }
}

export async function secureFetch<T>(
  endpoint: string,
  params: Record<string, string>,
  schema: z.ZodType<T>,
  globalParams?: GlobalParams
): Promise<T> {
  const url = new URL(endpoint, API_BASE)

  // Add endpoint-specific parameters
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  // Add global parameters if provided
  if (globalParams) {
    if (globalParams.lang) {
      url.searchParams.append("lang", globalParams.lang)
    }
    if (globalParams.page) {
      url.searchParams.append("page", globalParams.page.toString())
    }
    if (globalParams.pagesize) {
      // Enforce max 1000 limit as per CBS API documentation
      const pagesize = Math.min(globalParams.pagesize, 1000)
      url.searchParams.append("pagesize", pagesize.toString())
    }
  }

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error(`CBS API error: ${response.status} ${response.statusText}`)
  }

  const data = await parseResponse(response)
  return schema.parse(data)
}
