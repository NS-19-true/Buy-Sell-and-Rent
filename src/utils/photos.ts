import Taro from '@tarojs/taro'

export const MAX_PHOTOS = 4
/** Server limit: 1 MB decoded per photo (server/server.js MAX_PHOTO_SIZE). */
export const MAX_PHOTO_BYTES = 1_000_000

const MIME: Record<string, string> = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif' }
const mimeFromPath = (path: string) => MIME[(path.split('.').pop() || '').toLowerCase()] || 'image/jpeg'

function readBase64(filePath: string): Promise<{ base64: string; bytes: number }> {
  return new Promise((resolve, reject) => {
    Taro.getFileSystemManager().readFile({
      filePath,
      encoding: 'base64',
      success: (res) => {
        const base64 = String(res.data)
        const padding = base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0
        resolve({ base64, bytes: Math.floor((base64.length * 3) / 4) - padding })
      },
      fail: () => reject(new Error('Could not read the photo'))
    })
  })
}

/**
 * Turns a temp file from chooseMedia into the `data:` URI the API expects,
 * recompressing (JPEG) until it fits under the 1 MB server limit.
 * This replaces the web version's <input type=file> + FileReader.readAsDataURL.
 */
export async function toDataUrl(path: string): Promise<string> {
  let file = path
  let mime = mimeFromPath(path)
  for (const quality of [null, 70, 45, 25]) {
    if (quality !== null) {
      try {
        file = (await Taro.compressImage({ src: path, quality })).tempFilePath
        mime = 'image/jpeg'
      } catch {
        break // e.g. GIFs cannot be recompressed
      }
    }
    const { base64, bytes } = await readBase64(file)
    if (bytes <= MAX_PHOTO_BYTES) return `data:${mime};base64,${base64}`
  }
  throw new Error('That photo is too large. Pick a smaller one.')
}
