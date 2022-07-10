import path from 'path'
import {writeFileSync} from 'fs'
import mkdirp from 'mkdirp'
import {print} from 'graphql'
import {mergeTypeDefs} from '@graphql-tools/merge'
import {loadFilesSync} from '@graphql-tools/load-files'

// merge all types in child directories
const typesPath = path.join(__dirname, 'definitions/**/*.graphql')
const typesArray = loadFilesSync(typesPath, {recursive: true})
const typeDefs = mergeTypeDefs(typesArray)
const printedTypeDefs = print(typeDefs)
export const schemaPath = path.join('dist', 'schema.graphql')

mkdirp.sync('dist')
writeFileSync(schemaPath, printedTypeDefs)
