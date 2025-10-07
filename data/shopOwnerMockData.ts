// Mock Data for Shop Owner Interface

// Shop Owner Dashboard KPI Data
export const shopOwnerKpiData = [
  { label: "Total Mechanics", value: "12", icon: "Users", change: "+2 this month" },
  { label: "Total Bookings", value: "456", icon: "Calendar", change: "+15% from last month" },
  { label: "Total Revenue", value: "$24,850", icon: "DollarSign", change: "+23% from last month" },
  { label: "Today's Bookings", value: "8", icon: "Clock", change: "3 pending approval" },
]

// Revenue per Mechanic Chart Data
export const revenuePerMechanicData = [
  { mechanic: "John D.", revenue: 3200 },
  { mechanic: "Sarah K.", revenue: 2800 },
  { mechanic: "Mike R.", revenue: 2400 },
  { mechanic: "Lisa M.", revenue: 2100 },
  { mechanic: "Tom W.", revenue: 1900 },
  { mechanic: "Anna S.", revenue: 1700 },
]

// Top Earning Mechanics
export const topEarningMechanics = [
  { 
    id: 1,
    name: "John Doe", 
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    earnings: "$3,200", 
    bookings: 45, 
    rating: 4.9,
    expertise: "Engine Repair",
    avatar: "/placeholder-user.jpg"
  },
  { 
    id: 2,
    name: "Sarah Kim", 
    email: "sarah.kim@example.com",
    phone: "+1 (555) 987-6543",
    earnings: "$2,800", 
    bookings: 38, 
    rating: 4.8,
    expertise: "Brake Systems",
    avatar: "/placeholder-user.jpg"
  },
  { 
    id: 3,
    name: "Mike Rodriguez", 
    email: "mike.rodriguez@example.com",
    phone: "+1 (555) 456-7890",
    earnings: "$2,400", 
    bookings: 32, 
    rating: 4.7,
    expertise: "Transmission",
    avatar: "/placeholder-user.jpg"
  },
]

// Shop Details
export const shopDetails = {
  id: 1,
  name: "AutoFix Pro",
  address: "123 Main Street, Downtown, NY 10001",
  phone: "+1 (555) 234-5678",
  email: "contact@autofixpro.com",
  openingHours: {
    monday: "8:00 AM - 6:00 PM",
    tuesday: "8:00 AM - 6:00 PM",
    wednesday: "8:00 AM - 6:00 PM",
    thursday: "8:00 AM - 6:00 PM",
    friday: "8:00 AM - 6:00 PM",
    saturday: "9:00 AM - 4:00 PM",
    sunday: "Closed"
  },
  description: "Professional automotive repair services with certified mechanics and quality parts. We specialize in engine diagnostics, brake repair, and routine maintenance.",
  services: [
    "Engine Diagnostics & Repair",
    "Brake System Maintenance",
    "Oil Changes & Fluid Services",
    "Transmission Services",
    "Electrical System Repair",
    "AC & Heating Services",
    "Tire Installation & Balancing",
    "Battery Replacement"
  ],
  logo: "/placeholder-logo.png",
  rating: 4.8,
  totalReviews: 324
}

// Shop Mechanics List (mechanics currently in this shop)
export const shopMechanics = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    totalEarnings: 3200,
    expertise: "Engine Repair",
    experience: "5 years",
    joinDate: "2023-01-15",
    rating: 4.9,
    completedBookings: 45,
    avatar: "/placeholder-user.jpg"
  },
  {
    id: 2,
    name: "Sarah Kim",
    email: "sarah.kim@example.com",
    phone: "+1 (555) 987-6543",
    status: "Active",
    totalEarnings: 2800,
    expertise: "Brake Systems",
    experience: "4 years",
    joinDate: "2023-03-20",
    rating: 4.8,
    completedBookings: 38,
    avatar: "/placeholder-user.jpg"
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    email: "mike.rodriguez@example.com",
    phone: "+1 (555) 456-7890",
    status: "Active",
    totalEarnings: 2400,
    expertise: "Transmission",
    experience: "6 years",
    joinDate: "2022-11-10",
    rating: 4.7,
    completedBookings: 32,
    avatar: "/placeholder-user.jpg"
  },
  {
    id: 4,
    name: "Lisa Martinez",
    email: "lisa.martinez@example.com",
    phone: "+1 (555) 789-0123",
    status: "Invited",
    totalEarnings: 0,
    expertise: "Electrical Systems",
    experience: "3 years",
    joinDate: "2024-10-05",
    rating: 4.6,
    completedBookings: 0,
    avatar: "/placeholder-user.jpg"
  }
]

// Available Mechanics (mechanics not in any shop that can be invited)
export const availableMechanics = [
  {
    id: 10,
    name: "Carlos Rivera",
    email: "carlos.rivera@example.com",
    phone: "+1 (555) 234-5678",
    expertise: "Engine Diagnostics",
    experience: "8 years",
    rating: 4.8,
    avatar: "/placeholder-user.jpg",
    isAvailable: true
  },
  {
    id: 11,
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    phone: "+1 (555) 345-6789",
    expertise: "Suspension Systems",
    experience: "4 years",
    rating: 4.7,
    avatar: "/placeholder-user.jpg",
    isAvailable: true
  },
  {
    id: 12,
    name: "David Chen",
    email: "david.chen@example.com",
    phone: "+1 (555) 456-7891",
    expertise: "Hybrid Vehicle Repair",
    experience: "6 years",
    rating: 4.9,
    avatar: "/placeholder-user.jpg",
    isAvailable: true
  },
  {
    id: 13,
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    phone: "+1 (555) 567-8912",
    expertise: "Paint & Body Work",
    experience: "5 years",
    rating: 4.6,
    avatar: "/placeholder-user.jpg",
    isAvailable: true
  },
  {
    id: 14,
    name: "James Thompson",
    email: "james.thompson@example.com",
    phone: "+1 (555) 678-9123",
    expertise: "Diesel Engine Repair",
    experience: "12 years",
    rating: 4.8,
    avatar: "/placeholder-user.jpg",
    isAvailable: false // Already in another shop
  },
  {
    id: 15,
    name: "Sophie Brown",
    email: "sophie.brown@example.com",
    phone: "+1 (555) 789-1234",
    expertise: "Auto Glass Repair",
    experience: "3 years",
    rating: 4.5,
    avatar: "/placeholder-user.jpg",
    isAvailable: false // Already in another shop
  }
]

// Legacy export for backward compatibility
export const allMechanics = shopMechanics

// Revenue Analytics Data
export const monthlyRevenueData = [
  { month: "Jan", revenue: 18500 },
  { month: "Feb", revenue: 21200 },
  { month: "Mar", revenue: 19800 },
  { month: "Apr", revenue: 24100 },
  { month: "May", revenue: 22800 },
  { month: "Jun", revenue: 24850 },
]

export const revenueAnalytics = {
  totalRevenue: 24850,
  averageBookingValue: 165,
  completedBookings: 456,
  canceledBookings: 23,
  topRevenueGeneratingMechanic: {
    name: "John Doe",
    revenue: 3200,
    percentage: 12.9
  }
}

// Recent Activities for Shop Owner
export const shopOwnerRecentActivities = [
  { text: "New booking: Engine diagnostic by John Doe", time: "5 min ago" },
  { text: "Booking completed: Brake repair - $285", time: "12 min ago" },
  { text: "Mechanic Sarah Kim marked available", time: "23 min ago" },
  { text: "Customer review: 5 stars for Mike Rodriguez", time: "1 hour ago" },
  { text: "New service request: AC repair", time: "2 hours ago" },
]

// Shop Owner Profile Data
export const shopOwnerProfile = {
  shopName: "AutoFix Pro",
  ownerName: "Robert Johnson",
  email: "robert@autofixpro.com",
  phone: "+1 (555) 234-5678",
  address: "123 Main Street, Downtown, NY 10001",
  joinDate: "2022-05-15",
  avatar: "/placeholder-user.jpg"
}