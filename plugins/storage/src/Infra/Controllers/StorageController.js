import path from "path"
import sharp from "sharp"

class StorageController {
  image = (request, response) => {
    try {
      const { folder, filename } = request.params
      const filePath = path.join(__dirname, `../../../public/storage/${folder}`, filename)
  
      return response.sendFile(filePath, (error) => {
        if (error) {
          return response.status(404).json({
            messagem: "Imagem não encontrada!",
            external_image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Fbr%2Ficone-gratis%2Fsem-foto_1695213&psig=AOvVaw2d88D_mQlsqHXYTZrg8IHP&ust=1743455141309000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPiMztTasowDFQAAAAAdAAAAABAI"
          })
        }
      })
    } catch {
      return response.status(400).json({
        error: true,
        messagem: "Houve um erro ao tentar buscar a imagem, por favor, tente novamente."
      })
    }
  }

  upload = async (request, response) => {
    if (request.file) {
      sharp(request.file)
        .resize(800)
        .toFormat("jpeg", { quality: 70 })

      return response.status(200).json({
        messagem: "Upload realizado com sucesso!",
        path: request.file.path
      })
    }
  
    return response.status(400).json({
      error: true,
      messagem: `
        Houve um erro ao tentar realizar o upload. Verique se a imagem está correta, caso sim, verifique
        se as extenções das images são permitidas. [ ".jpeg", ".jpg", ".png", ".webp" ]
      `
    })
  }
}

export { StorageController }
