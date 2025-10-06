"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Coins } from "lucide-react"

const pricingTiers = [
  { amount: 100, tokens: 10, popular: false },
  { amount: 500, tokens: 60, popular: true },
  { amount: 1000, tokens: 130, popular: false },
]

export default function PricingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Token Pricing</h1>
        <p className="text-muted-foreground mt-2">Configure token pricing tiers</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {pricingTiers.map((tier, index) => (
          <Card
            key={index}
            className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
              tier.popular ? "border-primary shadow-md" : ""
            }`}
          >
            <CardHeader>
              {tier.popular && <div className="text-xs font-semibold text-primary mb-2">MOST POPULAR</div>}
              <CardTitle className="text-3xl font-bold">₱{tier.amount}</CardTitle>
              <div className="text-muted-foreground mt-2">{tier.tokens} Tokens</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`amount-${index}`}>Amount (₱)</Label>
                <Input id={`amount-${index}`} type="number" defaultValue={tier.amount} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`tokens-${index}`}>Tokens</Label>
                <Input id={`tokens-${index}`} type="number" defaultValue={tier.tokens} />
              </div>
              <Button className="w-full">Update Pricing</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Add New Pricing Tier</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new-amount">Amount (₱)</Label>
              <Input id="new-amount" type="number" placeholder="Enter amount" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-tokens">Tokens</Label>
              <Input id="new-tokens" type="number" placeholder="Enter tokens" />
            </div>
          </div>
          <Button className="mt-4">
            <Coins className="h-4 w-4 mr-2" />
            Add Tier
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
