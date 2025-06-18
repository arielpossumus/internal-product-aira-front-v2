import { useAppConfig } from '../hooks/useAppConfig';
import { APP_API_ADMIN_CONFIG } from '../Config/constants';

const DocumentHead = () => {
  const { app, images, isLoading } = useAppConfig();

  if (isLoading) return null;

  const faviconUrl = images?.agentIcon?.url ? `${APP_API_ADMIN_CONFIG}${images.agentIcon.url}` : '/favicon.ico';

  return (
    <>
      <title>{app?.description || 'Asistente virtual'}</title>
      <link rel="icon" type="image/png" href={faviconUrl} />
      <link rel="apple-touch-icon" href={faviconUrl} />
    </>
  );
};

export default DocumentHead; 