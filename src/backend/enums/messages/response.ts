export enum MessageResponse {
    SUCCESS = "Operación realizada con éxito",
    CREATED = "Recurso creado exitosamente",
    NO_CONTENT = "Operación exitosa, sin contenido para retornar",
    BAD_REQUEST = "Solicitud inválida. Por favor, revisa los datos enviados",
    INVALID_CREDENTIALS = "Credenciales invalidas",
    NOT_FOUND = "Recurso no encontrado",
    ERROR_SERVER = "Problemas con el servidor",
    ERROR_CONNECTION_DB = "Error al conectarse a la base de datos",
    UNKNOWN_ERROR = "Ocurrió un error desconocido",
    ACCESS_DENIED = "Acceso no autorizado"
}