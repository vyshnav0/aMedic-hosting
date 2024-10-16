import { Component, OnInit } from '@angular/core';
import { ProductService } from "../services/product.service";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
// HomeComponent is using the OnInit lifecycle hook
export class HomeComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {  // the lifecycle hook mentioned above, runs when comp is initialised

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.log("error fetching products from backend", err);
      }
    });
  }

  goToMedDesc(productId: string): void{
    this.router.navigate(['/meds',productId])
  }
}
