import {parseArgv, createContext, generate} from '@graphql-codegen/cli'

let watcher

export async function generateGraphql(configPath: string) {
  if (!configPath) throw new Error('Config Path is Unavailable')

  const args = `-c ${configPath} -w`
  const parsedArgs = parseArgv(args.split(' '))
  const context = await createContext(parsedArgs)

  watcher = generate(context)
}

export function closeCodegenWatcher() {
  if (watcher?.close) {
    watcher.close()
    watcher = null
  }
}
