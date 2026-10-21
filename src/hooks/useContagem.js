// Anima um número até o valor final (efeito "contador").
// Quem pede menos movimento no sistema vê o número direto.
import { useEffect, useRef, useState } from 'react';

const semMovimento = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function useContagem(alvo, duracao = 900) {
  const [atual, setAtual] = useState(0);
  const ultimo = useRef(0);

  useEffect(() => {
    if (typeof alvo !== 'number' || !Number.isFinite(alvo)) return undefined;
    const de = ultimo.current;
    const mostrar = (valor) => {
      ultimo.current = valor;
      setAtual(valor);
    };
    if (semMovimento()) {
      mostrar(alvo);
      return undefined;
    }
    let quadro;
    const inicio = performance.now();
    function passo(agora) {
      const t = Math.min(1, (agora - inicio) / duracao);
      const suave = 1 - (1 - t) ** 3; // desacelera no fim
      mostrar(Math.round(de + (alvo - de) * suave));
      if (t < 1) quadro = requestAnimationFrame(passo);
    }
    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, [alvo, duracao]);

  return typeof alvo === 'number' ? atual : alvo;
}
