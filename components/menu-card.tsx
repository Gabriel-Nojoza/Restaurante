"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Tag } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { PizzaCustomizationModal } from "./pizza-customization-modal"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  isPromo?: boolean
}

interface MenuCardProps {
  item: MenuItem
  isPizza?: boolean
  allPizzas?: MenuItem[]
}

export function MenuCard({ item, isPizza = false, allPizzas = [] }: MenuCardProps) {
  const { addItem } = useCart()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => {
    if (isPizza) {
      setIsModalOpen(true)
    } else {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      })
    }
  }

  const discountPercentage = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0

  return (
    <>
      <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-card relative">
        {item.isPromo && (
          <div className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
            <Tag className="h-4 w-4" />-{discountPercentage}%
          </div>
        )}

        <div className="relative h-48 w-full">
          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-bold text-card-foreground mb-1">{item.name}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>

          <div className="flex items-center gap-2">
            {item.originalPrice && (
              <p className="text-lg text-muted-foreground line-through">
                R$ {item.originalPrice.toFixed(2).replace(".", ",")}
              </p>
            )}
            <p className={`text-2xl font-bold ${item.isPromo ? "text-green-600" : "text-primary"}`}>
              R$ {item.price.toFixed(2).replace(".", ",")}
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button onClick={handleClick} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-5 w-5 mr-2" />
            {isPizza ? "Personalizar Pizza" : "Adicionar ao Carrinho"}
          </Button>
        </CardFooter>
      </Card>

      {isPizza && (
        <PizzaCustomizationModal
          pizza={item}
          allPizzas={allPizzas}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}
