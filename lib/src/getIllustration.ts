import { BuildingTypeName } from 'lib/buildings/_common'
import { FactionType } from 'lib/faction/factionData'
import { getUUID } from './utils'

type Illustration =
`${BuildingTypeName}-illustration`
| `${FactionType}-illustration`
| 'town-illustration'
| 'city-illustration'

const illustrationData = [
  {
    illustration: 'town-illustration',
    description: 'An idyllic rustic town',
    artist: 'Juho Huttunen',
    class: 'landscape'
  },
  {
    illustration: 'city-illustration',
    description: 'A birds\' eye view of a sprawling fantasy city',
    artist: 'Juho Huttunen',
    class: 'landscape'
  },
  {
    illustration: 'tavern-illustration',
    description: 'A cozy tavern at night, with several patrons outside.',
    artist: 'Juho Huttunen',
    class: 'landscape'
  },
  {
    illustration: 'general-store-illustration',
    description: 'A general store, with a man reaching up to get something off a shelf.',
    artist: 'Juho Huttunen',
    class: 'landscape'
  }
]

const addLocalSizes = (sizes: number[]) => {
  return sizes.map(size => `(max-width: ${size}px) ${size}px`).join(', ')
}

const addLocalSourceSet = (illustration: Illustration, sizes: number[]) => {
  const sources = sizes.map(size => {
    return `./static/hero/${illustration}-${size}.jpg ${size}w`
  })
  sources.push(`./static/hero/${illustration}.jpg`)
  return sources.join(', ')
}

export const getCustomImage = (src: string, id: string) => {
  const img = document.createElement('img')
  img.id = id || src
  img.src = src
  img.classList.add('illustration')
  img.alt = 'A custom-defined image.'
  return img
}

export const getLocalImage = (illustration: Illustration, sizes: number[] = [640]) => {
  const img = document.createElement('img')
  img.id = `${illustration}-${getUUID()}`
  img.src = `./static/hero/${illustration}.jpg`
  img.sizes = addLocalSizes(sizes)
  img.srcset = addLocalSourceSet(illustration, sizes)
  // test to see if the illustration is in the custom illustrations array
  const custom = illustrationData.find(data => data.illustration === illustration)
  custom ? img.alt = custom.description : img.alt = `${illustration} illustration generated by DallE2`
  custom ? img.classList.add(custom.class) : img.classList.add('square')
  img.classList.add('illustration')

  return img
}
