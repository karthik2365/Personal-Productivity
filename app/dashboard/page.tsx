export default function Home() {
  return (
    <div className="flex flex-col gap-6 w-full px-6">
      {/* Welcome Message */}
      <div className="rounded-lg border bg-card p-6 text-[rgb(37,99,235)] w-full">
        <h2 className="text-lg font-semibold mb-4">Welcome to your Productivity Hub</h2>
        <p className="text-muted-foreground">
          Select a category from the sidebar to get started with your productivity journey.
        </p>
      </div>

      {/* Grid for Cards - Spans Full Width */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-card p-6 text-[rgb(37,99,235)] w-full">
            <div className="h-40 rounded-md bg-muted/50 w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}