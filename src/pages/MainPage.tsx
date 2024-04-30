import { useEffect, useState } from "react";
// import { Div } from "../../node_modules/@vkontakte/vkui/dist/components/Div/Div";
import { Story } from "../entities/Story";
// import { useRouteNavigator } from '../../node_modules/@vkontakte/vk-mini-apps-router/dist/hooks/hooks';
import { getTopStories } from "../app/getServices";
import { getStory } from "../app/getServices";
import { IStory } from "../app/types/StoryTypes";
import classes from '../../src/app/styles/mainPage.module.css'
import { Div, Button } from "@vkontakte/vkui"
import {PanelHeader} from '@vkontakte/vkui'

export const MainPage = () => {

  const [stories, setStories] = useState<IStory[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchTopStories = async () => {
    setIsLoading(true)
    const storyIds: number[] = await getTopStories();
    const storyPromises = storyIds.slice(0, 100).map(getStory);
    const fetchedStories = await Promise.all(storyPromises);
    const sortedStories = fetchedStories.sort((a, b) => b.time - a.time)
    setStories(sortedStories);
    setIsLoading(false)
  };

  useEffect(() => {
    fetchTopStories();
  }, []);

  useEffect(() => {
    setInterval(() => {
      fetchTopStories() //Обновление каждую минуту
    }, 60000)
  }, [])

  if (isLoading) {
    return <Div className={classes.loader} ></Div>
  } else {
    return (
      <>
      <PanelHeader>
            <Button onClick={() => fetchTopStories()} >Обновить список новостей</Button>
              <Div className={classes.header__title} >Latest hacker news here</Div>
            </PanelHeader>
        {stories.map(story => {
          return (
            <Story by={story.by}
              score={story.score}
              time={story.time}
              title={story.title}
              key={story.id}
              id={story.id} />
          )
        })}

      </>
    );
  }
}
