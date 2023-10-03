export class Producto{
    constructor(
        public id: string,
        public id_categoria: string,
        public nombre: string,
        public imagen: string,
        public stock:string,
        public precio_compra?: string,
        public precio_venta?:string,
    ){}

}