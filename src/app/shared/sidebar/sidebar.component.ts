import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  perfil = localStorage.getItem('nombre');
  role= localStorage.getItem('role');

  menuItems: any[]; //dasboard
  menuItems1: any[]; //usuarios
  menuItems2: any[]; //categorias
  menuItems3: any[]; //productos
  constructor(private sidebarService: SidebarService,private router: Router) {

    this.menuItems = sidebarService.menu;
    this.menuItems1= sidebarService.menu1;
    this.menuItems2= sidebarService.menu2;
    this.menuItems3= sidebarService.menu3;
    console.log(this.menuItems);

  }

  ngOnInit(): void {
    $('[data-widget="treeview"]').Treeview('init');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('nombre');
    localStorage.removeItem('role');
    this.router.navigateByUrl('/login');
  }

}
