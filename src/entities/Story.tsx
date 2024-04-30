import { Group } from "@vkontakte/vkui/dist/components/Group/Group";
import { Div } from "@vkontakte/vkui/dist/components/Div/Div";
import { Header } from "@vkontakte/vkui/dist/components/Header/Header";
import { IStory } from "../app/types/StoryTypes";
import { useRouteNavigator } from '../../node_modules/@vkontakte/vk-mini-apps-router/dist/hooks/hooks';
import { Button } from '@vkontakte/vkui'
import { DateHelper } from "../widgets/DateHelper";
import { Title } from "@vkontakte/vkui/dist/components/Typography/Title/Title";
import classes from '../app/styles/story.module.css'

export const Story = ({ by, score, time, title, id }: IStory) => {

    const routeNavigator = useRouteNavigator()

    return (
        <Group mode='card' className={classes.border__green} header={<Header mode='secondary' >Автор: {by}</Header>} >
            <Div><Title level='2' >{title}</Title></Div>
            <Div>Рейтинг: {score}</Div>
            <DateHelper time={time} />
            <Button size='l' stretched onClick={() => routeNavigator.push(`/story/${id}`)} >Перейти на страницу новости</Button>
        </Group>
    )
}