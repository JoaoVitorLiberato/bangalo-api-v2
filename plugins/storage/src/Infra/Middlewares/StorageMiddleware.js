import multer from "multer"
import fs from "fs/promises"
import path from "path"

class StorageMiddleware {
  _storage = multer({
    storage: multer.diskStorage({
      destination: async (req, res, callback) => {
        const { folder } = req.params
        const folderPath = path.resolve(__dirname, "../../../public/storage", folder)

        try {
          await fs.access(folderPath)
        } catch {
          await fs.mkdir(folderPath, { recursive: true })
        } finally {
          callback(null, `./public/storage/${folder}`)
        }
      },
      filename: (req, file, callback) => {
        callback(null, file.originalname)
      }
    }),
    fileFilter: (req, file, callback) => {
      const extencoes = ["image/jpg", "image/jpeg", "image/png", "image/webp"].find(formato => formato == file.mimetype)
      if (extencoes) {
        return callback(null, true)
      }

      return callback(null, false)
    }
  })
}

export { StorageMiddleware }
