import { lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { RequireAuth } from '@components/index';

import { ROLES } from '@utils/constants';

import { ROUTES } from './RouterConfig';

const AuthPage = lazy(() => import('@pages/Auth/AuthPage'));
const PageLayout = lazy(() => import('@UI/layouts/PageLayout/PageLayout'));
const OrganizationsPage = lazy(() => import('@pages/Organizations/Organizations'));
const EditOrganizations = lazy(() => import('@pages/EditOrganizations/EditOrganizations'));
const EditTest = lazy(() => import('@pages/EditTest/EditTest'));
const ChangeUserInfoPage = lazy(() => import('@pages/ChangeUserInfo/ChangeUserInfoPage'));
const HomePage = lazy(() => import('@pages/Home/Home'));
const GamesPage = lazy(() => import('@pages/GameComponents/Games'));
const ProfilePage = lazy(() => import('@pages/Profile/Profile'));
const TestsPage = lazy(() => import('@pages/TestComponents/Tests'));
const PassTestPage = lazy(() => import('@pages/PassTest/PassTest'));
const PlayGamePage = lazy(() => import('@pages/PlayGame/PlayGame'));
const ResultTestPage = lazy(() => import('@pages/ResultTest/ResultTest'));
const UsersPage = lazy(() => import('@pages/Users/Users'));
const ObserversPage = lazy(() => import('@pages/Observers/Observers'));

const Router = () => {
    const location = useLocation();

    return (
        <Routes
            location={location}
            key={location.pathname}
        >
            {/* public routes */}
            <Route
                path={ROUTES.auth}
                element={<AuthPage />}
            />

            <Route
                path={ROUTES.unauthorized}
                element={<p>Для вашей роли нет доступа к этой странице</p>}
            />

            {/* private routes */}
            <Route element={<PageLayout />}>
                <Route element={<RequireAuth allowedRoles={[ROLES.administrator.code]} />}>
                    <Route
                        path={ROUTES.organization}
                        element={<OrganizationsPage />}
                    />
                    <Route
                        path={ROUTES.organizationEdit}
                        element={<EditOrganizations />}
                    />
                    <Route
                        path={ROUTES.users}
                        element={<UsersPage />}
                    />
                </Route>
                <Route
                    element={
                        <RequireAuth allowedRoles={[ROLES.administrator.code, ROLES.tutor.code]} />
                    }
                >
                    <Route
                        path={ROUTES.editTest}
                        element={<EditTest />}
                    />
                    <Route
                        path={ROUTES.entityProfile}
                        element={<ChangeUserInfoPage />}
                    />
                </Route>

                <Route element={<RequireAuth allowedRoles={'all'} />}>
                    <Route
                        index
                        path={ROUTES.home}
                        element={<HomePage />}
                    />
                    <Route
                        path={ROUTES.games}
                        element={<GamesPage />}
                    />
                    <Route
                        path={ROUTES.profile}
                        element={<ProfilePage />}
                    />
                    <Route
                        path={ROUTES.tests}
                        element={<TestsPage />}
                    />
                    <Route
                        path={ROUTES.passingTest}
                        element={<PassTestPage />}
                    />
                    <Route
                        path={ROUTES.playingGame}
                        element={<PlayGamePage />}
                    />
                    <Route
                        path={ROUTES.resultTest}
                        element={<ResultTestPage />}
                    />
                </Route>
                <Route
                    element={
                        <RequireAuth allowedRoles={[ROLES.tutor.code, ROLES.administrator.code]} />
                    }
                >
                    <Route
                        path={ROUTES.myObservers}
                        element={<ObserversPage />}
                    />
                </Route>
            </Route>
        </Routes>
    );
};

export default Router;
