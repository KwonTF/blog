import path from 'path'
import {generate} from '@graphql-codegen/cli'

const schemaPath = 'http://localhost:765/graphql'
const root = __dirname
export const getCodegenOptions = () => {
  const generatedPath = path.join(root, '../src/__generated__')

  return {
    schema: schemaPath,
    generates: {
      [`${generatedPath}/graphql-types.tsx`]: {
        documents: [path.join(root, '../src/**/*.graphql')],
        plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
        options: {
          withHooks: true
        }
      }
    }
  }
}

async function run() {
  await generate(getCodegenOptions())
}

run()
