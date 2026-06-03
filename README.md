# 🌟 EduKids

Sistema educativo interativo para crianças aprenderem **vogais**, **formas geométricas**, **números** e praticar **fala e pronúncia** usando reconhecimento de voz no navegador.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

---

## ✨ Funcionalidades

| Módulo | Descrição |
|--------|-----------|
| 🔤 **Vogais** | A, E, I, O, U com sons, animações e palavras associadas (Abacaxi, Elefante...) |
| 🔷 **Formas** | Círculo, Quadrado, Triângulo, Estrela, Coração com cores e sons |
| 🔢 **Números** | Contagem visual de 1 a 10 com frutas e narração |
| 🎤 **Fala** | Exercícios de pronúncia usando Web Speech API (microfone) |

- 🎉 **Confetes animados** ao completar cada nível
- ⭐ **Sistema de estrelas** salvo no navegador
- 📱 **Responsivo** — funciona no celular e computador
- 🔊 **Síntese de voz** em português do Brasil
- 🎨 **Design colorido e amigável** para crianças

---

## 🚀 Deploy no Vercel (Recomendado)

### 1. Crie um repositório no GitHub

```bash
# No seu computador, dentro da pasta do projeto:
git init
git add .
git commit -m "Primeiro commit - EduKids"

# Crie um repositório vazio no GitHub (ex: github.com/seuusuario/edukids)
# Depois conecte:
git remote add origin https://github.com/seuusuario/edukids.git
git branch -M main
git push -u origin main
```

### 2. Conecte no Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com sua conta do GitHub
2. Clique em **"Add New Project"**
3. Selecione o repositório `edukids`
4. O Vercel detecta automaticamente que é um projeto Next.js
5. Clique em **"Deploy"**
6. Pronto! Seu app estará online em segundos com URL do tipo `edukids.vercel.app`

> **Dica:** Toda vez que você fizer `git push`, o Vercel faz deploy automático!

---

## 💻 Rodar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org) 18+ instalado
- npm (vem com Node.js)

### Passo a passo

```bash
# 1. Baixe o projeto e entre na pasta
cd edukids

# 2. Instale as dependências
npm install

# 3. Rode o servidor de desenvolvimento
npm run dev

# 4. Abra no navegador
# http://localhost:3000
```

---

## 📁 Estrutura do Projeto

```
edukids/
├── app/
│   ├── vogais/
│   │   └── page.tsx          # Tela de vogais
│   ├── formas/
│   │   └── page.tsx          # Tela de formas geométricas
│   ├── numeros/
│   │   └── page.tsx          # Tela de números 1-10
│   ├── fala/
│   │   └── page.tsx          # Exercícios de pronúncia
│   ├── layout.tsx            # Layout raiz
│   ├── page.tsx              # Menu principal
│   └── globals.css           # Estilos globais + animações
├── components/
│   ├── SpeakButton.tsx       # Botão de síntese de voz
│   ├── VoiceExercise.tsx     # Componente de reconhecimento de voz
│   ├── BackButton.tsx        # Botão de voltar
│   ├── Confetti.tsx          # Animação de confetes
│   └── ProgressBar.tsx       # Barra de progresso
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

---

## 🎤 Sobre o Reconhecimento de Voz

O módulo de **Fala e Pronúncia** usa a **Web Speech API** (`webkitSpeechRecognition`), disponível nativamente nos navegadores:

| Navegador | Suporte |
|-----------|---------|
| Google Chrome | ✅ Completo |
| Microsoft Edge | ✅ Completo |
| Safari | ⚠️ Parcial (síntese apenas) |
| Firefox | ❌ Não suporta reconhecimento |

> **Recomendação:** Use **Google Chrome** no computador ou **Chrome para Android** para o reconhecimento de voz funcionar perfeitamente.

---

## 🛠️ Tecnologias

- **Next.js 14** — Framework React com App Router
- **React 18** — Biblioteca de UI
- **TypeScript** — Tipagem estática
- **Tailwind CSS** — Estilização utilitária
- **Web Speech API** — Síntese e reconhecimento de voz
- **LocalStorage** — Persistência de progresso (estrelas)

---

## 📝 Licença

Projeto educativo de código aberto. Sinta-se livre para modificar e usar com seus filhos ou em sala de aula!

---

Feito com 💜 para crianças aprenderem brincando.
