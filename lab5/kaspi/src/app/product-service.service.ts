import { Injectable } from '@angular/core';
import { Product } from './product';
import { error } from 'node:console';


@Injectable({
  providedIn: 'root',
})

export class ProductService {
  url = 'http://localhost:3000/products';

  async getAllProducts(): Promise<Product[]> {
    try {
      const data = await fetch(this.url);
      return (await data.json()) ?? [];

    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }
  

  async getProductById(id: string): Promise<Product | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }

  async setLike(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.url}/${id}`);
      if (!response.ok) throw new Error("Failed to fetch item");
  
      const item = await response.json();
  
      const updateResponse = await fetch(`${this.url}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ likes: item.likes + 1 })
      });
  
      if (!updateResponse.ok) throw new Error("Failed to update likes");
  
      const data = await updateResponse.json();
      console.log("Updated:", data);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
  

}