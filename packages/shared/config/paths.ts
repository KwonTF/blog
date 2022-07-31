import path from 'path'

export type Paths = {
  scripts: string
  assets: string
  images: string
  libs: string
}

export function getPaths(root: string): Paths {
  return {
    scripts: path.join(root, 'dist'),
    assets: path.join(root, 'assets'),
    images: path.join(root, 'assets/images'),
    libs: path.join(root, 'assets/libs')
  }
}

const root = path.resolve(__dirname, '../')
export const sharedPaths = getPaths(root)
