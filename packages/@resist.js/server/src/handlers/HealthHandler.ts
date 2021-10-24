// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

/* eslint-disable @typescript-eslint/no-explicit-any, sonarjs/cognitive-complexity */

import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

import Book from '$book'
import { Warn } from '$logger'

import { DOC_ERROR_URL, DOC_URL, VERSION } from '$constants/Constants'

import { IsUp, MemoryUsage } from '$burn/Utils'

/**
 * Health Handling.
 *
 * @param {FastifyInstance} server Server instance reference.
 * @param {any} startupState Startup error codes.
 * @see https://resistjs.dev/docs/server#health
 */
const HealthHandler: any = (server: FastifyInstance | any, startupState: any): void => {
  if (startupState.length > 0) {
    setTimeout(() => {
      try {
        Warn(
          `🥺 Errors were encountered while starting: Navigate to https://${server.server.address().address}:${
            server.server.address().port
          }/resist/state to see what happened.`,
        )
      } catch (e) {
        Warn(
          `🥺 Errors were encountered while starting: Navigate to https://localhost:3000/resist/state to see what happened.`,
        )
      }
    }, 1000)
  }

  server.get('/api/ping', (request: FastifyRequest, reply: FastifyReply): void => {
    reply.status(200)
    reply.header('Content-Type', 'application/json')
    reply.type('application/json')
    reply.send('pong')
  })

  if (startupState.length > 0) {
    server.get('/', async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
      reply.redirect('/resist/state')
    })
  }

  if (!global.config.setup_complete) {
    server.get('/', async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
      reply.redirect('/resist/setup')
    })
  }

  server.get('/resist/state', async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const RenderErrors = (): string => {
      let html = ''
      if (startupState?.length > 0) {
        html +=
          '<p class="pill">Startup encountered one or more errors and could not proceed. Check and resolve each Error below by clicking on each one.</p>'

        for (let i = 0; startupState.length > i; i++) {
          html += `<div class='error'><a target="_blank" rel="nofollow, noreferrer, noopener" href="${DOC_ERROR_URL}/${startupState[i]}">Error #${startupState[i]}</a></div>`
        }
      }
      return html
    }
    const p = (thing, bool = false): string => {
      if (thing === null || thing === undefined || thing === '') {
        return `<div class='pill-warn'>🔆 Not provided</div>`
      }
      if (bool) return thing ? '✅' : '🚫'
      return thing
    }

    const CookieSecret = (thing): string => {
      if (thing && thing.length >= 32) return p(thing)
      else {
        return `<div class='pill-warn'>❌ Must be at least 32-characters!</div>`
      }
    }

    const RenderToPillList = (thing: string | any, prop1: string, prop2: string): string => {
      let html = '<div style="padding:20px">'

      if (!thing || 0 >= thing.length) html += p(null)
      else {
        for (let i = 0; thing.length > i; i++) {
          html += `<div class='pill-gray'>${thing[i][prop1]}, ${thing[i][prop2]}</div>`
        }
      }
      html += '</div>'

      return html
    }

    const ServerPlugins = (thing: string | any): string => {
      let html = '<div style="padding:20px">'

      if (!thing || 0 >= thing.length) html += p(null)
      else {
        for (let i = 0; thing.length > i; i++) {
          html += `<div class='pill-gray'>${thing[i].description}<br/>Enabled: ${
            thing[i].enabled ? 'Yes' : 'No'
          }<br/>Package: ${thing[i].fromPackage}<br/>Environments: ${thing[i].environments.join(
            ', ',
          )}<br/>Options: ${JSON.stringify(thing[i].options)}</div>`
        }
      }
      html += '</div>'

      return html
    }

    const Reachable = async (url: string): Promise<string> => {
      if (!url || url === '') {
        return '🚫'
      } else {
        return (await IsUp(url)) ? '✅' : '🚫'
      }
    }

    const ElasticReachable = await Reachable(Book.metrics.elasticSearch.url)
    const FlagReachable = await Reachable(Book.flags.url)
    const StorybookReachable = await Reachable(Book.storybook.url)

    reply.status(200)
    reply.header('Content-Type', 'text/html')
    reply.type('text/html')
    reply.send(`
      <!DOCTYPE html>
      <html dir="ltr" lang="en">
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="x-ua-compatible" content="IE=edge,chrome=1" />
          <meta http-equiv="content-type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta content='noindex, nofollow' name='robots' />
          <title>${Book.FRAMEWORK} - Startup Information</title>

          <style type="text/css">
            :root {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
'Open Sans', 'Helvetica Neue', sans-serif
            }

            ::selection {
              background-color: #47a3f3;
              color: #fefefe
            }

            body {
              background-color: #202124;
              color: #efefef
            }

            .main {
              padding: 30px;
              display: flex;
              align-items: center
            }

            .main svg {
              width: 64px;
              height: 64px
            }

            .main div {
              font-size: 24px;
              padding-left: 15px
            }

            .pill {
              border-radius: 12px;
              background: #502124;
              padding: 5px
            }

            .pill-warn {
              border-radius: 12px;
              background: #502124;
              padding: 5px;
              padding-left: 15px;
              width: fit-content;
              margin-left: 15px;
              padding-right: 15px;
              list-style: none !important; /* :D */
            }

            .pill-gray {
              border-radius: 12px;
              background: #333;
              padding: 5px;
              width: fit-content;
              margin-left: 15px;
              padding-left: 15px;
              padding-right: 15px;
              margin-bottom: 10px;
              list-style: none !important; /* :D */
            }

            .pill-green {
              border-radius: 12px;
              background: #506124;
              padding: 5px
            }

            .content {
              display: flex;
              flex-direction: column;
              padding: 50px
            }

            .error {
              display: list-item;
              list-style: '🚫';
              padding-left: 10px;
              padding-bottom: 15px;
              margin-left: 30px
            }

            .content div a {
              color: inherit;
              text-decoration: none;
              transition: 0.3s all
            }

            .content div a:hover, .content div a:focus {
              color: inherit;
              opacity: 0.5
            }

            .flex {
              display: flex;
              align-items: center
            }
            
            .flex div {
              padding-left: 15px
            }
            
            .list_item {
              display: list-item;
              list-style: disc;
              min-height: 48px;
              margin-left: 30px
            }

            .button_group {
              display: flex;
              flex-direction: row
            }

            .button {
              cursor: pointer;
              transition: 0.3s all;
              padding-top: 15px;
              padding-bottom: 15px;
              padding-left: 20px;
              padding-right: 20px;
              border: 1px solid #ccc;
              border-radius: 6px;
              margin-right: 15px;
              min-width: fit-content;
            }

            .button:hover {
              opacity: 0.5;
            }
          </style>
        </head>
        <body>
        <div class='main'>
        <svg xmlns="http://www.w3.org/2000/svg" width="682.667" height="682.667" viewBox="0 0 512 512" xmlns:v="https://vecta.io/nano"><path d="M225.73 0h6.6c8.27.97 16.3 4.47 22.12 10.53L371.9 128.01c10.78 10.9 12.67 28.91 4.9 42.04l93.25.07c17.4.37 32.78 15.56 33.4 32.95 0 8.65 1.02 17.72-2.49 25.89-4.22 10.67-13.99 18.75-25.16 21.21l-.11 105.89c-.48 25.21-8.36 50.22-22.48 71.12-8.71 13.34-20.64 24.03-31.74 35.3l-15.98 15.93c-2.82 2.91-7.66 2.69-10.57.05-2.65-2.85-2.95-7.68-.11-10.51l14.55-14.63c-18.17-21.27-23.22-52.7-12.45-78.54 10.33-26.12 35.88-45.31 63.87-47.88l-.02-14.17-.01-30.62-.04-31.15c-50.05-.03-100.1.03-150.15-.01l-.05 79.06c.13 3.8-.54 7.68-2.43 11.01-1.69 3.19-4.5 5.55-6.98 8.1l-19.92 20c-10.97 11.32-18.22 26.14-20.53 41.73 13.98 1.5 27.46 6.62 39.26 14.21 7.2 4.65 13.79 10.24 19.63 16.52 13.8 14.99 23.22 34.3 24.97 54.72 8.66-1.17 17.06-3.87 24.86-7.79 3.48-1.93 7.93-.38 10 2.86 1.71 3.29.94 7.72-2.21 9.86-12.08 6.73-25.85 10.05-39.6 10.77h-4.22c-28.32-.29-56.05-14.73-72.25-38.01-12.65-17.82-18.21-40.37-15.71-62.05 2.18-19.91 11.14-39.02 25.12-53.38l23.48-23.54c1.13-1 1.62-2.51 1.53-3.98l.02-80.82c-8.79-2.05-16.76-7.32-21.82-14.82l-29.75 29.54c-23.77 22.53-56.15 35.61-88.9 35.95l-58.07.01c-22.45-.27-44.61-9.43-60.76-25.02-14.56-13.89-24.24-32.78-26.92-52.73-2.64-19.2 1.09-39.26 10.7-56.12 11.14-19.93 30.15-35.31 51.98-42.01 3.68-.84 7.41 1.68 8.59 5.14 1.09 3.82-1.11 8.16-4.94 9.34-7.67 2.67-15.01 6.33-21.55 11.15 17.14 21.39 23.13 50.43 18.45 77.18l-.46 2.41c-3.1 14.65-9.43 28.72-19.12 40.2 9.07 6.9 19.69 11.9 30.93 13.97l2.4.49c14.19 1.96 28.58.62 42.86 1.08l.2-.67.21-2.06.27-2.52.63-3.45.52-2.4c4.2-18.14 15.32-34.42 30.41-45.27.06-.04.19-.14.26-.19l2.73-1.82c.06-.04.19-.13.26-.17 1.46-.89 2.96-1.7 4.41-2.59l1.04-.51.86-.51c.28-.14.85-.4 1.13-.53l.88-.43 1.09-.48c5.37-2.44 11.03-4.18 16.79-5.44l2.42-.43c8.41-1.35 17.04-1.38 25.45-.01l2.42.43c5.77 1.19 11.41 2.98 16.8 5.38l1.13.49.97.5.96.48 1.18.58 1.96.91.2.15c.07.05.21.15.27.2 1.48 1.04 3.04 1.96 4.55 2.97 2 1.33 3.89 2.82 5.8 4.28l12.99-13.01c-.15-9.68-1.37-19.93 2.86-29 4.99-11.45 16.49-19.64 28.94-20.68l-17.14-17.2-77.81-77.79c-.86-.66-1.42-1.89-2.53-2.13l-56.6 56.58c-2 2.03-4.37 3.68-7.04 4.71-.05.02-.17.06-.23.09l-2.15.71-2.41.43-25.73.04c-3.97.07-7.17-3.55-7.39-7.38.2-3.87 3.28-7.53 7.32-7.53l23.85-.08c1.29-.02 2.41-.75 3.27-1.66l57.19-57.19c-6.35-9.95-7.48-23.08-2.39-33.81 3.17-7.32 9.51-12.43 14.97-17.99 5.56-5.6 13.1-8.75 20.81-9.98m-4.74 16.83c-3.84 1.62-6.56 4.86-9.46 7.71-2.79 2.87-6 5.5-7.73 9.21-3.76 7.34-2.26 16.89 3.51 22.77l27.56 27.52 35.93-35.93-27.45-27.45c-5.72-5.73-15.06-7.31-22.36-3.83m60.34 41.95L245.49 94.7l41.53 41.28 35.79-35.87-41.48-41.33m16.21 87.96c2.8 2.84 5.7 5.59 8.55 8.39 4.7 5.14 9.8 10 14.77 14.91l36.13-.02c5.54-4.75 10.33-11.36 9.49-19.05-.09-5.8-3.35-11.03-7.59-14.79l-25.23-25.3c-12.29 11.63-24.08 23.93-36.12 35.86M42.86 160.9c-4.69 5.13-8.64 10.93-11.74 17.14-13.2 26.23-8.92 60.19 10.86 82 7.54-8.81 12.26-19.73 14.94-30.94 5.17-23.22.97-49.32-14.06-68.2m239.89 44.18c.28 6.49-1.06 13.44 2 19.48 3.23 6.86 10.59 11.44 18.17 11.35l38.41.01v-50.84c-13.11-.01-26.22-.03-39.33.01-10.41.13-19.5 9.59-19.25 19.99m73.58-19.98v50.81l58.6.02v-50.86c-19.54.01-39.07-.04-58.6.03m73.62-.02v50.84l39.06-.03c9.77-.07 18.59-8.25 19.41-17.98.2-4.92.18-9.87.01-14.8-.78-9.73-9.57-17.96-19.34-18.03-13.05-.03-26.1-.02-39.14 0M168.26 243.3c-13.37 10.14-22.3 25.93-23.92 42.65 7.2-.01 14.43.11 21.59-.76 23.61-2.46 46.34-12.42 64.24-28 4.85-4.21 9.28-8.86 13.83-13.37l-.08-.53c-7.7-5.91-16.79-9.86-26.29-11.79l-.9.38-.11-.73-1.75.09c-16.26-2.65-33.58 1.96-46.61 12.06m249.11 125.07c-7.86 11.19-11.76 25.06-10.97 38.7.6 12.93 5.54 25.53 13.64 35.59 5.32-5.25 10.66-10.51 15.26-16.41 12.38-15.54 20.69-34.28 23.86-53.89 1.78-10.01 1.65-20.2 1.6-30.32-17.33 2.11-33.52 11.93-43.39 26.33M259.9 425.86c.72 17.97 8.29 35.52 20.86 48.39 12.73 13.18 30.42 21.45 48.73 22.56-1.14-11.14-6.55-21.35-13.19-30.19-9.55-12.39-21.52-22.84-34.71-31.2-6.77-4.08-13.82-8.16-21.69-9.56zm135.18-135.88c-.15-5.54 6.75-9.42 11.37-6.28 3.64 2.9 6.63 6.52 10.03 9.69 4.05 3.97 1.67 11.5-3.86 12.57-4.97 1.08-8.09-3.39-11.17-6.38-2.57-2.82-6.56-5.3-6.37-9.6zm-20.72 34.48c4.07-2.7 10.2-.18 11.17 4.6.65 3.97.11 8.09-1.02 11.93-3.79 13.03-17.56 22.26-31.07 20.45-4.8-.83-7.52-6.85-4.96-11.01 1.46-2.63 4.54-4.1 7.51-3.76 7.96.5 15.25-6.69 14.83-14.66-.34-2.93.97-6.02 3.54-7.55zm-66.55 57.77c-3.02-4.58.72-11.35 6.17-11.29 4.37-.31 6.87 3.74 9.71 6.33 2.94 3.06 7.33 6.03 6.49 10.93-.93 5.68-8.58 8.27-12.67 4.12-3.14-3.45-6.83-6.42-9.7-10.09z"/><path d="M220.99 16.83c7.3-3.48 16.64-1.9 22.36 3.83l27.45 27.45-35.93 35.93-27.56-27.52c-5.77-5.88-7.27-15.43-3.51-22.77 1.73-3.71 4.94-6.34 7.73-9.21 2.9-2.85 5.62-6.09 9.46-7.71zm60.34 41.95l41.48 41.33-35.79 35.87c-14.08-13.44-27.67-27.55-41.53-41.28l35.84-35.92zm16.21 87.96l36.12-35.86 25.23 25.3c4.24 3.76 7.5 8.99 7.59 14.79-4.8-.95-9.65.15-14.47.19-12.34.1-24.68-.09-37.01.08-3.99.17-7.89-.84-11.86-1.01.99 1.63 2.05 3.21 2.95 4.9l-8.55-8.39zm-106.2 69.38l1.92.39-2.42.43.5-.82zm-23.08 27.18c13.03-10.1 30.35-14.71 46.61-12.06l.3.69 1.56-.05.9-.38c9.5 1.93 18.59 5.88 26.29 11.79l.08.53c-4.55 4.51-8.98 9.16-13.83 13.37-17.9 15.58-40.63 25.54-64.24 28-7.16.87-14.39.75-21.59.76 1.62-16.72 10.55-32.51 23.92-42.65zm-38.34 33.17l1.06-1.59-.52 2.4-.54-.81z" fill="#ff6b6b"/><path fill="#ffa6a6" d="M202.26 73.06c1.11.24 1.67 1.47 2.53 2.13l77.81 77.79c-.83 2.11-3.07 2.78-4.88 3.77-13.77 7.01-24.25 20.17-27.82 35.22-2.29 8.51-1.6 17.39-1.62 26.1-.11 3.54 1.17 6.98.87 10.52-1.51-1.01-3.07-1.93-4.55-2.97-.06-.05-.2-.15-.27-.2l-.2-.15-1.96-.91-1.18-.58-.96-.48-.97-.5-.45-.53-.68.04c-5.39-2.4-11.03-4.19-16.8-5.38l-1.63-.95-.79.52c-8.41-1.37-17.04-1.34-25.45.01l-1.92-.39-.5.82c-5.76 1.26-11.42 3-16.79 5.44l-.65-.01-.44.49-.88.43-1.13.53-.86.51-1.04.51c-1.45.89-2.95 1.7-4.41 2.59-.07.04-.2.13-.26.17l-2.73 1.82-.26.19c-15.09 10.85-26.21 27.13-30.41 45.27l-1.06 1.59.54.81-.63 3.45-.66.61.39 1.91c-.06.51-.16 1.54-.21 2.06-2.39-.22-5.31.49-7.14-1.51-19.26-17.79-32.54-41.52-39.35-66.73-7.42-27.5-6.67-57.11 2.06-84.21.42-1.42 1.38-2.57 2.25-3.73 4.47-.73 9.02-.7 13.54-.89.22 3.83 3.42 7.45 7.39 7.38l25.73-.04 1.89.32.52-.75 2.15-.71c.06-.03.18-.07.23-.09 2.67-1.03 5.04-2.68 7.04-4.71l56.6-56.58z"/><path d="M80.58 130.16c2.2-.3 4.34-1.02 6.59-1.03-.87 1.16-1.83 2.31-2.25 3.73-8.73 27.1-9.48 56.71-2.06 84.21 6.81 25.21 20.09 48.94 39.35 66.73 1.83 2 4.75 1.29 7.14 1.51l-.2.67c-14.28-.46-28.67.88-42.86-1.08l-.47-.82-1.93.33c-11.24-2.07-21.86-7.07-30.93-13.97 9.69-11.48 16.02-25.55 19.12-40.2l.98-1.61-.52-.8c4.68-26.75-1.31-55.79-18.45-77.18 6.54-4.82 13.88-8.48 21.55-11.15 3.83-1.18 6.03-5.52 4.94-9.34zm202.02 22.82l17.14 17.2c-12.45 1.04-23.95 9.23-28.94 20.68-4.23 9.07-3.01 19.32-2.86 29l-12.99 13.01c-1.91-1.46-3.8-2.95-5.8-4.28.3-3.54-.98-6.98-.87-10.52.02-8.71-.67-17.59 1.62-26.1 3.57-15.05 14.05-28.21 27.82-35.22 1.81-.99 4.05-1.66 4.88-3.77z" fill="#ff8182"/><path d="M138.39 134.44c.06-.03.18-.07.23-.09l-.23.09zm-4.56 1.14l2.41-.43-.52.75-1.89-.32zm169.31 14.65c3.97.17 7.87 1.18 11.86 1.01l37.01-.08c4.82-.04 9.67-1.14 14.47-.19.84 7.69-3.95 14.3-9.49 19.05l-36.13.02c-4.97-4.91-10.07-9.77-14.77-14.91-.9-1.69-1.96-3.27-2.95-4.9zM42.86 160.9c15.03 18.88 19.23 44.98 14.06 68.2-2.68 11.21-7.4 22.13-14.94 30.94-19.78-21.81-24.06-55.77-10.86-82 3.1-6.21 7.05-12.01 11.74-17.14zm175.85 55.6l.79-.52 1.63.95-2.42-.43zm-45.31 5.87l.65.01-1.09.48.44-.49zm64.53-.06l.68-.04.45.53-1.13-.49zm-66.98 1.51l1.13-.53-1.13.53zm69.08-.52l.96.48-.96-.48zm-70.98 1.54l1.04-.51-1.04.51zm73.12-.48l1.96.91-1.96-.91zm2.16 1.06l.27.2a6.32 6.32 0 0 0-.27-.2zm-79.95 2.18l.26-.17c-.07.04-.2.13-.26.17zm-92.3 2.64l.46-2.41.52.8-.98 1.61zm89.31-.63l.26-.19-.26.19zm53.48 1.63l1.75-.09.11.73-1.56.05-.3-.69zm-85.7 50.1l.66-.61-.27 2.52-.39-1.91zm-45.28 3.07l1.93-.33.47.82-2.4-.49z" fill="#ff4041"/><path d="M282.75 205.08c-.25-10.4 8.84-19.86 19.25-19.99l39.33-.01v50.84c-12.8.01-25.61.03-38.41-.01-7.58.09-14.94-4.49-18.17-11.35-3.06-6.04-1.72-12.99-2-19.48zm73.58-19.98l58.6-.03v50.86c-19.53-.01-39.07.03-58.6-.02V185.1zm73.62-.02h39.14c9.77.07 18.56 8.3 19.34 18.03.17 4.93.19 9.88-.01 14.8-.82 9.73-9.64 17.91-19.41 17.98l-39.06.03v-50.84zm-12.58 183.29c9.87-14.4 26.06-24.22 43.39-26.33.05 10.12.18 20.31-1.6 30.32-3.17 19.61-11.48 38.35-23.86 53.89-4.6 5.9-9.94 11.16-15.26 16.41-8.1-10.06-13.04-22.66-13.64-35.59-.79-13.64 3.11-27.51 10.97-38.7zM259.9 425.86c7.87 1.4 14.92 5.48 21.69 9.56 13.19 8.36 25.16 18.81 34.71 31.2 6.64 8.84 12.05 19.05 13.19 30.19-18.31-1.11-36-9.38-48.73-22.56-12.57-12.87-20.14-30.42-20.86-48.39z" fill="#a0bce7"/><path fill="#c7e7fa" d="M310.56 250.95l150.15.01.04 31.15c-5-4.67-11.95-7.18-18.79-6.13-10.72 1.27-19.89 8.41-25.48 17.41-3.4-3.17-6.39-6.79-10.03-9.69-4.62-3.14-11.52.74-11.37 6.28-.19 4.3 3.8 6.78 6.37 9.6 3.08 2.99 6.2 7.46 11.17 6.38-.59 6.06.99 12.58 5.42 16.95 4.93 5.25 12.69 6.93 19.6 5.69 9.53-1.69 17.8-7.91 23.12-15.87l.02 14.17c-27.99 2.57-53.54 21.76-63.87 47.88-10.77 25.84-5.72 57.27 12.45 78.54l-14.55 14.63c-2.84 2.83-2.54 7.66.11 10.51-4.74 4.81-9.9 9.2-15.55 12.91-2.07-3.24-6.52-4.79-10-2.86-7.8 3.92-16.2 6.62-24.86 7.79-1.75-20.42-11.17-39.73-24.97-54.72 16.7.09 31.87-14.02 33.43-30.55.82-7.83-2.88-16.28-9.93-20.11-3.88-2.3-8.47-2.61-12.86-2.72.84-4.9-3.55-7.87-6.49-10.93-2.84-2.59-5.34-6.64-9.71-6.33-5.45-.06-9.19 6.71-6.17 11.29 2.87 3.67 6.56 6.64 9.7 10.09-11.19 6.69-19.08 19.42-17.6 32.74-11.8-7.59-25.28-12.71-39.26-14.21 2.31-15.59 9.56-30.41 20.53-41.73l19.92-20c2.48-2.55 5.29-4.91 6.98-8.1 1.89-3.33 2.56-7.21 2.43-11.01l.05-79.06m63.8 73.51c-2.57 1.53-3.88 4.62-3.54 7.55.42 7.97-6.87 15.16-14.83 14.66-2.97-.34-6.05 1.13-7.51 3.76-2.56 4.16.16 10.18 4.96 11.01 13.51 1.81 27.28-7.42 31.07-20.45 1.13-3.84 1.67-7.96 1.02-11.93-.97-4.78-7.1-7.3-11.17-4.6z"/><path d="M416.48 293.39c5.59-9 14.76-16.14 25.48-17.41 6.84-1.05 13.79 1.46 18.79 6.13l.01 30.62c-5.32 7.96-13.59 14.18-23.12 15.87-6.91 1.24-14.67-.44-19.6-5.69-4.43-4.37-6.01-10.89-5.42-16.95 5.53-1.07 7.91-8.6 3.86-12.57zm-86.3 94.81c4.39.11 8.98.42 12.86 2.72 7.05 3.83 10.75 12.28 9.93 20.11-1.56 16.53-16.73 30.64-33.43 30.55-5.84-6.28-12.43-11.87-19.63-16.52-1.48-13.32 6.41-26.05 17.6-32.74 4.09 4.15 11.74 1.56 12.67-4.12z" fill="#fff"/></svg><div>${
          Book.FRAMEWORK
        }</div>
        </div>
        <div class='content'>
          <div class='button_group' style='margin-bottom: 15px'>
            <div class='button'>Kill Server</div>
            <div class='button'>Kill Cluster</div>
            <div class='button'>Restart Cluster</div>
            <div class='button'>Restart Server</div>
            <div class='button'>Rebuild Server</div>
          </div>
          <div class='button_group' style='margin-bottom: 15px'>
            <div class='button'>Restart Flag</div>
            <div class='button'>Restart Elastic</div>
            <div class='button'>Restart Storybook</div>
            <div class='button'>Rebuild Elastic</div>
            <div class='button'>Rebuild Flag</div>
            <div class='button'>Rebuild Storybook</div>
          </div>
          <div class='button_group'>
            <div class='button'><a target="_blank" rel="nofollow, noreferrer, noopener" href="">Open Metrics</a></div>
            <div class='button'><a target="_blank" rel="nofollow, noreferrer, noopener" href="">Open Elastic</a></div>
            <div class='button'><a target="_blank" rel="nofollow, noreferrer, noopener" href="">Open Storybook</a></div>
            <div class='button'><a target="_blank" rel="nofollow, noreferrer, noopener" href="">Open Flags</a></div>
            <div class='button'><a target="_blank" rel="nofollow, noreferrer, noopener" href="${DOC_URL}">Open Documentation</a></div>
          </div>
          ${RenderErrors()}
          <p class="pill-green">Useful Information</p>
          <div class='list_item'>Framework Version: ${VERSION}</div>
          <div class='list_item'>Has Been Built: ${Book.isBuilt ? 'Yes' : 'No'}</div>
          <div class='list_item'><div class='flex'>Port: ${p(Book.server.settings.port)}</div></div>
          <div class='list_item'><div class='flex'>Environment: ${p(Book.environment)}</div></div>
          <div class='list_item'>Platform: ${Book.platform}</div>
          <div class='list_item'>Working Path: ${Book.workingPath}</div>
          <div class='list_item'>Node Version: ${Book.nodeVersion}</div>
          <div class='list_item'>Process Id: ${Book.processId}</div>
          <div class='list_item'>Memory Usage: ~${MemoryUsage()} MB</div>
          
          <div class='list_item'>Active Connections: ${server._connections}</div>
          <div class='list_item'>Cases Sensitive Routes: ${p(server.initialConfig.caseSensitive, true)}</div>
          <div class='list_item'>Connection Timeout: ${server.initialConfig.connectionTimeout}</div>
          <div class='list_item'>HTTP/2 Session Timeout: ${server.initialConfig.http2SessionTimeout}</div>
          <div class='list_item'>Ignore Trailing Slash In Route: ${p(
            server.initialConfig.ignoreTrailingSlash,
            true,
          )}</div>
          <div class='list_item'>Max Param Length: ${server.initialConfig.maxParamLength}</div>
          <div class='list_item'>Max Requests Per Socket: ${server.initialConfig.maxRequestsPerSocket}</div>

          <div class='list_item'><div class='flex'>Cookie Secret: ${CookieSecret(Book.server.cookieSecret)}</div></div>
          <div class='list_item'><div class='flex'>Server Body Limit: ${p(Book.server.settings.bodyLimit)}</div></div>
          <div class='list_item'><div class='flex'>Log Server Not Found: ${p(
            Book.server.settings.logNotFound,
            true,
          )}</div></div>
          <div class='list_item'><div class='flex'>Log Server Requests/Responses: ${p(
            Book.server.settings.logRequests,
            true,
          )}</div></div>
          <div class='list_item'><div class='flex'>Path To Build: ${p(Book.server.build)}</div></div>
          <div class='list_item'><div class='flex'>Metrics Enabled: ${p(Book.metrics.enabled, true)}</div></div>
          <div class='list_item'><div class='flex'>Metrics URL: ${p(Book.metrics.url)}</div></div>
          <div class='list_item'>Elastic Search Reachable: ${ElasticReachable}</div>
          <div class='list_item'><div class='flex'>Elastic Search URL: ${p(Book.metrics.elasticSearch.url)}</div></div>
          <div class='list_item'><div class='flex'>Elastic Search Username: ${p(
            Book.metrics.elasticSearch.username,
          )}</div></div>
          <div class='list_item'><div class='flex'>Elastic Search Password: ${p(
            Book.metrics.elasticSearch.password,
          )}</div></div>
          <div class='list_item'>Metrics Users: ${RenderToPillList(Book.metrics.users, 'username', 'password')}</div>
          <div class='list_item'><div class='flex'>Feature Flag Service Enabled: ${p(
            Book.flags.enabled,
            true,
          )}</div></div>
          <div class='list_item'><div class='flex'>Feature Flag Service URL: ${p(Book.flags.url)}</div></div>
          <div class='list_item'><div class='flex'>Storybook Service Enabled: ${p(
            Book.storybook.enabled,
            true,
          )}</div></div>
          <div class='list_item'><div class='flex'>Storybook Service URL: ${p(Book.storybook.url)}</div></div>
          <div class='list_item'>Feature Flag Service Reachable: ${FlagReachable}</div>
          <div class='list_item'>Storybook Service Reachable: ${StorybookReachable}</div>
          <div class='list_item'>Headers: ${RenderToPillList(Book.server.headers, 'key', 'value')}</div>
          <div class='list_item'>Redirect: ${RenderToPillList(Book.server.redirects, 'source', 'destination')}</div>
          <div class='list_item'>Rewrites: ${RenderToPillList(Book.server.rewrites, 'source', 'destination')}</div>
          <div class='list_item'>Server Plugins: ${ServerPlugins(Book.server.plugins)}</div>
        </div>
        </body>
      </html>
    `)
  })
}

export default HealthHandler
