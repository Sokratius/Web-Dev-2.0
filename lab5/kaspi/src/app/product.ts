export interface Product {
    id: string;
    title: string;
    price: number;
    category: string;
    rating: number;
    description?: string;
    likes: number;
    images: Record<number, string>;
}