import './globals.css';

export const metadata = {
  title: 'PigoKids - Aprenda Brincando!',
  description: 'Sistema educativo interativo para crianças aprenderem vogais, formas, números e praticar fala.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            min-height: 100vh;
            font-family: 'Comic Sans MS', 'Chalkboard SE', cursive, sans-serif;
            color: white;
          }
          a { text-decoration: none; color: inherit; }
          button { cursor: pointer; border: none; font-family: inherit; }
        `}} />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
