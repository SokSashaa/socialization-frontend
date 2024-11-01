import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import {
  Home,
  Users,
  Games,
  Tests,
  Profile,
  AuthPage,
  EditTest,
  PassTest,
  PlayGame,
  ResultTest,
  Observers,
  EntityProfile,
} from '../pages';
import { RequireAuth } from '../components';
import { PageLayout } from '../UI';
import { ROUTES } from './RouterConfig';
import { ROLES } from '../utils/constants';

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
        <Route
          element={<RequireAuth allowedRoles={[ROLES.administrator.code, ROLES.tutor.code]} />}
        >
          <Route
            path={ROUTES.editTest}
            element={<EditTest />}
          />
          <Route
            path={ROUTES.entityProfile}
            element={<EntityProfile />}
          />
        </Route>

        <Route
          element={
            <RequireAuth
              allowedRoles={'all'}
            />
          }
        >
          <Route
            index
            path={ROUTES.home}
            element={<Home />}
          />
          <Route
            path={ROUTES.games}
            element={<Games />}
          />
          <Route
            path={ROUTES.profile}
            element={<Profile />}
          />
          <Route
            path={ROUTES.tests}
            element={<Tests />}
          />
          <Route
            path={ROUTES.passingTest}
            element={<PassTest />}
          />
          <Route
            path={ROUTES.playingGame}
            element={<PlayGame />}
          />
          <Route
            path={ROUTES.resultTest}
            element={<ResultTest />}
          />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.administrator.code]} />}>
          <Route
            path={ROUTES.users}
            element={<Users />}
          />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.tutor.code]} />}>
          <Route
            path={ROUTES.myObservers}
            element={<Observers />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;