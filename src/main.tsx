import { createRoot } from 'react-dom/client';
import vkBridge from '@vkontakte/vk-bridge';
import { AppConfig } from './app/providers/AppConfig'
import { ConfigProvider, AdaptivityProvider } from "@vkontakte/vkui";
import React from 'react'
import { createHashParamRouter } from '@vkontakte/vk-mini-apps-router';
import { RouteWithRoot } from '../node_modules/@vkontakte/vk-mini-apps-router/dist/type';
import { RouterProvider } from '../node_modules/@vkontakte/vk-mini-apps-router/dist/index';

vkBridge.send('VKWebAppInit');



const router: RouteWithRoot[] = createHashParamRouter([
    {
        path: '/',
        panel: 'main',
        view: 'default_view',
    }, {
        path: `/story/:id`,
        panel: 'single_news_panel',
        view: 'default_view',
    }
])

createRoot(document.getElementById('root')!).render(
    <ConfigProvider>
        <AdaptivityProvider>
            <RouterProvider router={router} >
                <AppConfig />
            </RouterProvider>
        </AdaptivityProvider>
    </ConfigProvider> as React.ReactNode
);


