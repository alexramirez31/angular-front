export class Producto{
    constructor(
        public nombre: string,
        public id_categoria: string,
        public stock:string,
        public imagen?: string,
        public precio_compra?: string,
        public precio_venta?:string,
    ){}

}