

export interface FashionItem {
    id: string
    image_path: string
    category: string
    subcategory: string
    occasion: string
    body_pear: boolean
    body_rectangle: boolean
    body_hourglass: boolean
    body_invertedtriangle: boolean
}

// Body type key map
export const BODY_TYPE_COLUMNS: Record<string, keyof FashionItem> = {
    pear: 'body_pear',
    rectangle: 'body_rectangle',
    hourglass: 'body_hourglass',
    inverted_triangle: 'body_invertedtriangle',
}

// Parse CSV respecting quoted fields (e.g. "College,Casual")
function parseCSVLine(line: string): string[] {
    const result: string[] = []
    let current = ''
    let inQuotes = false
    for (let i = 0; i < line.length; i++) {
        const ch = line[i]
        if (ch === '"') {
            inQuotes = !inQuotes
        } else if (ch === ',' && !inQuotes) {
            result.push(current.trim())
            current = ''
        } else {
            current += ch
        }
    }
    result.push(current.trim())
    return result
}

export async function loadLocalDataset(): Promise<FashionItem[]> {
    try {
        const response = await fetch('/data/products.csv')
        if (!response.ok) return []
        const text = await response.text()
        const lines = text.trim().split('\n')
        if (lines.length < 2) return []

        const headers = parseCSVLine(lines[0])

        return lines.slice(1).map(line => {
            const values = parseCSVLine(line)
            const row: Record<string, string> = {}
            headers.forEach((h, i) => { row[h] = values[i] || '' })
            return {
                id: row.id || '',
                image_path: row.image_path || '',
                category: row.category || '',
                subcategory: row.subcategory || '',
                occasion: row.occasion || '',
                body_pear: row.body_pear === '1',
                body_rectangle: row.body_rectangle === '1',
                body_hourglass: row.body_hourglass === '1',
                body_invertedtriangle: row.body_invertedtriangle === '1',
            }
        })
    } catch {
        return []
    }
}
