// app/dashboard/page.tsx
'use client'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Avatar, 
  Container,
  Paper
} from '@mui/material'

interface TikTokUser {
  open_id: string
  union_id: string
  avatar_url?: string
  display_name?: string
  bio_description?: string
  follower_count?: number
  following_count?: number
  likes_count?: number
}

export default async function DashboardPage() {
  const cookieStore = cookies()
  const userDataCookie = cookieStore.get('tiktok_user')
  
  if (!userDataCookie?.value) {
    redirect('/')
  }
  
  const userData: TikTokUser = JSON.parse(userDataCookie.value)
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Dashboard
        </Typography>
        
        {/* Profile Card */}
        <Paper elevation={3} sx={{ mb: 4, p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            {userData.avatar_url && (
              <Avatar 
                src={userData.avatar_url} 
                alt={userData.display_name}
                sx={{ width: 80, height: 80, mr: 3 }}
              />
            )}
            <Box>
              <Typography variant="h4" gutterBottom>
                {userData.display_name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {userData.bio_description}
              </Typography>
            </Box>
          </Box>
          
          {/* Stats Grid */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h4" align="center">
                    {userData.follower_count?.toLocaleString() ?? 0}
                  </Typography>
                  <Typography variant="body1" align="center" color="text.secondary">
                    Followers
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h4" align="center">
                    {userData.following_count?.toLocaleString() ?? 0}
                  </Typography>
                  <Typography variant="body1" align="center" color="text.secondary">
                    Following
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h4" align="center">
                    {userData.likes_count?.toLocaleString() ?? 0}
                  </Typography>
                  <Typography variant="body1" align="center" color="text.secondary">
                    Likes
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  )
}