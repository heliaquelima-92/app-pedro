# 🐷 PigoKids

Sistema educativo interativo **100% estático** para crianças aprenderem vogais, formas, números e praticar fala.

**Personalizado para: Pedro**

---

## 🚀 Deploy no Vercel (SUPER FÁCIL)

### Método 1: Upload direto (recomendado)

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Escolha **"Other"** → **"Static"**
3. Arraste a pasta com os 5 arquivos HTML
4. Clique em **Deploy**
5. Pronto! Seu site estará online em segundos

### Método 2: GitHub

```bash
# Crie um novo repositório no GitHub (vazio)
# NÃO use o repositório antigo que está com erro!

# Entre na pasta
cd pigokids-static

# Inicialize git
git init
git add .
git commit -m "PigoKids v1.0"

# Conecte ao novo repositório
git remote add origin https://github.com/SEU-USUARIO/pigokids.git
git branch -M main
git push -u origin main
```

Depois conecte no Vercel: [vercel.com/new](https://vercel.com/new) → importe o repo.

---

## 📁 Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `index.html` | Menu principal com 4 módulos |
| `vogais.html` | A, E, I, O, U com sons |
| `formas.html` | Círculo, Quadrado, Triângulo, Estrela, Coração |
| `numeros.html` | Contagem de 1 a 10 com frutas |
| `fala.html` | Exercícios de pronúncia com microfone |

---

## 🎤 Reconhecimento de Voz

Funciona em:
- ✅ Google Chrome (PC e Android)
- ✅ Microsoft Edge
- ❌ Safari (iPhone) — só síntese de voz
- ❌ Firefox

---

## 📝 Para trocar o nome da criança

Abra cada arquivo `.html` e procure por "Pedro". Troque para o nome desejado.

Ou use Find & Replace em todos os arquivos de uma vez.

---

Feito com 💜 para Pedro aprender brincando!
