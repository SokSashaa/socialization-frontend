import { Outlet } from 'react-router-dom';

import AnimatedPage from '../../AnimatedPage/AnimatedPage';
import Header from '../../Header/Header';

const PageLayout = () => (
  <>
    <Header />
    <AnimatedPage>
      <main>
        <Outlet />
      </main>
    </AnimatedPage>
  </>
);

export default PageLayout;
