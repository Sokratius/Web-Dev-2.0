import { Component, inject, EventEmitter } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product-service.service'
import { ProductCardComponent } from "../product-card/product-card.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent, CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  route = inject(ActivatedRoute);
  category?: string;

  productService = inject(ProductService);
  products: Product[] = [];
  filteredProducts: Product[] | undefined;
  
  filterCategory(category: string) : void {
    this.category = category;
    this.filteredProducts = category
      ? this.products.filter((product) => product.category === category)
      : [...this.products];
  }

  removedData() {
    if (typeof window === 'undefined') return;

    const data = localStorage.getItem('removed');
    const removed = data ? JSON.parse(data) : [];

    removed.forEach((id: string) => {
      this.products = this.products.filter(product => product.id !== id);
      console.log("not done", id)
      console.log(this.products)
    });
  }

  constructor() {
    this.category = this.route.snapshot.params['category'];
    this.productService.getAllProducts().then((products: Product[]) => {
        const data = localStorage.getItem('removed');
        const removed = data ? JSON.parse(data) : [];

        this.products = products.filter(product => !removed.includes(product.id));
        this.filteredProducts = [...this.products];
    });
}

  onProductRemove(id: string) {
    console.log("get id to delete", id);

    this.filteredProducts = this.filteredProducts?.filter(product => product.id !== id);
    this.products = this.products.filter(product => product.id !== id);

    const data = localStorage.getItem('removed');
    const removed: string[] = data ? JSON.parse(data) : [];

    if (!removed.includes(id)) {
      removed.push(id);
      localStorage.setItem('removed', JSON.stringify(removed));
    }
  }

  filterResults(text: string) { 
    this.filterCategory(this.category!);
    if (!text) {
      this.filteredProducts = this.products;
      return;
    }
    if(this.category) {
      this.filteredProducts = this.filteredProducts?.filter((product) =>
        product?.title.toLowerCase().includes(text.toLowerCase()),
      );
    } else {
      this.filteredProducts = this.products.filter((product) =>
        product?.title.toLowerCase().includes(text.toLowerCase()),
      );
    }
  }
}
