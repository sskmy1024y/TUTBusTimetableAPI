import { useEffect, useRef } from '.'

export function useValueRef<T>(val: T) {
  const ref = useRef(val)
  useEffect(() => {
    ref.current = val
  }, [val])
  return ref
}

export function useInterval(callback: () => void, delay: number) {
  const ref = useRef(callback)
  useEffect(() => {
    ref.current = callback
  }, [callback])

  useEffect(() => {
    const id = setInterval(ref.current, delay)
    return () => clearInterval(id)
  }, [callback, delay, ref])
}
