
import { ProductCardProps } from "@blocks";
import { faker } from "@faker-js/faker";

// ---------------- MOCK DATA ----------------
const randomNames = ["John Doe", "Emily Smith", "Michael Johnson", "Sophia Brown", "David Wilson", "Olivia Taylor", "James Miller", "Emma Davis", "Daniel Martinez", "Ava Anderson"];
const getRandomName = () => randomNames[Math.floor(Math.random() * randomNames.length)];
const getRandomImage = (id: number) => `https://picsum.photos/seed/${id}/400/300`;

export const getMockProductData = (start: number, count: number): ProductCardProps[] => {
    return [...Array(count)].flatMap((_, idx) => {
        const id = start + idx;

        return [
            // HOTEL
            {
                productInfo: {
                    reviews: 420,
                    discount: 20,
                    id: `${id}-shop`,

                    cashback: 10,
                    price: 120,
                    rating: 4.6,
                    thumbnail: getRandomImage(id),
                    value: faker.lorem.slug(),
                    colors: ["red", "yellow"]
                },

                sellerInfo: {
                    id: `${id}-s1`,
                    name: getRandomName(),
                    profession: "Manager",
                    thumbnail: getRandomImage(id + 10),
                    verified: true,
                },
            },


        ] as unknown as ProductCardProps[];
    });
};
