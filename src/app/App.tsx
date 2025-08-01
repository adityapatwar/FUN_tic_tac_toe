import React from 'react'
import { RootLayout } from './layouts/RootLayout'
import { GamePage } from '../features/game/pages/GamePage'

export default function App() {
  return (
    <RootLayout>
      <GamePage />
    </RootLayout>
  )
}
