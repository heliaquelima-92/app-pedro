import React, { useState } from 'react';
import { motion } from 'framer-motion';

const dadosLetras = [
  {
    id: 'A',
    imagem: '/imagens/abelha.png',
    audioPergunta: '/audios/pergunta-a.mp3',
    audioDica: '/audios/dica-a.mp3',
    audioSucesso: '/audios/sucesso-a.mp3',
  },
  {
    id: 'B',
    imagem: '/imagens/bola.png',
    audioPergunta: '/audios/pergunta-b.mp3',
    audioDica: '/audios/dica-b.mp3',
    audioSucesso: '/audios/sucesso-b.mp3',
  },
  {
    id: 'C',
    imagem: '/imagens/cachorro.png',
    audioPergunta: '/audios/pergunta-c.mp3',
    audioDica: '/audios/dica-c.mp3',
    audioSucesso: '/audios/sucesso-c.mp3',
  }
];

export default function App() {
  const [fase, setFase] = useState('inicio'); // inicio, jogando, acertou
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [mostrarDica, setMostrarDica] = useState(false);

  const letraAlvo = dadosLetras[indiceAtual];

  const tocarAudio = (caminho) => {
    const audio = new Audio(caminho);
    audio.play();
  };

  const iniciarJogo = () => {
    tocarAudio('/audios/boas-vindas.mp3');
    setTimeout(() => {
      setFase('jogando');
      tocarAudio(letraAlvo.audioPergunta);
    }, 2500);
  };

  const repetirPergunta = () => {
    tocarAudio(letraAlvo.audioPergunta);
  };

  const lidarComClique = (letraClicada) => {
    if (fase === 'acertou') return; // Se já acertou, não deixa clicar nas outras até ir pro próximo

    if (letraClicada === letraAlvo.id) {
      setMostrarDica(false);
      setFase('acertou');
      tocarAudio(letraAlvo.audioSucesso);
    } else {
      setMostrarDica(true);
      tocarAudio(letraAlvo.audioDica);
    }
  };

  const irParaProximo = () => {
    const proximoIndice = (indiceAtual + 1) % dadosLetras.length; // Volta pro 0 se chegar no final
    setIndiceAtual(proximoIndice);
    setMostrarDica(false);
    setFase('jogando');
    tocarAudio(dadosLetras[proximoIndice].audioPergunta);
  };

  // Cores que remetem a jogos infantis (suaves e alegres)
  const corFundo = '#FFF8E7'; // Creme suave
  const corTabuleiro = '#FFFFFF';
  const corLetra = '#4A90E2'; // Azul amigável

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: corFundo, fontFamily: 'sans-serif', margin: 0 }}>
      
      {fase === 'inicio' && (
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={iniciarJogo}
          style={{ fontSize: '3rem', padding: '30px 60px', borderRadius: '30px', backgroundColor: '#FF9F1C', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 8px 0 #E58E1A, 0 15px 20px rgba(0,0,0,0.2)', fontWeight: 'bold' }}
        >
          ▶️ Jogar
        </motion.button>
      )}

      {(fase === 'jogando' || fase === 'acertou') && (
        <div style={{ position: 'relative', width: '90%', maxWidth: '1000px', height: '70vh', backgroundColor: corTabuleiro, borderRadius: '50px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '8px solid #F0F0F0' }}>
          
          {/* Botão de Repetir Áudio (Alto-falante) */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={repetirPergunta}
            style={{ position: 'absolute', top: '30px', left: '30px', fontSize: '3rem', background: 'none', border: 'none', cursor: 'pointer', backgroundColor: '#E8F4F8', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 10px rgba(0,0,0,0.1)' }}
          >
            🔊
          </motion.button>

          <div style={{ display: 'flex', gap: '50px', alignItems: 'center', marginTop: fase === 'acertou' ? '-80px' : '0' }}>
            {['A', 'B', 'C'].map((letra) => (
              <div key={letra} style={{ position: 'relative' }}>
                
                {/* Imagem da Dica */}
                {mostrarDica && letra === letraAlvo.id && (
                  <motion.img 
                    initial={{ scale: 0, y: 50 }}
                    animate={{ scale: 1, y: -20, rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    src={letraAlvo.imagem} 
                    alt="Dica"
                    style={{ position: 'absolute', top: '-140px', left: '50%', transform: 'translateX(-50%)', width: '160px', zIndex: 10 }}
                  />
                )}

                {/* Cartão da Letra */}
                <motion.button
                  whileHover={fase === 'jogando' ? { scale: 1.05 } : {}}
                  whileTap={fase === 'jogando' ? { scale: 0.95 } : {}}
                  onClick={() => lidarComClique(letra)}
                  animate={fase === 'acertou' && letra === letraAlvo.id ? { y: [0, -20, 0], scale: 1.1 } : {}}
                  style={{
                    width: '220px',
                    height: '280px',
                    fontSize: '9rem',
                    fontWeight: 'bold',
                    color: (fase === 'acertou' && letra !== letraAlvo.id) ? '#CCC' : corLetra, // Esconde as outras se ele acertar
                    backgroundColor: '#FAFAFA',
                    borderRadius: '30px',
                    border: (fase === 'acertou' && letra === letraAlvo.id) ? '8px solid #4CAF50' : '6px dashed #DDD',
                    cursor: fase === 'jogando' ? 'pointer' : 'default',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {letra}
                </motion.button>
              </div>
            ))}
          </div>

          {/* Botão Próximo (Só aparece quando acerta) */}
          {fase === 'acertou' && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={irParaProximo}
              style={{ position: 'absolute', bottom: '40px', fontSize: '2.5rem', padding: '20px 50px', borderRadius: '30px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 8px 0 #388E3C, 0 15px 20px rgba(0,0,0,0.2)', fontWeight: 'bold' }}
            >
              Próximo ➡️
            </motion.button>
          )}

        </div>
      )}
    </div>
  );
}
