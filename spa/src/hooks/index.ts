import * as rr from 'react-redux'
import { RootState } from 'modules'
import React from 'react'

export const {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useDebugValue,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState
} = React

/**
 * Type-safe `useSelector` for the UniposProps store
 */
export const useSelector: rr.TypedUseSelectorHook<RootState> = rr.useSelector

/**
 * Type-safe `useDispatch` for the **SPA** store
 */
// export const useDispatch = (): Store['dispatch'] => rr.useDispatch

export { useDispatch } from 'react-redux'

export { useParams, useHistory, useLocation } from 'react-router'

export { useFlipGroup } from 'react-easy-flip'

export * from './custom'
