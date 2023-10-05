import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [{
    titulo: 'Dashboard',
    icono: '"nav-icon fas fa-tachometer-alt',
    submenu: [
      { titulo: 'Dashboard', url: 'dashboard' },
    ]

  }];
 
  menu1: any[] = [{
    titulo: 'Usuarios',
    icono: '"nav-icon fas fa-user-alt',
    submenu: [
      { titulo: 'Usuarios', url: 'usuarios' },
      { titulo: 'Extensiones', url: 'extensiones' },
  
    ]

  }];

  menu2: any[] = [{

    titulo: 'Categoria',
    icono: '"nav-icon fas  fa-qrcode',
    submenu: [
      { titulo: 'Categorias', url: 'categorias' },
     
    ]
  }];

  menu3: any[] = [{

    titulo: 'Productos',
    icono: '"nav-icon fa fa-cart-plus',
    submenu: [
      { titulo: 'Productos', url: 'productos' },
      { titulo: 'Stock', url: 'stock' },
    ]
  }];

  
  constructor() { }
}


// PASO1. crear componente categoria
// PASO2. agregar a routing ruta de categiria creada
// PASO3. Crear en servicios de sidebar el nombre del submenu
// Paso4. Realizar plantilla de HTML 

// PASO5. Creamos el controlador y la ruta 