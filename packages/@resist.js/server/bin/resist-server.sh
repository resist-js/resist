#!/bin/sh

## @final
##
## NOTE: Do not make changes here without approval from @resist-js/core.

## Change to the current working directory
cd "$(dirname "$0")"
cd ..

## Start Node
## With: Debugger, Typescript/ESM and Logging
TS_NODE_PROJECT=./tsconfig.json node -r ./bin/tsconfig-paths/register --inspect=0.0.0.0:4001 --no-warnings --loader ts-node/esm --experimental-specifier-resolution=node ./index.ts | pino-pretty