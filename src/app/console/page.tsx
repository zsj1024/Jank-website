import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/shadcn/card'
import { FileText, Users, Activity } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold tracking-tight'>仪表盘</h1>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>文章总数</CardTitle>
            <FileText className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>--</div>
            <p className='text-xs text-muted-foreground'>管理您的所有文章</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>访问统计</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>--</div>
            <p className='text-xs text-muted-foreground'>网站访问量统计</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>最近活动</CardTitle>
            <Activity className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>--</div>
            <p className='text-xs text-muted-foreground'>最近更新的内容</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
