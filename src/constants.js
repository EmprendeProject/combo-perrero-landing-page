export const WHATSAPP_URL =
  'https://wa.me/584243427035?text=Hola!%20escribo%20desde%20la%20pagina%20web%20del%20combo%20perrero'

export const YUMMY_URL = 'https://yummysuperapp.onelink.me/pk3F/srbtbafr'

// Meta Pixel: registra un Lead al hacer click en un CTA
export function trackLead(params) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', params)
  }
}
