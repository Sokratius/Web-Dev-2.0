import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product-service.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() productCard!: Product;
  productService = inject(ProductService);


  @Output() removeProduct = new EventEmitter<string>();
  onRemove() {
    this.removeProduct.emit(this.productCard.id);
  }

  onLiked(): void {
    this.productService.setLike(this.productCard.id);
  }

  // onRemove(id: string): void {
  //   console.log(id);
  //   const data = localStorage.getItem('removed');
  //   const removed = data ? JSON.parse(data) : [];
  //   console.log(removed, id);
  // }

  getTelegramLink(): string {
    const message = `Здравствуйте, интересует данный товар. У вас он имеется в наличии? \nhttps://kaspi.kz/shop/p/c-${this.productCard.id}`;
    return `https://t.me/EraEKV?text=${encodeURIComponent(message)}`;
  }
}
