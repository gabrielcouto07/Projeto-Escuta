import { useEffect } from 'react';

// Pede confirmação do navegador antes de fechar ou recarregar a aba
export function useAvisoAoSair(ativo) {
  useEffect(() => {
    if (!ativo) return undefined;
    function aoSair(evento) {
      evento.preventDefault();
      evento.returnValue = '';
    }
    window.addEventListener('beforeunload', aoSair);
    return () => window.removeEventListener('beforeunload', aoSair);
  }, [ativo]);
}
