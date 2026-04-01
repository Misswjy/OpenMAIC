'use client';

import { useEffect } from 'react';
import { useSettingsStore } from '@/lib/store/settings';
import { createLogger } from '@/lib/logger';

const log = createLogger('ServerProvidersInit');

/**
 * Fetches server-configured providers on mount and merges into settings store.
 * Renders nothing — purely a side-effect component.
 */
export function ServerProvidersInit() {
  const fetchServerProviders = useSettingsStore((state) => state.fetchServerProviders);

  useEffect(() => {
    log.info('ServerProvidersInit mounted, fetching server providers');
    fetchServerProviders().then(() => {
      log.info('Server providers fetch completed');
    }).catch((error) => {
      log.error('Failed to fetch server providers:', error);
    });
  }, [fetchServerProviders]);

  return null;
}
