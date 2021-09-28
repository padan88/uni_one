import cache from './cache.js'

const TokenKey = 'vuex_token'

export function getToken() {	
  return cache.get(TokenKey);
}

export function setToken(token) {
  return cache.put(TokenKey, token)
}

export function removeToken() {
  return cache.remove(TokenKey)
}