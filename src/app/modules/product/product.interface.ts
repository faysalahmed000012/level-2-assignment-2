interface TVariant {
  type: string;
  value: string;
}

interface TProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: Array<string>;
  variants: Array<TVariant>;
  inventory: {
    quantity: number;
    inStock: boolean;
  };
}
