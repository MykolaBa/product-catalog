import { useCallback, useEffect, useState } from 'react'

function normalizeIds(ids, maxItems) {
  const uniqueIds = Array.from(
    new Set(Array.isArray(ids) ? ids.filter((id) => Number.isInteger(id)) : []),
  )

  return Number.isInteger(maxItems) ? uniqueIds.slice(0, maxItems) : uniqueIds
}

function areSameIds(firstIds, secondIds) {
  return (
    firstIds.length === secondIds.length &&
    firstIds.every((id, index) => id === secondIds[index])
  )
}

function readStoredIds(storageKey, maxItems) {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const storedValue = window.localStorage.getItem(storageKey)
    const parsedValue = storedValue ? JSON.parse(storedValue) : []

    return normalizeIds(parsedValue, maxItems)
  } catch {
    return []
  }
}

export function usePersistentIdList(storageKey, { maxItems } = {}) {
  const [ids, setRawIds] = useState(() => readStoredIds(storageKey, maxItems))

  const setIds = useCallback(
    (nextIdsOrUpdater) => {
      setRawIds((currentIds) => {
        const nextIds =
          typeof nextIdsOrUpdater === 'function'
            ? nextIdsOrUpdater(currentIds)
            : nextIdsOrUpdater

        const normalizedIds = normalizeIds(nextIds, maxItems)

        return areSameIds(currentIds, normalizedIds) ? currentIds : normalizedIds
      })
    },
    [maxItems],
  )

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(ids))
    } catch {
      // Ignore storage write failures so the catalog remains usable.
    }
  }, [ids, storageKey])

  const addId = useCallback(
    (id) => {
      setIds((currentIds) => (currentIds.includes(id) ? currentIds : [...currentIds, id]))
    },
    [setIds],
  )

  const removeId = useCallback(
    (id) => {
      setIds((currentIds) => currentIds.filter((currentId) => currentId !== id))
    },
    [setIds],
  )

  const toggleId = useCallback(
    (id) => {
      setIds((currentIds) =>
        currentIds.includes(id)
          ? currentIds.filter((currentId) => currentId !== id)
          : [...currentIds, id],
      )
    },
    [setIds],
  )

  const clearIds = useCallback(() => {
    setIds([])
  }, [setIds])

  const hasId = useCallback((id) => ids.includes(id), [ids])

  return { ids, setIds, addId, removeId, toggleId, clearIds, hasId }
}
