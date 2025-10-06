"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
        <p className="text-muted-foreground mt-2">Configure platform-wide settings</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Branding</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platform-name">Platform Name</Label>
              <Input id="platform-name" defaultValue="MechConnect" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex gap-2">
                <Input id="primary-color" defaultValue="#FF6B35" />
                <div className="w-12 h-10 rounded-lg border border-border" style={{ backgroundColor: "#FF6B35" }} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" defaultValue="Connect with trusted mechanics" />
            </div>
            <Button className="w-full">Save Branding</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="support-email">Support Email</Label>
              <Input id="support-email" type="email" defaultValue="support@mechconnect.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="support-phone">Support Phone</Label>
              <Input id="support-phone" type="tel" defaultValue="+63 123 456 7890" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" defaultValue="123 Main Street, Manila, Philippines" />
            </div>
            <Button className="w-full">Save Contact Info</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notif">Email Notifications</Label>
              <input type="checkbox" id="email-notif" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notif">SMS Notifications</Label>
              <input type="checkbox" id="sms-notif" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notif">Push Notifications</Label>
              <input type="checkbox" id="push-notif" className="w-4 h-4" />
            </div>
            <Button className="w-full">Save Preferences</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>System Maintenance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
              <input type="checkbox" id="maintenance-mode" className="w-4 h-4" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maintenance-msg">Maintenance Message</Label>
              <Textarea id="maintenance-msg" placeholder="System is under maintenance. We'll be back soon!" />
            </div>
            <Button className="w-full">Update Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
