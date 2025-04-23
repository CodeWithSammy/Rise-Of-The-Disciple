export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {children}
      </div>
    </main>
  );
}