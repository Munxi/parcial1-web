export default function Page() {
  return (
      <main style={{
        minHeight: '100vh',
        margin: 0,
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 48px)', color: '#111111', margin: 0 }}>
          Welcome to BookStore
        </h1>
      </main>
  );
}