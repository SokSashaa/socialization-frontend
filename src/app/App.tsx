import { Suspense } from 'react';
import { AnimatePresence, domAnimation, LazyMotion } from 'framer-motion';

import { AuthInit } from '../modules/Auth';
import Router from '../routes/Router';
import { ToastContainer } from '../UI';

const App = () => (
    <>
        <Suspense fallback={<div>Загрузка...</div>}>
            <AuthInit>
                <LazyMotion features={domAnimation}>
                    <AnimatePresence mode="wait">
                        <Router />
                    </AnimatePresence>
                </LazyMotion>
            </AuthInit>
            <ToastContainer />
        </Suspense>
    </>
);

export default App;
