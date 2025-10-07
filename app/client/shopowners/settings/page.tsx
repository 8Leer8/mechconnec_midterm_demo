"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { 
  Settings as SettingsIcon,
  User,
  Mail,
  Phone,
  MapPin,
  Upload,
  Save,
  RotateCcw,
  Moon,
  Sun,
  Shield,
  Bell,
  Eye,
  EyeOff
} from "lucide-react"
import { shopOwnerProfile } from "@/data/shopOwnerMockData"

// Settings Header Component
const SettingsHeader = React.memo(() => (
  <div>
    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
    <p className="text-muted-foreground mt-2">Manage your account settings and preferences.</p>
  </div>
))

SettingsHeader.displayName = "SettingsHeader"

// Profile Settings Component
const ProfileSettings = React.memo(() => {
  const [profile, setProfile] = useState(shopOwnerProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
    setIsEditing(true)
  }

  const handleSaveProfile = () => {
    // In a real app, this would save to backend
    console.log("Saving profile:", profile)
    setIsEditing(false)
  }

  const handleCancelProfile = () => {
    setProfile(shopOwnerProfile)
    setIsEditing(false)
  }

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!")
      return
    }
    if (passwordData.newPassword.length < 8) {
      alert("Password must be at least 8 characters long!")
      return
    }
    
    // In a real app, this would validate current password and update
    console.log("Changing password")
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    alert("Password changed successfully!")
  }

  const handleImageUpload = () => {
    // In a real app, this would handle file upload
    console.log("Image upload would be handled here")
  }

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.avatar} alt={profile.ownerName} />
              <AvatarFallback>
                {profile.ownerName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" onClick={handleImageUpload} className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Change Avatar
              </Button>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
            </div>
          </div>

          {/* Profile Form */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ownerName">Full Name</Label>
              <Input
                id="ownerName"
                value={profile.ownerName}
                onChange={(e) => handleProfileChange('ownerName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shopName">Shop Name</Label>
              <Input
                id="shopName"
                value={profile.shopName}
                onChange={(e) => handleProfileChange('shopName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => handleProfileChange('phone', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Shop Address</Label>
            <Input
              id="address"
              value={profile.address}
              onChange={(e) => handleProfileChange('address', e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleSaveProfile} 
              disabled={!isEditing}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
            <Button 
              variant="outline" 
              onClick={handleCancelProfile}
              disabled={!isEditing}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                placeholder="Enter current password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                placeholder="Enter new password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              placeholder="Confirm new password"
            />
          </div>

          <Button 
            onClick={handlePasswordChange}
            disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
            className="flex items-center gap-2"
          >
            <Shield className="h-4 w-4" />
            Change Password
          </Button>
        </CardContent>
      </Card>
    </div>
  )
})

ProfileSettings.displayName = "ProfileSettings"

// Theme and Preferences Component  
const ThemeAndPreferences = React.memo(() => {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    bookingAlerts: true,
    paymentAlerts: true,
    marketingEmails: false
  })

  useEffect(() => {
    // Check current theme
    const isDark = localStorage.getItem("darkMode") === "true"
    setDarkMode(isDark)
  }, [])

  const handleDarkModeToggle = (enabled: boolean) => {
    setDarkMode(enabled)
    localStorage.setItem("darkMode", enabled.toString())
    if (enabled) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark themes
              </p>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={handleDarkModeToggle}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                checked={notifications.emailNotifications}
                onCheckedChange={(value) => handleNotificationChange('emailNotifications', value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications in browser
                </p>
              </div>
              <Switch
                checked={notifications.pushNotifications}
                onCheckedChange={(value) => handleNotificationChange('pushNotifications', value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Booking Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about new bookings
                </p>
              </div>
              <Switch
                checked={notifications.bookingAlerts}
                onCheckedChange={(value) => handleNotificationChange('bookingAlerts', value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Payment Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about payments and revenue
                </p>
              </div>
              <Switch
                checked={notifications.paymentAlerts}
                onCheckedChange={(value) => handleNotificationChange('paymentAlerts', value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">
                  Receive promotional and marketing emails
                </p>
              </div>
              <Switch
                checked={notifications.marketingEmails}
                onCheckedChange={(value) => handleNotificationChange('marketingEmails', value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label className="text-sm font-medium text-muted-foreground">Member Since</Label>
              <p className="text-base font-medium">
                {new Date(shopOwnerProfile.joinDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-muted-foreground">Account Type</Label>
              <p className="text-base font-medium">Shop Owner</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
})

ThemeAndPreferences.displayName = "ThemeAndPreferences"

export default function SettingsPage() {
  return (
    <div className="space-y-8 page-enter">
      <SettingsHeader />

      <div className="grid gap-8 lg:grid-cols-2">
        <ProfileSettings />
        <ThemeAndPreferences />
      </div>
    </div>
  )
}