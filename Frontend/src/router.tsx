import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import Layout from './components/Layout';

import HomePage from './pages/HomePage';
import FilmsPage from './pages/FilmsPage';
import FilmDetailPage from './pages/FilmDetailPage';
import CategoryPage from './pages/CategoryPage';
import ProfilPage from './pages/ProfilPage';
import DiscussionPage from './pages/DiscussionPage';
import Browse from './pages/Browse';
import NotFoundPage from "./pages/NotFoundPage";


const rootRoute = createRootRoute({
  component: Layout,
    notFoundComponent: NotFoundPage,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const filmsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/films',
  component: FilmsPage,
});

const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/films/$categorie',
  component: CategoryPage,
});

const filmRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/film/$id',
  component: FilmDetailPage,
});

const profilRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profil',
  component: ProfilPage,
});

const discussionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/discussion',
  component: DiscussionPage,
});

const browseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/browse',
  component: Browse,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  filmsRoute,
  categoryRoute,
  filmRoute,
  profilRoute,
  discussionRoute,
  browseRoute,
]);

const router = createRouter({
  routeTree,
});

export default router;