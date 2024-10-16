import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderHistoryService } from '../services/order-history.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { HeaderComponent } from '../header/header.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {



  orderHistory: any[] = [];
  productId: string = '';
  userId: string = '';

  constructor(private route: ActivatedRoute, private orderHistoryService: OrderHistoryService, private userService: UserService, private productService: ProductService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = id; // Assign only if id is not null

      this.userService.getUserDetails().subscribe({
        next: (user) => {
          this.userId = user._id;

          this.productService.getProductById(this.productId).subscribe({
            next: (product)=>{
              console.log(product);

              this.orderHistoryService.getOrderHistory(this.productId, this.userId).subscribe({
                next: (data: any[]) => {
                  // console.log("boo", data);
                  this.orderHistory = data.map(order => ({
                    orderRef: order._id,
                    productName: `${product.name}, ${product.companyName} `,
                    quantity: order.quantity,
                    totalPrice: order.quantity * product.price,
                    orderDate: new Date(order.orderDate),
                    stockAtOrder: order.stockAtOrder
                  }));

                  // sorting based on date
                  this.orderHistory.sort((a, b)=> 
                    b.orderDate.getTime() - a.orderDate.getTime()
                  );
                },
                error: (err) => {
                  console.error("error fetching order history", err);
                }
              });
              
            }
          })
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }


}
