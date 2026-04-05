export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-bg via-background to-blue-bg">
      {children}
    </div>
  );
}
