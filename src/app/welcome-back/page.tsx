import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import { isWelcomeBackExpired } from '@/lib/welcomeBack'
import WelcomeBackGate from './WelcomeBackGate'
import WelcomeBackOffer from './WelcomeBackOffer'
import WelcomeBackClosed from './WelcomeBackClosed'

export const metadata: Metadata = {
  title: 'Welcome back | TAT for Animals',
  robots: { index: false, follow: false },
}

export default async function WelcomeBackPage() {
  // Read the cookie first. The expiry check below asks for the current time,
  // which Next refuses to answer while prerendering — reading Request data
  // ahead of it takes this page off the prerender path so both can run.
  const cookieStore = await cookies()

  if (isWelcomeBackExpired()) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center px-6 py-20">
        <WelcomeBackClosed />
      </main>
    )
  }

  const unlocked = cookieStore.get('welcome_back_unlocked')?.value === '1'

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6 py-20">
      {unlocked ? <WelcomeBackOffer /> : <WelcomeBackGate />}
    </main>
  )
}
