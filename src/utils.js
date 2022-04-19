export const createOverlay = () => {
  const overlay = document.createElement('div')
  overlay.style.position = 'fixed'
  overlay.style.top = '0'
  overlay.style.left = '0'
  overlay.style.height = '100vh'
  overlay.style.width = '100vw'
  overlay.style.backgroundColor = 'black'
  overlay.style.opacity = '0.3'
  return overlay
}
