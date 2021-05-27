import { useEffect } from 'react'

interface ScrollableFunction {
  (event: Event): void
}

interface ScrollableProps {
  onWindowScroll: ScrollableFunction
}

const Scrollable = ({ onWindowScroll }: ScrollableProps) => {
  const handleScroll = (event: Event) => {
    if (onWindowScroll) {
      onWindowScroll(event)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, false)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return null
}
export default Scrollable
