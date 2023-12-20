import wretch from 'wretch'
import AbortAddon from 'wretch/addons/abort'

export const w = wretch().addon(AbortAddon())
