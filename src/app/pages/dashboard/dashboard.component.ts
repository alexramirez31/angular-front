import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DashboardService } from 'src/app/services/dashboard.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit  {
  
  view: any[] = [700, 400];
  producto_total:any=[];
  producto_grafico:any=[];
  categorias_total:any=[];
  categorias_grafico:any=[];
  single:any=[];
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  
  legend: boolean = true;
  legendPosition: string = 'below';
//  single = [
//     {
//       "name": "Germany",
//       "value": 8940000
//     },
//     {
//       "name": "USA",
//       "value": 5000000
//     },
//     {
//       "name": "France",
//       "value": 7200000
//     },
//       {
//       "name": "UK",
//       "value": 6200000
//     }
//   ];

  constructor(private dashboardSvc: DashboardService,private http:HttpClient) {
    //Object.assign(this, { single });
  }

  ngOnInit(): void {
    this.obtenerDashboard();
    
  }


  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  //Obtener Productos
  obtenerDashboard(){
    this.dashboardSvc.obtenerDashboard().subscribe((res:any) =>{
      this.producto_total=res[0][0];
      this.single=res[1];
      this.categorias_total=res[2][0];
      //    console.log(res[1]);
      // const reader = new FileReader();
      // reader.onload= this.productos

      //this.dtTrigger.next();
    });
  }
}




