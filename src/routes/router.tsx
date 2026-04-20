import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/layout/root-layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { HomePage } = await import('@/pages/home-page')

          return { Component: HomePage }
        },
      },
      {
        path: 'om-oss',
        lazy: async () => {
          const { AboutPage } = await import('@/pages/about-page')

          return { Component: AboutPage }
        },
      },
      {
        path: 'tjanster',
        lazy: async () => {
          const { ServicesPage } = await import('@/pages/services-page')

          return { Component: ServicesPage }
        },
      },
      {
        path: 'kontakt',
        lazy: async () => {
          const { ContactPage } = await import('@/pages/contact-page')

          return { Component: ContactPage }
        },
      },
      {
        path: '*',
        lazy: async () => {
          const { NotFoundPage } = await import('@/pages/not-found-page')

          return { Component: NotFoundPage }
        },
      },
    ],
  },
])
