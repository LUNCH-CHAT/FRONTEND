// src/hooks/useMentorConfig.ts
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getUniName } from '../api/auth';
import { SCHOOL_CONFIG, resolveSchoolKey } from '../config/school-mentor';

export function useMentorConfig() {
  const [uniName, setUniName] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [params] = useSearchParams();
  const override = params.get('school'); 

  useEffect(() => {
    (async () => {
      try {
        const { data }: { data: string | { result: string } } = await getUniName();
        const name = typeof data === 'string' ? data : (data as { result: string }).result;
        setUniName(name);
        console.log('[useMentorConfig] uniName:', name);
      } catch (e) {
        console.warn('[useMentorConfig] getUniName 실패', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const key = useMemo(
    () => (override as string | null) || resolveSchoolKey(uniName),
    [override, uniName]
  );

  const conf = SCHOOL_CONFIG[key as keyof typeof SCHOOL_CONFIG];
  console.log('[useMentorConfig] key:', key, 'conf:', conf);
  return { conf, loading, uniName, key };
}
