import { createApp } from 'vue';
import App from './App.vue';

const mount = (el) => {
  const app = createApp(App);
  app.mount(el);
};

if (import.meta.env.MODE === 'development') {
  const devRoot = document.querySelector('#auth');
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
