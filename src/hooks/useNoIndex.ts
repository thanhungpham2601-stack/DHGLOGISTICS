import { useEffect } from 'react';

/** Marks the current route as noindex,nofollow while mounted (e.g. admin pages), restoring the previous robots meta on unmount. */
export function useNoIndex() {
  useEffect(() => {
    let meta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const created = !meta;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    const previous = meta.getAttribute('content');
    meta.setAttribute('content', 'noindex, nofollow');

    return () => {
      if (created) {
        meta?.remove();
      } else if (previous !== null) {
        meta?.setAttribute('content', previous);
      }
    };
  }, []);
}
