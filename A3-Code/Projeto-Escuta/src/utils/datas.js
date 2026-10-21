// Datas chegam do Firestore como Timestamp, mas também podem ser Date
// (envio local) ou null (serverTimestamp ainda pendente).
export const UM_DIA = 1000 * 60 * 60 * 24;
export const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

export function paraDate(valor) {
  if (!valor) return null;
  if (valor instanceof Date) return valor;
  if (typeof valor.toDate === 'function') return valor.toDate();
  if (typeof valor === 'number' || typeof valor === 'string') return new Date(valor);
  if (typeof valor.seconds === 'number') return new Date(valor.seconds * 1000);
  return null;
}

export function paraMillis(valor) {
  const data = paraDate(valor);
  return data ? data.getTime() : NaN;
}

export function somarDias(data, dias) {
  return new Date(paraMillis(data) + dias * UM_DIA);
}

// 11/10/2026
export function formatarData(valor) {
  const data = paraDate(valor);
  return data ? data.toLocaleDateString('pt-BR') : '—';
}

// 11/10/2026 às 19:12
export function formatarDataHora(valor) {
  const data = paraDate(valor);
  if (!data) return '—';
  const hora = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return `${data.toLocaleDateString('pt-BR')} às ${hora}`;
}

// 12/10
export function formatarDiaMes(valor) {
  const data = paraDate(valor);
  return data ? data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : '—';
}

// 12/10 09:10
export function formatarCurto(valor) {
  const data = paraDate(valor);
  if (!data) return 'agora';
  const hora = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return `${formatarDiaMes(data)} ${hora}`;
}

// "2026-09" -> { mes: 'set', ano: '2026' }
export function separarMes(valor) {
  const [ano, numero] = valor.split('-');
  return { mes: MESES[Number(numero) - 1], ano };
}

// Dias inteiros até a data (negativo = vencido)
export function diasAte(valor, agora = Date.now()) {
  return Math.ceil((paraMillis(valor) - agora) / UM_DIA);
}
