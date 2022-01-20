import { createSelector } from '@reduxjs/toolkit'

const basic = state => state.evntboard

export const wsId = createSelector(
  basic,
  state => state?.ws?.id
)

export const isLoading   = createSelector(
  basic,
  state => state?.ws?.loading
)

export const events = createSelector(
  basic,
  state => [...state?.events].filter(({ event }) => !["process-start", "process-end", "process-error"].includes(event))
)

export const processEvents = createSelector(
  basic,
  state => [...state?.events]
    .filter(({ event }) => ["process-start", "process-end", "process-error"].includes(event))
)
