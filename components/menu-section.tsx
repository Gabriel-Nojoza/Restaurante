import { MenuCard } from "./menu-card"

const promocoes = [
  {
    id: "promo-1",
    name: "Combo Família",
    description: "1 Pizza Grande + 1 Porção de Batata Frita + 2L Refrigerante",
    price: 79.9,
    originalPrice: 99.9,
    image: "/family-combo-pizza-fries-soda.jpg",
    isPromo: true,
  },
  {
    id: "promo-2",
    name: "2 Pizzas pelo Preço de 1.5",
    description: "Escolha 2 pizzas grandes e pague apenas 1 pizza e meia",
    price: 67.9,
    originalPrice: 89.9,
    image: "/two-pizzas-promotion-deal.jpg",
    isPromo: true,
  },
  {
    id: "promo-3",
    name: "Combo Executivo",
    description: "Prato do dia + Suco Natural + Sobremesa",
    price: 34.9,
    originalPrice: 48.9,
    image: "/executive-lunch-combo-plate-juice-dessert.jpg",
    isPromo: true,
  },
  {
    id: "promo-4",
    name: "Happy Hour - Petiscos",
    description: "3 porções de petiscos variados + Balde de cerveja (5 long necks)",
    price: 89.9,
    originalPrice: 120.0,
    image: "/happy-hour-snacks-beer-bucket-appetizers.jpg",
    isPromo: true,
  },
]

const bebidas = [
  {
    id: "bebida-1",
    name: "Coca-Cola 2L",
    description: "Refrigerante Coca-Cola gelado 2 litros",
    price: 12.9,
    image: "/coca-cola-2-liter-bottle.jpg",
  },
  {
    id: "bebida-2",
    name: "Guaraná Antarctica 2L",
    description: "Refrigerante Guaraná Antarctica gelado 2 litros",
    price: 10.9,
    image: "/guarana-antarctica-2-liter-bottle.jpg",
  },
  {
    id: "bebida-3",
    name: "Suco Natural 500ml",
    description: "Suco natural da fruta (laranja, limão, maracujá ou abacaxi)",
    price: 9.9,
    image: "/fresh-natural-orange-juice-glass.jpg",
  },
  {
    id: "bebida-4",
    name: "Água Mineral 500ml",
    description: "Água mineral sem gás",
    price: 4.9,
    image: "/mineral-water-bottle-500ml.jpg",
  },
  {
    id: "bebida-5",
    name: "Cerveja Long Neck",
    description: "Cerveja Heineken, Budweiser ou Stella Artois",
    price: 12.9,
    image: "/beer-long-neck-bottle-heineken.jpg",
  },
  {
    id: "bebida-6",
    name: "Caipirinha",
    description: "Caipirinha de limão, morango ou maracujá",
    price: 18.9,
    image: "/brazilian-caipirinha-lime-cocktail.jpg",
  },
  {
    id: "bebida-7",
    name: "Milk Shake",
    description: "Milk shake cremoso (chocolate, morango ou ovomaltine)",
    price: 16.9,
    image: "/creamy-chocolate-milkshake-with-whipped-cream.jpg",
  },
  {
    id: "bebida-8",
    name: "Água de Coco",
    description: "Água de coco natural 500ml",
    price: 7.9,
    image: "/coconut-water-bottle-natural.jpg",
  },
]

const pratos = [
  {
    id: "prato-1",
    name: "Filé à Parmegiana",
    description: "Filé de frango empanado com molho de tomate e queijo gratinado, acompanha arroz e fritas",
    price: 42.9,
    image: "/chicken-parmigiana-with-rice-and-fries.jpg",
  },
  {
    id: "prato-2",
    name: "Picanha Grelhada",
    description: "Picanha suculenta grelhada no ponto, acompanha arroz, feijão tropeiro e vinagrete",
    price: 58.9,
    image: "/grilled-picanha-steak-with-rice-and-beans.jpg",
  },
  {
    id: "prato-3",
    name: "Salmão ao Molho de Maracujá",
    description: "Filé de salmão grelhado com molho de maracujá, acompanha purê de batatas e legumes",
    price: 65.9,
    image: "/grilled-salmon-with-passion-fruit-sauce.jpg",
  },
  {
    id: "prato-4",
    name: "Feijoada Completa",
    description: "Tradicional feijoada com arroz, couve, farofa, laranja e torresmo",
    price: 48.9,
    image: "/brazilian-feijoada-with-rice-and-sides.jpg",
  },
  {
    id: "prato-5",
    name: "Strogonoff de Carne",
    description: "Strogonoff cremoso de carne com arroz branco e batata palha",
    price: 38.9,
    image: "/beef-stroganoff-with-rice-and-potato-sticks.jpg",
  },
  {
    id: "prato-6",
    name: "Frango Grelhado",
    description: "Peito de frango grelhado com ervas finas, acompanha salada e arroz integral",
    price: 32.9,
    image: "/grilled-chicken-breast-with-salad-and-rice.jpg",
  },
]

const pizzas = [
  {
    id: "pizza-1",
    name: "Pizza Margherita",
    description: "Molho de tomate, mussarela, tomate fatiado e manjericão fresco",
    price: 45.9,
    image: "/margherita-pizza-with-fresh-basil.jpg",
  },
  {
    id: "pizza-2",
    name: "Pizza Calabresa",
    description: "Molho de tomate, mussarela e calabresa fatiada com cebola",
    price: 42.9,
    image: "/pepperoni-pizza-with-onions.jpg",
  },
  {
    id: "pizza-3",
    name: "Pizza Quatro Queijos",
    description: "Molho de tomate, mussarela, provolone, gorgonzola e parmesão",
    price: 52.9,
    image: "/four-cheese-pizza.png",
  },
  {
    id: "pizza-4",
    name: "Pizza Portuguesa",
    description: "Molho de tomate, mussarela, presunto, ovos, cebola, azeitona e ervilha",
    price: 48.9,
    image: "/portuguese-pizza.png",
  },
  {
    id: "pizza-5",
    name: "Pizza Frango com Catupiry",
    description: "Molho de tomate, mussarela, frango desfiado e catupiry",
    price: 49.9,
    image: "/chicken-cream-cheese-pizza.png",
  },
  {
    id: "pizza-6",
    name: "Pizza Bacon",
    description: "Molho de tomate, mussarela, bacon crocante e cebola caramelizada",
    price: 47.9,
    image: "/bacon-pizza-with-caramelized-onions.jpg",
  },
]

interface MenuSectionProps {
  category: "promocoes" | "pratos" | "pizzas" | "bebidas"
}

export function MenuSection({ category }: MenuSectionProps) {
  const getItems = () => {
    switch (category) {
      case "promocoes":
        return promocoes
      case "pratos":
        return pratos
      case "pizzas":
        return pizzas
      case "bebidas":
        return bebidas
      default:
        return []
    }
  }

  const items = getItems()
  const isPizza = category === "pizzas"

  return (
    <div>
      {category === "promocoes" && (
        <div className="mb-6 p-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl border border-primary/30 text-center">
          <p className="text-lg font-semibold text-primary">Aproveite nossas ofertas especiais!</p>
          <p className="text-sm text-muted-foreground">Promoções por tempo limitado</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} isPizza={isPizza} allPizzas={isPizza ? pizzas : []} />
        ))}
      </div>
    </div>
  )
}
