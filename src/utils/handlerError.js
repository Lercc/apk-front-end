function handlerError(response, error) {
    let code
    let title
    let text
    let message

    if(response){

        switch (response.status) {
            case 200:
                title = 'OK'
                text = 'La solicitud ha tenido éxito'
                break;
            case 201:
                title = 'CREADO'
                text = 'La solicitud ha tenido éxito y se ha creado un nuevo recurso'
                break;
            case 202:
                title = 'ACEPTADO'
                text = 'La solicitud se ha recibido'
                break;
            case 204:
                title = 'ELIMINADO'
                text = 'La petición se ha completado con éxito'
                break;
            default:
                break;
        }
        code = response.status

    } else if (error) {
        if(error.response) {

            switch (error.response.status) {
                case 400:
                    title = 'PETICIÓN INVÁLIDA'
                    text = 'La solicitud ha tenido éxito'
                    break;
                case 401:
                    title = 'NO AUTORIZADO'
                    text = 'Es necesario autenticar su suario.'
                    break;
                case 403:
                    title = 'NO PERMITIDO'
                    text = 'No posee los permisos necesarios para cierto contenido'
                    break;
                case 404:
                    title = 'NO ENCONTRADO'
                    text = 'Recurso no encontrado.'
                    break;
                case 405:
                    title = 'MÉTODO NO PERMITIDO'
                    text = 'El método solicitado es conocido por el servidor pero ha sido deshabilitado.'
                    break;
                case 422:
                    title = 'REGISTRO NO PROCESADO'
                    
                    //desestructurar los campos a validar
                    campos = error.response.data
                    
                    text = 'Ingrese correctamente los campos requeridos:'

                    break;
                default:
                    break;
            }
            code = error.response.status
        } else {
            message = error.message
        }

        
    }

    return {code, title, text, }

}

export {handlerError}