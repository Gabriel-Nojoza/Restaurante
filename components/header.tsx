import { UtensilsCrossed } from "lucide-react"

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-6 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3">
          <UtensilsCrossed className="h-8 w-8" />
          <h1 className="text-2xl md:text-3xl font-bold">Restaurante Sabor & Arte</h1>
        </div>
        <p className="text-center mt-2 text-primary-foreground/80">O melhor da culinária em sua mesa</p>
      </div>
    </header>
  )
}
