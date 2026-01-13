import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Calendar, FileText, Users, TrendingUp, Eye } from "lucide-react"

const stats = [
  { name: "Total Testimonials", value: "24", icon: MessageSquare, change: "+12%" },
  { name: "Total Bookings", value: "156", icon: Calendar, change: "+8%" },
  { name: "Blog Posts", value: "32", icon: FileText, change: "+5%" },
]

const recentActivity = [
  { type: "booking", message: "New booking from John Smith", time: "5 min ago" },
  { type: "testimonial", message: "New testimonial submitted", time: "1 hour ago" },
  { type: "user", message: "New user registration", time: "2 hours ago" },
  { type: "blog", message: "Blog post published", time: "3 hours ago" },
]

const clients = [
  { client: "Sarah Johnson", service: "Wedding Photography", date: "Jan 15, 2026" },
  { client: "Mike Chen", service: "Portrait Session", date: "Jan 18, 2026" },
  { client: "Emily Davis", service: "Event Photography", date: "Jan 20, 2026" },
  { client: "Alex Brown", service: "Product Photography", date: "Jan 22, 2026" },
]

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-gold text-3xl font-serif font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's an overview of your site.</p>
      </div>

      {/* Stats Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
              <stat.icon className="w-5 h-5 text-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div> */}

      {/* Recent Activity & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-gold" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <span className="text-sm">{activity.message}</span>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}

        <Card className="bg-amber-50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gold" />
              Upcoming Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clients.map((booking, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{booking.client}</p>
                    <p className="text-xs text-muted-foreground">{booking.service}</p>
                  </div>
                  <span className="text-xs text-gold">{booking.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard
