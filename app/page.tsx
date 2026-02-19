"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { MenuSection } from "@/components/menu-section"
import { Cart } from "@/components/cart"
import { CartProvider } from "@/contexts/cart-context"

type Category = "promocoes" | "pratos" | "pizzas" | "bebidas"

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("promocoes")

  const categories: { key: Category; label: string; icon: string }[] = [
    { key: "promocoes", label: "Promoções", icon: "🔥" },
    { key: "pratos", label: "Pratos", icon: "🍽️" },
    { key: "pizzas", label: "Pizzas", icon: "🍕" },
    { key: "bebidas", label: "Bebidas", icon: "🥤" },
  ]

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 pb-32">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Nosso Cardápio</h1>
            <p className="text-muted-foreground text-lg">Escolha seus pratos favoritos e faça seu pedido</p>
          </div>

          <div className="flex justify-start md:justify-center gap-2 md:gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 md:px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                  activeCategory === cat.key
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card text-card-foreground hover:bg-secondary border border-border"
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          <MenuSection category={activeCategory} />
        </main>
        <Cart />
      </div>
    </CartProvider>
  )
}
