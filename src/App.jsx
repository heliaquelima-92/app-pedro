import React, { useState, useEffect } from 'react';
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
  const [fase, setFase] = useState('inicio');
  const [letraAlvo, setLetraAlvo] = useState(dadosLetras[0]);
  const [mostrarDica, setMostrarDica] = useState(false);

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

  const lidarComClique = (letraClicada) => {
    if (letraClicada === letraAlvo.id) {
      setMostrarDica(false);
      tocarAudio(letraAlvo.audioSucesso);
      setTimeout(() => alert("Foi para a próxima letra! (Em breve)"), 3000); 
    } else {
      setMostrarDica(true);
      tocarAudio(letraAlvo.audioDica);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#F0F8FF', fontFamily: 'sans-serif' }}>
      
      {fase === 'inicio' && (
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={iniciarJogo}
          style={{ fontSize: '3rem', padding: '20px 40px', borderRadius: '20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
        >
          ▶️ Jogar
        </motion.button>
      )}

      {fase === 'jogando' && (
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          {['A', 'B', 'C'].map((letra) => (
            <div key={letra} style={{ position: 'relative' }}>
              
              {mostrarDica && letra === letraAlvo.id && (
                <motion.img 
                  initial={{ scale: 0, y: 50 }}
                  animate={{ scale: 1, y: -20 }}
                  src={letraAlvo.imagem} 
                  alt="Dica"
                  style={{ position: 'absolute', top: '-120px', left: '-20px', width: '150px', zIndex: 10 }}
                />
              )}

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => lidarComClique(letra)}
                style={{
                  width: '200px',
                  height: '250px',
                  fontSize: '8rem',
                  fontWeight: 'bold',
                  color: '#333',
                  backgroundColor: '#FFF',
                  borderRadius: '20px',
                  border: '5px solid #DDD',
                  cursor: 'pointer',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {letra}
              </motion.button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
