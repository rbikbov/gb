export function PageLayout({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "container mx-auto min-h-screen m-full px-10" +
        (className ? " " + className : "")
      }
    >
      {children}
    </div>
  );
}
