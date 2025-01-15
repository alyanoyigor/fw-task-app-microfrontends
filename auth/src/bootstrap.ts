import { createApp } from 'vue';
import App from './App.vue';
import './assets/index.css';

const mount = (el: Element, props?: { onNavigate: any; supabase: any }) => {
  const app = createApp(App, props);
  app.mount(el);
};

if (import.meta.env.MODE === 'development') {
  const devRoot = document.querySelector('#auth');
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
