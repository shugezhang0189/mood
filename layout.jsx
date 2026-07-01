export const metadata = {
  title: 'MOOD — 美学知识库',
  description: '激发美的灵感，从灵感到认知。',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#F7F5F2' }}>
        {children}
      </body>
    </html>
  )
}
