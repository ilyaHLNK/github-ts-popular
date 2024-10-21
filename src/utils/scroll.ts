import { SCROLL_THRESHOLD } from '../constants/scroll'

export const isScrolledToBottom = (
  scrollTop: number,
  clientHeight: number,
  scrollHeight: number
) => {
  return scrollTop + clientHeight >= scrollHeight - SCROLL_THRESHOLD
}
