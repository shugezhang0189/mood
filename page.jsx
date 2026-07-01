'use client'
import dynamic from 'next/dynamic'
const MoodApp = dynamic(() => import('./MoodApp'), { ssr: false })
export default function Home() {
  return <MoodApp />
}