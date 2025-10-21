// /lib/site.ts
export const SOCIAL = {
  // Twitter/X – beides anbieten, damit SocialBar.tsx beides versteht
  x: '',                  // z.B. 'https://x.com/deinprofil'
  twitter: '',            // optionaler Alias: 'https://twitter.com/deinprofil'

  linkedin: '',           // 'https://www.linkedin.com/in/deinprofil'
  instagram: '',          // ''
  threads: '',            // 'https://www.threads.net/@deinprofil'
  tiktok: '',             // 'https://www.tiktok.com/@deinprofil'

  // Newsletter / E-Mail – ebenfalls mit Alias
  newsletter: '',         // z.B. 'https://newsletter.deinname.com' ODER 'mailto:you@example.com'
  email: ''               // optionaler Alias: 'mailto:you@example.com'
} as const
