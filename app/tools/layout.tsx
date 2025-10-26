import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tools',
  description: 'Curated AI tools directory with quick filters and search.',
}

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
