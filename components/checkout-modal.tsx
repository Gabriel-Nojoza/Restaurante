"use client"

import { useState } from "react"
import { Send, MapPin, User, Phone } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CheckoutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const WHATSAPP_NUMBER = "5585996703367"

// 🔹 Valor fixo da taxa de entrega
const DELIVERY_FEE = 7.9

export function CheckoutModal({ open, onOpenChange }: CheckoutModalProps) {
  const { items, total: cartTotal, clearCart } = useCart()

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    deliveryType: "",
    address: "",
    complement: "",
    paymentMethod: "",
  })

  // 🔹 Subtotal = total do carrinho
  const subtotal = cartTotal

  // 🔹 Taxa de entrega só se for delivery
  const deliveryFee = formData.deliveryType === "delivery" && items.length > 0 ? DELIVERY_FEE : 0

  // 🔹 Total final = subtotal + taxa
  const finalTotal = subtotal + deliveryFee

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.deliveryType || !formData.paymentMethod) {
      alert("Por favor, preencha todos os campos obrigatórios")
      return
    }

    if (formData.deliveryType === "delivery" && !formData.address) {
      alert("Por favor, informe o endereço de entrega")
      return
    }

    const orderItems = items
      .map(
        (item) =>
          `• ${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity)
            .toFixed(2)
            .replace(".", ",")}${item.observation ? ` (${item.observation})` : ""}`,
      )
      .join("\n")

    const deliveryInfo =
      formData.deliveryType === "delivery"
        ? `\n\n📍 *Endereço de entrega:*\n${formData.address}${
            formData.complement ? `\nComplemento: ${formData.complement}` : ""
          }`
        : "\n\n🏪 *Retirada no local*"

    const deliveryText =
      formData.deliveryType === "delivery"
        ? `\n🚚 *Taxa de entrega:* R$ ${deliveryFee.toFixed(2).replace(".", ",")}`
        : ""

    const message =
      `🍽️ *NOVO PEDIDO - Restaurante Sabor & Arte*\n\n` +
      `👤 *Cliente:* ${formData.name}\n` +
      `📱 *Telefone:* ${formData.phone}\n` +
      `💳 *Pagamento:* ${formData.paymentMethod}\n` +
      deliveryInfo +
      `\n\n📋 *Itens do Pedido:*\n${orderItems}\n\n` +
      `💰 *Subtotal:* R$ ${subtotal.toFixed(2).replace(".", ",")}` +
      deliveryText +
      `\n💰 *TOTAL: R$ ${finalTotal.toFixed(2).replace(".", ",")}*\n\n` +
      `Aguardo confirmação! 🙏`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")
    clearCart()
    onOpenChange(false)
    setFormData({
      name: "",
      phone: "",
      deliveryType: "",
      address: "",
      complement: "",
      paymentMethod: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-card-foreground">
            Finalizar Pedido
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2 text-card-foreground">
              <User className="h-4 w-4" />
              Nome *
            </Label>
            <Input
              id="name"
              placeholder="Seu nome completo"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-input text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2 text-card-foreground">
              <Phone className="h-4 w-4" />
              Telefone *
            </Label>
            <Input
              id="phone"
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-input text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-card-foreground">Tipo de Entrega *</Label>
            <Select
              value={formData.deliveryType}
              onValueChange={(value) => setFormData({ ...formData, deliveryType: value })}
            >
              <SelectTrigger className="bg-input text-foreground">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delivery">🚗 Delivery</SelectItem>
                <SelectItem value="pickup">🏪 Retirar no Local</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.deliveryType === "delivery" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2 text-card-foreground">
                  <MapPin className="h-4 w-4" />
                  Endereço *
                </Label>
                <Textarea
                  id="address"
                  placeholder="Rua, número, bairro..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="bg-input text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="complement" className="text-card-foreground">
                  Complemento
                </Label>
                <Input
                  id="complement"
                  placeholder="Apartamento, bloco, referência..."
                  value={formData.complement}
                  onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                  className="bg-input text-foreground"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label className="text-card-foreground">Forma de Pagamento *</Label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
            >
              <SelectTrigger className="bg-input text-foreground">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dinheiro">💵 Dinheiro</SelectItem>
                <SelectItem value="Cartão de Crédito">💳 Cartão de Crédito</SelectItem>
                <SelectItem value="Cartão de Débito">💳 Cartão de Débito</SelectItem>
                <SelectItem value="PIX">📱 PIX</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Resumo do pedido */}
          <div className="bg-secondary rounded-lg p-4 space-y-2">
            <h4 className="font-semibold text-secondary-foreground">Resumo do Pedido</h4>
            <div className="space-y-1 text-sm text-secondary-foreground">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span>
                    R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                  </span>
                </div>
              ))}
            </div>

            {/* Subtotal / Taxa / Total */}
            <div className="mt-2 space-y-1 text-sm text-secondary-foreground">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
              </div>

              <div className="flex justify-between">
                <span>Taxa de entrega</span>
                <span>
                  {deliveryFee > 0
                    ? `R$ ${deliveryFee.toFixed(2).replace(".", ",")}`
                    : "R$ 0,00"}
                </span>
              </div>

              <div className="border-t border-border pt-2 flex justify-between font-bold text-lg">
                <span className="text-secondary-foreground">Total:</span>
                <span className="text-primary">
                  R$ {finalTotal.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full h-14 text-lg bg-green-600 hover:bg-green-700 text-white"
          >
            <Send className="h-5 w-5 mr-2" />
            Enviar Pedido via WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
