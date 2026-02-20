"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"

interface Pizza {
  id: string
  name: string
  description: string
  price: number
  image: string
}

interface PizzaCustomizationModalProps {
  pizza: Pizza
  allPizzas: Pizza[]
  isOpen: boolean
  onClose: () => void
}

const STUFFED_CRUSTS = [
  { id: "catupiry", name: "Catupiry", price: 8 },
  { id: "cheddar", name: "Cheddar", price: 8 },
  { id: "cream-cheese", name: "Cream Cheese", price: 10 },
  { id: "chocolate", name: "Chocolate", price: 10 },
]

const EXTRAS = [
  { id: "extra-cheese", name: "Queijo Extra", price: 6 },
  { id: "bacon", name: "Bacon", price: 7 },
  { id: "pepperoni", name: "Pepperoni", price: 8 },
  { id: "onion", name: "Cebola Caramelizada", price: 5 },
]

// 🔹 NOVO: tamanhos da pizza
const PIZZA_SIZES = [
  { id: "small", name: "Pequena", description: "4 fatias", extraPrice: 0 },
  { id: "medium", name: "Média", description: "6 fatias", extraPrice: 5 },
  { id: "large", name: "Grande", description: "8 fatias", extraPrice: 10 },
] as const

type PizzaSize = (typeof PIZZA_SIZES)[number]

export function PizzaCustomizationModal({
  pizza,
  allPizzas,
  isOpen,
  onClose,
}: PizzaCustomizationModalProps) {
  const { addItem } = useCart()
  const [isHalfAndHalf, setIsHalfAndHalf] = useState(false)
  const [secondHalfPizza, setSecondHalfPizza] = useState<Pizza | null>(null)
  const [selectedCrust, setSelectedCrust] =
    useState<(typeof STUFFED_CRUSTS)[0] | null>(null)
  const [selectedExtras, setSelectedExtras] = useState<typeof EXTRAS>([])
  // 🔹 NOVO: tamanho selecionado (padrão: média)
  const [selectedSize, setSelectedSize] = useState<PizzaSize>(PIZZA_SIZES[1])

  const totalPrice = useMemo(() => {
    let price = pizza.price

    if (isHalfAndHalf && secondHalfPizza) {
      price = Math.max(pizza.price, secondHalfPizza.price)
    }

    // 🔹 aplica adicional do tamanho
    if (selectedSize) {
      price += selectedSize.extraPrice
    }

    if (selectedCrust) {
      price += selectedCrust.price
    }

    selectedExtras.forEach((extra) => {
      price += extra.price
    })

    return price
  }, [
    pizza.price,
    isHalfAndHalf,
    secondHalfPizza,
    selectedCrust,
    selectedExtras,
    selectedSize,
  ])

  const toggleExtra = (extra: (typeof EXTRAS)[0]) => {
    setSelectedExtras((prev) => {
      const exists = prev.find((e) => e.id === extra.id)
      if (exists) {
        return prev.filter((e) => e.id !== extra.id)
      }
      return [...prev, extra]
    })
  }

  const handleAddToCart = () => {
    const sizeLabel = selectedSize?.name ?? ""

    const baseName =
      isHalfAndHalf && secondHalfPizza
        ? `${pizza.name} / ${secondHalfPizza.name}`
        : pizza.name

    // 🔹 nome da pizza inclui o tamanho
    const pizzaName = sizeLabel ? `${baseName} (${sizeLabel})` : baseName

    addItem({
      id: pizza.id,
      name: pizzaName,
      price: totalPrice,
      image: pizza.image,
      pizzaOptions: {
        halfAndHalf:
          isHalfAndHalf && secondHalfPizza
            ? {
                firstHalf: pizza.name,
                secondHalf: secondHalfPizza.name,
              }
            : undefined,
        stuffedCrust: selectedCrust
          ? {
              name: selectedCrust.name,
              price: selectedCrust.price,
            }
          : undefined,
        extras:
          selectedExtras.length > 0
            ? selectedExtras.map((e) => ({
                name: e.name,
                price: e.price,
              }))
            : undefined,
      },
    })

    // Reset state
    setIsHalfAndHalf(false)
    setSecondHalfPizza(null)
    setSelectedCrust(null)
    setSelectedExtras([])
    setSelectedSize(PIZZA_SIZES[1]) // volta pra média
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="relative h-48 w-full flex-shrink-0">
          <Image
            src={pizza.image || "/placeholder.svg"}
            alt={pizza.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl font-bold text-white">{pizza.name}</h2>
            <p className="text-white/80 text-sm">{pizza.description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 🔹 Tamanho */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-card-foreground">
              Tamanho
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {PIZZA_SIZES.map((size) => {
                const isSelected = selectedSize.id === size.id
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`flex flex-col items-start justify-between p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50 bg-card"
                    }`}
                  >
                    <div>
                      <span className="font-medium text-card-foreground">
                        {size.name}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {size.description}
                      </p>
                    </div>
                    {size.extraPrice > 0 && (
                      <span className="mt-1 text-sm text-primary font-semibold">
                        +R${" "}
                        {size.extraPrice.toFixed(2).replace(".", ",")}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Meio a Meio */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-card-foreground">
                Meio a Meio
              </h3>
              <button
                onClick={() => {
                  setIsHalfAndHalf(!isHalfAndHalf)
                  if (isHalfAndHalf) setSecondHalfPizza(null)
                }}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  isHalfAndHalf ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    isHalfAndHalf ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {isHalfAndHalf && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-2 bg-muted/50 rounded-lg">
                {allPizzas
                  .filter((p) => p.id !== pizza.id)
                  .map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSecondHalfPizza(p)}
                      className={`p-2 rounded-lg text-sm font-medium transition-all border-2 ${
                        secondHalfPizza?.id === p.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-transparent bg-card hover:border-primary/50 text-card-foreground"
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
              </div>
            )}
          </div>

          {/* Borda Recheada */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-card-foreground">
              Borda Recheada
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {STUFFED_CRUSTS.map((crust) => (
                <button
                  key={crust.id}
                  onClick={() =>
                    setSelectedCrust(
                      selectedCrust?.id === crust.id ? null : crust,
                    )
                  }
                  className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                    selectedCrust?.id === crust.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 bg-card"
                  }`}
                >
                  <span className="font-medium text-card-foreground">
                    {crust.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-primary font-semibold">
                      +R$ {crust.price.toFixed(2).replace(".", ",")}
                    </span>
                    {selectedCrust?.id === crust.id && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Adicionais */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-card-foreground">
              Adicionais
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {EXTRAS.map((extra) => {
                const isSelected = selectedExtras.some(
                  (e) => e.id === extra.id,
                )
                return (
                  <button
                    key={extra.id}
                    onClick={() => toggleExtra(extra)}
                    className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50 bg-card"
                    }`}
                  >
                    <span className="font-medium text-card-foreground">
                      {extra.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-primary font-semibold">
                        +R$ {extra.price.toFixed(2).replace(".", ",")}
                      </span>
                      {isSelected && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground">Total:</span>
            <span className="text-2xl font-bold text-primary">
              R$ {totalPrice.toFixed(2).replace(".", ",")}
            </span>
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={isHalfAndHalf && !secondHalfPizza}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
          >
            Adicionar ao Carrinho
          </Button>
        </div>
      </div>
    </div>
  )
}
