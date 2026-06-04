// 🎯 CONFIGURAÇÃO DO APP
// Troque o nome aqui se quiser personalizar para outra criança!

export const KID_NAME = 'Pedro';

export const MESSAGES = {
  // Mensagens de parabéns ao acertar
  success: [
    `Muito bem, ${KID_NAME}! 🎉`,
    `Isso aí, ${KID_NAME}! Você é demais! 🌟`,
    `Parabéns, ${KID_NAME}! Acertou! 🏆`,
    `Show, ${KID_NAME}! Continue assim! 🚀`,
    `Incrível, ${KID_NAME}! 🎊`,
  ],

  // Dicas motivacionais
  hints: [
    `Vamos lá, ${KID_NAME}! Você consegue! 💪`,
    `Preste atenção, ${KID_NAME}! 👀`,
    `${KID_NAME}, fale bem alto e claro! 🗣️`,
    `Quase lá, ${KID_NAME}! Tente de novo! 🎯`,
    `${KID_NAME}, respira fundo e tenta mais uma vez! 🌬️`,
  ],

  // Saudação na home
  welcome: `Olá, ${KID_NAME}! Pronto para aprender? 🎒`,

  // Ao completar um nível
  levelComplete: (level: string) => `${KID_NAME}, você completou ${level}! Que orgulho! 🏅`,

  // Ao completar tudo
  allComplete: `${KID_NAME}, você é um campeão! Completou tudo! 🏆🎉`,
};

// Função para pegar mensagem aleatória
export function getRandomMessage(type: 'success' | 'hints'): string {
  const list = MESSAGES[type];
  return list[Math.floor(Math.random() * list.length)];
}
