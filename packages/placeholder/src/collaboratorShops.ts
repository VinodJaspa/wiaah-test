import { CollaboratorCategory, CollaboratorShop } from "types";
import { products } from "./products";


const cates = ["Dress", "Home", "Jewelry", "Clothing"];

const getRandomProduct = () => {
  return products[Math.floor(Math.random() * products.length)];
};
const getRandomShops = (): CollaboratorShop[] => {
  const shops: CollaboratorShop[] = [];
  for (let i = 0; i < 7; i++) {
    const { name, imgUrl } = getRandomProduct();
    shops.push({
      name,
      location: "test location",
      thumbnailUrl: imgUrl,
      id: `${Math.random() * 100}`,
    });
  }

  return shops;
};

export const CollaboratorsShops: CollaboratorCategory[] = cates.map((cate) => ({
  name: cate,
  shops: getRandomShops(),
}));
