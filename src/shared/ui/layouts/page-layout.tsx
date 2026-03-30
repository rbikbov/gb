export function PageLayout({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <main
      className={
        'container mx-auto min-h-screen m-full px-10 flex flex-col' +
        (className ? ' ' + className : '')
      }
      role="main"
    >
      {children}
    </main>
  )
}
