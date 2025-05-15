import { writeFile } from 'fs/promises'
import { join } from 'path'
import type { NextRequest } from 'next/server'

export const uploadDir = join(process.cwd(), 'public/uploads')

export const parseForm = async (req: NextRequest) => {
  const formData = await req.formData()
  const fields: Record<string, string> = {}
  const files: Record<string, Blob> = {}

  for (const [key, value] of formData.entries()) {
    if (value instanceof Blob && 'name' in value) {
      files[key] = value
    } else {
      fields[key] = String(value)
    }
  }

  return { fields, files }
}

export const saveFile = async (file: Blob & { name?: string }): Promise<string> => {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const filename = `${Date.now()}-${file.name || 'unnamed'}`
  const filepath = join(uploadDir, filename)

  await writeFile(filepath, buffer)

  return `/uploads/${filename}`
} 