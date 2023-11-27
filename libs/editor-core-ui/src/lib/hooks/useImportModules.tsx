import { WeblancerModuleImportFunction } from '@weblancer-ui/types';
import { useCallback, useEffect, useState } from 'react';

export const useImportModules = (
  toImports: WeblancerModuleImportFunction[]
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const load = useCallback(async () => {
    try {
      for (const toImport of toImports) {
        await toImport();
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(JSON.stringify(error));
    }
  }, [toImports]);

  useEffect(() => {
    load();
  }, [load]);

  return { loading, error };
};
