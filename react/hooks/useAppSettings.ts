import { useMemo } from 'react'
import { useQuery } from 'react-apollo'

import SettingsQuery from '../graphql/getAppSettings.gql'

const parseSettings = (message?: string): AppSettings => {
  try {
    return JSON.parse(message ?? '{}') ?? {}
  } catch {
    return {}
  }
}

const useAppSettings = () => {
  const { VTEX_APP_ID, VTEX_APP_VERSION: version } = process.env
  const appName = VTEX_APP_ID ? VTEX_APP_ID.split('@')[0] : ''

  const { data, loading, error } = useQuery(SettingsQuery, {
    variables: {
      version,
      appName,
    },
    skip: !appName,
  })

  const message = data?.publicSettingsForApp?.message
  const settings = useMemo(() => parseSettings(message), [message])

  return { settings, loading, error }
}

export default useAppSettings
