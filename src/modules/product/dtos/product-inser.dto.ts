export interface ProductInsertDTO {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category_id: number;
}