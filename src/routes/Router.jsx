import { Route, Routes } from 'react-router-dom';
import { Home, Users, Games, Tests, Profile, AuthPage } from '../pages';
import { Layout, RequireAuth } from '../components';
import { ROUTES, ROLES } from './RouterConfig';

const Router = () => (
  <Routes>
    {/* public routes */}
    <Route
      path={ROUTES.Auth}
      element={<AuthPage />}
    />

    <Route
      path={ROUTES.Unathorized}
      element={<p>Для вашей роли нет доступа к этой странице</p>}
    />

    {/* private routes */}
    <Route element={<Layout />}>
      <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Tutor, ROLES.Observed]} />}>
        <Route
          index
          path={ROUTES.Home}
          element={<Home />}
        />
        <Route
          path={ROUTES.Games}
          element={<Games />}
        />
        <Route
          path={ROUTES.Profile}
          element={<Profile />}
        />
        <Route
          path={ROUTES.Tests}
          element={<Tests />}
        />
      </Route>

      <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Tutor]} />}>
        <Route
          path={ROUTES.Users}
          element={<Users />}
        />
      </Route>
    </Route>
  </Routes>
);

export default Router;
