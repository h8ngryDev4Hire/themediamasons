import { Bangers, Arima, Arimo, Bebas_Neue, Gothic_A1, Oswald, Radio_Canada, Raleway, Work_Sans } from 'next/font/google'

export const bangers = Bangers({ 
  weight: "400",
  subsets: ['latin']
})

// Additional fonts from old site
export const arima = Arima({
  subsets: ['latin'],
  weight: ['400', '700']
})

export const arimo = Arimo({
  subsets: ['latin'],
  weight: ['400', '700']
})

export const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin']
})

export const gothicA1 = Gothic_A1({
  subsets: ['latin'],
  weight: ['400', '700']
})

export const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const radioCanada = Radio_Canada({
  subsets: ['latin'],
  weight: ['400', '700']
})

export const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})