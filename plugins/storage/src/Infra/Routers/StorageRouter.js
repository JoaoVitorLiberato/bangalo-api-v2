import express from "express"
import { StorageMiddleware } from "../Middlewares/StorageMiddleware"
import { StorageController } from "../Controllers/StorageController"

const router = express.Router()
const { _storage } = new StorageMiddleware()
const controller = new StorageController()

/**
 * @swagger
 * /upload/{folder}/{filename}:
 *   get:
 *     summary: Recupera uma imagem salva
 *     parameters:
 *       - in: path
 *         name: folder
 *         required: true
 *         schema:
 *           type: string
 *         description: Pasta onde o arquivo está salvo
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do arquivo
 *     responses:
 *       200:
 *         description: Imagem recuperada com sucesso.
 *       404:
 *         description: Imagem não encontrada.
 */
router.get("/upload/:folder/:filename", controller.image)

/**
 * @swagger
 * /upload/{folder}:
 *   post:
 *     summary: Salva imagem na pasta designada. Caso não exista à página, será criada de forma automática.
 *     parameters:
 *       - in: path
 *         name: folder
 *         required: true
 *         schema:
 *           type: string
 *         description: Pasta onde o arquivo está salvo
 *     responses:
 *       200:
 *         description: Imagem foi salva com sucesso.
 *       400:
 *          description: Envia uma propriedade boolean com o error = true
*/
router.post("/upload/:folder", _storage.single("image"), controller.upload)

export {
  router as StorageRouter
}
