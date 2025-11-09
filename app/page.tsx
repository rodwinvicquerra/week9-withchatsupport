import { redirect } from 'next/navigation'

// Force dynamic rendering for redirect
export const dynamic = 'force-dynamic'

export default function Home() {
  redirect('/sign-in')
}
