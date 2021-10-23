export async function handle({ request, resolve }) {
  const response = await resolve(request)

  return {
    ...response,
    headers: {
      ...response.headers,
    },
  }
}

export async function handleError({ error, request }) {
  // TODO
}

export async function externalFetch(request) {
  return fetch(request)
}

export function getSession(request) {
  return request.info
}
