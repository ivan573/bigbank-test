const BASE_URL = 'https://dragonsofmugloar.com/api/v2'

const RequestMethod = {
  GET: 'GET',
  POST: 'POST'
}

export const RequestType = {
  START: 'start',
  GET_REPUTATION: 'getReputation',
  GET_MESSAGES: 'getTasks',
  SOLVE_MESSAGE: 'solveMessage',
  GET_ITEMS: 'getItems',
  PURCHASE_ITEM: 'purchaseItem'
}

const getRequestData = (type, gameId, itemId) => {
  switch (type) {
    case RequestType.START:
      return { url: `${BASE_URL}/game/start`, method: RequestMethod.POST }
    case RequestType.GET_REPUTATION:
      return { url: `${BASE_URL}/${gameId}/investigate/reputation`, method: RequestMethod.POST }
    case RequestType.GET_MESSAGES:
      return { url: `${BASE_URL}/${gameId}/messages`, method: RequestMethod.GET }
    case RequestType.SOLVE_MESSAGE:
      return { url: `${BASE_URL}/${gameId}/solve/${itemId}`, method: RequestMethod.POST }
    case RequestType.GET_ITEMS:
      return { url: `${BASE_URL}/${gameId}/shop`, method: RequestMethod.GET }
    case RequestType.PURCHASE_ITEM:
      return { url: `${BASE_URL}/${gameId}/shop/buy/${itemId}`, method: RequestMethod.POST }
  }
}

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    throw new Error(`${response.status}: ${response.statusText}`)
  }
}

export default async (requestType, gameId, itemId) => {
  const { url, method } = getRequestData(requestType, gameId, itemId)

  try {
    const response = await fetch(url, { method })
    checkStatus(response)
    return response.json()
  } catch (err) {
    throw new Error(err)
  }
}
