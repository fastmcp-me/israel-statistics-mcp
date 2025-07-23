/**
 * Housing Price Index Warning Helper
 *
 * The Housing Price Index (chapter "aa") has special characteristics:
 * - Bi-monthly publication schedule
 * - Based on transactions from t-2/t-3 vs t-3/t-4 periods
 * - Last 3 indices are provisional and may be updated
 */

export interface HousingWarning {
  isHousingRelated: boolean
  warnings: string[]
}

export function checkHousingWarnings(
  chapter?: string,
  code?: string,
  indexName?: string
): HousingWarning {
  const warnings: string[] = []
  let isHousingRelated = false

  // Check if this is housing-related data
  if (
    chapter === "aa" ||
    code?.includes("housing") ||
    code?.includes("real") ||
    indexName?.toLowerCase().includes("housing") ||
    indexName?.toLowerCase().includes("real estate") ||
    indexName?.toLowerCase().includes("apartment") ||
    indexName?.toLowerCase().includes("dwelling")
  ) {
    isHousingRelated = true

    warnings.push(
      "⚠️ Housing Price Index: This is a bi-monthly index with special publication characteristics."
    )

    warnings.push(
      "📊 Data timing: The published index compares transactions from 2-3 months ago (t-2/t-3) versus 3-4 months ago (t-3/t-4)."
    )

    warnings.push(
      "🔄 Provisional data: The last 3 published indices are provisional and may be updated when additional transaction reports are received."
    )

    warnings.push(
      "💡 Recommendation: For price linkage calculations, avoid using periods where the index is still provisional."
    )
  }

  return {
    isHousingRelated,
    warnings,
  }
}

export function addHousingWarningsToSummary(
  summary: string,
  housingWarning: HousingWarning
): string {
  if (!housingWarning.isHousingRelated) {
    return summary
  }

  const warningText = housingWarning.warnings.join(" ")
  return `${summary} ${warningText}`
}
