import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import {
  COMPARE_LIMIT,
  COMPARE_LIMIT_MESSAGE,
  STORAGE_KEYS,
} from '../constants/catalog.js'
import { usePersistentIdList } from './usePersistentIdList.js'
import {
  catalogControlsReducer,
  getVisibleProducts,
  initialCatalogControls,
} from '../utils/catalogFilters.js'
import {
  getCategories,
  getProductsByIds,
  keepExistingProductIds,
} from '../utils/productCollections.js'

export function useCatalogState(products) {
  const {
    ids: favoriteIds,
    setIds: setFavoriteIds,
    toggleId: toggleFavorite,
  } = usePersistentIdList(STORAGE_KEYS.favorites)
  const {
    ids: compareIds,
    setIds: setCompareIds,
    addId: addCompareId,
    removeId: removeCompareId,
    clearIds: clearCompareIds,
    hasId: hasCompareId,
  } = usePersistentIdList(STORAGE_KEYS.compare, {
    maxItems: COMPARE_LIMIT,
  })
  const [compareMessage, setCompareMessage] = useState('')
  const [isCompareMessageVisible, setIsCompareMessageVisible] = useState(false)
  const compareMessageTimerRef = useRef(null)
  const compareMessageRemoveTimerRef = useRef(null)
  const compareMessageFrameRef = useRef(null)
  const [controls, dispatchControls] = useReducer(
    catalogControlsReducer,
    initialCatalogControls,
  )

  const categories = useMemo(() => getCategories(products), [products])

  const visibleProducts = useMemo(
    () => getVisibleProducts(products, controls),
    [products, controls],
  )

  const favoriteProducts = useMemo(
    () => getProductsByIds(products, favoriteIds),
    [products, favoriteIds],
  )

  const compareProducts = useMemo(
    () => getProductsByIds(products, compareIds),
    [products, compareIds],
  )

  useEffect(() => {
    if (products.length === 0) {
      return
    }

    setFavoriteIds((currentIds) => keepExistingProductIds(currentIds, products))
    setCompareIds((currentIds) => keepExistingProductIds(currentIds, products))
  }, [products, setCompareIds, setFavoriteIds])

  const clearCompareMessage = useCallback(() => {
    if (compareMessageTimerRef.current) {
      window.clearTimeout(compareMessageTimerRef.current)
      compareMessageTimerRef.current = null
    }

    if (compareMessageRemoveTimerRef.current) {
      window.clearTimeout(compareMessageRemoveTimerRef.current)
      compareMessageRemoveTimerRef.current = null
    }

    if (compareMessageFrameRef.current) {
      window.cancelAnimationFrame(compareMessageFrameRef.current)
      compareMessageFrameRef.current = null
    }

    setIsCompareMessageVisible(false)
    compareMessageRemoveTimerRef.current = window.setTimeout(() => {
      setCompareMessage('')
      compareMessageRemoveTimerRef.current = null
    }, 220)
  }, [])

  const showCompareMessage = useCallback((message) => {
    if (compareMessageTimerRef.current) {
      window.clearTimeout(compareMessageTimerRef.current)
    }

    if (compareMessageRemoveTimerRef.current) {
      window.clearTimeout(compareMessageRemoveTimerRef.current)
      compareMessageRemoveTimerRef.current = null
    }

    if (compareMessageFrameRef.current) {
      window.cancelAnimationFrame(compareMessageFrameRef.current)
    }

    setCompareMessage(message)
    setIsCompareMessageVisible(false)

    compareMessageFrameRef.current = window.requestAnimationFrame(() => {
      setIsCompareMessageVisible(true)
      compareMessageFrameRef.current = null
    })

    compareMessageTimerRef.current = window.setTimeout(() => {
      setIsCompareMessageVisible(false)
      compareMessageTimerRef.current = null
      compareMessageRemoveTimerRef.current = window.setTimeout(() => {
        setCompareMessage('')
        compareMessageRemoveTimerRef.current = null
      }, 220)
    }, 1500)
  }, [])

  useEffect(() => {
    return () => {
      if (compareMessageTimerRef.current) {
        window.clearTimeout(compareMessageTimerRef.current)
      }

      if (compareMessageRemoveTimerRef.current) {
        window.clearTimeout(compareMessageRemoveTimerRef.current)
      }

      if (compareMessageFrameRef.current) {
        window.cancelAnimationFrame(compareMessageFrameRef.current)
      }
    }
  }, [])

  const toggleCompare = useCallback(
    (productId) => {
      if (hasCompareId(productId)) {
        clearCompareMessage()
        removeCompareId(productId)
        return
      }

      if (compareIds.length >= COMPARE_LIMIT) {
        showCompareMessage(COMPARE_LIMIT_MESSAGE)
        return
      }

      clearCompareMessage()
      addCompareId(productId)
    },
    [
      addCompareId,
      clearCompareMessage,
      compareIds.length,
      hasCompareId,
      removeCompareId,
      showCompareMessage,
    ],
  )

  const clearCompare = useCallback(() => {
    clearCompareIds()
    clearCompareMessage()
  }, [clearCompareIds, clearCompareMessage])

  return {
    categories,
    controls,
    dispatchControls,
    visibleProducts,
    favoriteProducts,
    compareProducts,
    favoriteIds,
    compareIds,
    compareMessage,
    isCompareMessageVisible,
    toggleFavorite,
    toggleCompare,
    clearCompare,
  }
}
