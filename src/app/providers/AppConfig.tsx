import {
  AppRoot,
  View,
  Panel,
  Root
} from '@vkontakte/vkui'
import { MainPage } from '../../pages/MainPage';
import '@vkontakte/vkui/dist/vkui.css';
import { useActiveVkuiLocation } from '../../../node_modules/@vkontakte/vk-mini-apps-router/dist/hooks/useActiveVkuiLocation';
import { useGetPanelForView } from '../../../node_modules/@vkontakte/vk-mini-apps-router/dist/hooks/useGetPanelForView';
import { SingleStoryPage } from '../../pages/SingleStoryPage';

export const AppConfig = () => {

  const { view: activeView } = useActiveVkuiLocation();
  const activePanel = useGetPanelForView('default_view');

  return (
    <AppRoot>
      <Root activeView={activeView} >
        <View nav='default_view' activePanel={activePanel} >
          <Panel nav='main' >
            <MainPage />
          </Panel>
          <Panel nav='single_news_panel' >
            <SingleStoryPage />
          </Panel>
        </View>
      </Root>
    </AppRoot>
  );
};
