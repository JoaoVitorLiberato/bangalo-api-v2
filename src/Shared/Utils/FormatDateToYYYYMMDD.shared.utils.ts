// export function formatDateToYYYYMMDD(date: Date): string {
//   return date.toISOString().split('T')[0];
// }

const date = new Date()

export const formattedDate = date.toLocaleDateString('pt-BR', {
  timeZone: 'America/Sao_Paulo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})


const SPLITED_DATE = String(formattedDate).split(', ')
const SPLITED_TIME = String(SPLITED_DATE[1]).split(' ')
const REMOVE_BAR = String(SPLITED_DATE[0]).split('/');
export const formatDateToYYYYMMDD = `${REMOVE_BAR[2]}-${REMOVE_BAR[1]}-${REMOVE_BAR[0]}`
export const formatDateToYYYYMMDDPlusDay = `${REMOVE_BAR[2]}-${REMOVE_BAR[1]}-${Number(REMOVE_BAR[0]) + 1}`
export const formatDateToYYYYMMDDMinusDay = `${REMOVE_BAR[2]}-${REMOVE_BAR[1]}-${Number(REMOVE_BAR[0])}T${SPLITED_TIME}`