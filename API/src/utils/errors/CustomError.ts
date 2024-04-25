class CustomError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = this.constructor.name; // Asegura que el nombre del error sea el nombre de la clase
    Object.setPrototypeOf(this, CustomError.prototype); // Necesario para establecer el prototipo correctamente en la instancia
  }
}

export default CustomError;
