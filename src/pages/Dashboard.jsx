import React, { useState } from 'react'

const Dashboard = () => {
  const [user, setUser] = useState('Guest')

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user}!</p>
      <p>This is your personalized dashboard. Stay tuned for more features from Oasis Wishes!</p>
    </div>
  )
}

export default Dashboard
