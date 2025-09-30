import { v4 as uuidv4 } from 'uuid'
import { createClient } from '@/utils/supabase/server'

type UploadFileOptions = {
  file: File
  bucket: string
  path?: string
  publicUrl?: boolean
}

export async function uploadFile({
  file,
  bucket,
  path,
  publicUrl = true,
}: UploadFileOptions) {
  try {
    const supabase = await createClient()
    const fileExt = file.name.split('.').pop()
    const fileName = `${uuidv4()}.${fileExt}`
    const filePath = path ? `${path}/${fileName}` : fileName

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      throw new Error(`Error uploading file: ${error.message}`)
    }

    if (publicUrl && data) {
      const { data: urlData } = await supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

      return {
        path: data.path,
        publicUrl: urlData.publicUrl,
        fullPath: data.path,
      }
    }

    return {
      path: data.path,
      fullPath: data.path,
    }
  } catch (error) {
    console.error('Error in uploadFile:', error)
    throw error
  }
}

export async function deleteFile(bucket: string, path: string) {
  try {
    const supabase = await createClient()
    const { error } = await supabase.storage.from(bucket).remove([path])

    if (error) {
      throw new Error(`Error deleting file: ${error.message}`)
    }

    return { success: true }
  } catch (error) {
    console.error('Error in deleteFile:', error)
    throw error
  }
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || ''
}

export function isImageFile(filename: string): boolean {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
  const ext = getFileExtension(filename)
  return imageExtensions.includes(ext)
}

export function isFileSizeValid(file: File, maxSizeMB: number = 5): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024 // Convert MB to bytes
  return file.size <= maxSizeBytes
}

export function getFileSizeMB(sizeInBytes: number): number {
  return Math.round((sizeInBytes / (1024 * 1024)) * 100) / 100 // Convert to MB with 2 decimal places
}
