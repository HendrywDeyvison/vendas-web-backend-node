export interface ProductModel {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category_id: number;
  createdAt: Date;
  updatedAt: Date;
}
