"use client"

import { useState } from "react"
import { ShoppingCart, Plus, Minus, Trash2, Send } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CheckoutModal } from "./checkout-modal"

export function Cart() {
  const { items, itemCount, total, updateQuantity, removeItem, updateObservation } = useCart()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-primary hover:bg-primary/90 text-primary-foreground z-50"
            size="icon"
          >
            <ShoppingCart className="h-7 w-7" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg bg-card">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-card-foreground flex items-center gap-2">
              <ShoppingCart className="h-6 w-6" />
              Seu Carrinho
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <ShoppingCart className="h-16 w-16 mb-4 opacity-50" />
              <p className="text-lg">Seu carrinho está vazio</p>
              <p className="text-sm">Adicione itens do cardápio</p>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-secondary rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-secondary-foreground">{item.name}</h4>
                        <p className="text-primary font-bold">R$ {item.price.toFixed(2).replace(".", ",")}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive/80 p-1"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-card rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 flex items-center justify-center rounded bg-muted hover:bg-muted/80 text-foreground"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-semibold text-card-foreground">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 flex items-center justify-center rounded bg-muted hover:bg-muted/80 text-foreground"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="font-bold text-secondary-foreground ml-auto">
                        R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                      </p>
                    </div>

                    <Input
                      placeholder="Observação (ex: sem cebola)"
                      value={item.observation || ""}
                      onChange={(e) => updateObservation(item.id, e.target.value)}
                      className="bg-card text-card-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 pb-20 space-y-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-card-foreground">Total:</span>
                  <span className="text-primary">R$ {total.toFixed(2).replace(".", ",")}</span>
                </div>
                <Button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Finalizar Pedido
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <CheckoutModal open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen} />
    </>
  )
}
