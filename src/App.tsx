import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Scene } from './scene/Scene';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Services } from './sections/Services';
import { Portfolio } from './sections/Portfolio';
import { Contact } from './sections/Contact';
import styles from './styles/App.module.css';

export function App() {
  useSmoothScroll();

  return (
    <>
      <div className={styles.sceneLayer}>
        <Scene />
      </div>

      <main className={styles.content}>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Contact />
      </main>
    </>
  );
}
