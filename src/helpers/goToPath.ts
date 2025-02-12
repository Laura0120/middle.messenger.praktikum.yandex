import { Router } from '../framework/Router';
import { BlockProps } from '../framework/Block';

export function goToPath(pathname: string, event?: Event, props?: BlockProps) {
  event?.preventDefault(); // Отключаю дефолтные перезагрузки, если передали ссылку
  const router = new Router('root');
  router.go(pathname, props);
}
