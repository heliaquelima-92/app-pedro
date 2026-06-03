import './globals.css';

export const metadata = {
  title: 'EduKids - Aprenda Brincando!',
  description: 'Sistema educativo interativo para crianças aprenderem vogais, formas, números e praticar fala.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
