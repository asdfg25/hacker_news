import { Div, Group, PanelHeader, CardGrid, Card, Button, Link, Caption } from "@vkontakte/vkui"
import { Header } from "../../node_modules/@vkontakte/vkui/dist/components/Header/Header";
import { Title } from "../../node_modules/@vkontakte/vkui/dist/components/Typography/Title/Title";
import { DateHelper } from "../widgets/DateHelper";
import { useEffect, useState } from "react";
import BaseURL from "../app/BaseURL";
import { IStory } from "../app/types/StoryTypes";
import { useRouteNavigator, useParams } from '../../node_modules/@vkontakte/vk-mini-apps-router/dist/hooks/hooks';
import { Subhead } from "../../node_modules/@vkontakte/vkui/dist/components/Typography/Subhead/Subhead";
import { getAllComments } from "../app/getServices";
import { IComment } from "../app/types/StoryTypes";
import '../../src/app/styles/style.css' // из-за махинаций с домом и классами модули не подходят(


export const SingleStoryPage = () => {

    const [story, setStory] = useState<IStory>({ kids: [] })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [comments, setComments] = useState<IComment[]>([])
    const { id } = useParams()
    const routeNavigator = useRouteNavigator()

    async function getOneComment() {
        const response = await BaseURL.get(`item/${id}.json`)
        setStory(response.data);
    }

    const getComm = async (commId: number) => {
        try {
            const { data } = await BaseURL.get(`item/${commId}.json`);
            return data
        } catch (error) {
            console.error(`Error fetching  ${commId}:`, error);
            return null;
        }
    };

    const fetchComments = async () => {
        setIsLoading(true)
        getOneComment()
        const commIds: number[] = await getAllComments(id);
        const commPromises = commIds.map(getComm);
        const fetchedComments = await Promise.all(commPromises);
        setComments(fetchedComments);
        setIsLoading(false)
    };

    useEffect(() => {
        fetchComments();
    }, []);

    useEffect(() => { // Монтирую комменты в дом напрямую, т.к. из апи идут тэги и текст вперемешку
        getRootComments()
    }, [comments.length])

    const getSubComments = (commId: number) => {

        const comm = comments[commId]
        console.log(comm);

        if (comm.kids && comm.kids.length !== 0) {

            comm.kids.forEach(async (subComm) => {
                const parent = document.querySelectorAll('.paste')[commId] as HTMLElement
                const subCommDiv = document.createElement('div') as HTMLElement
                const subCommAuthor = document.createElement('div') as HTMLElement
                subCommDiv.className = 'sub__comment'
                subCommAuthor.className = 'sub__comment-author'
                const { data } = await BaseURL.get(`item/${subComm}.json`);

                if (data.text && data.by) {
                    subCommDiv.innerHTML = data.text
                    subCommAuthor.textContent = 'Автор: ' + data.by
                    parent.after(subCommDiv)
                    subCommDiv.append(subCommAuthor)

                }
            })
        }
    }

    const getRootComments = () => {
        comments.map((comm, index) => {
            console.log(comm);

            const point = document.querySelector('.point') as HTMLElement
            const div = document.createElement('div') as HTMLElement
            const authorDiv = document.createElement('div') as HTMLElement
            div.className = 'paste'
            authorDiv.className = 'author'


            if (comm.by && comm.text) {
                authorDiv.textContent = 'Автор комментария: ' + comm.by
                div.innerHTML = comm.text
                if (comm.kids && comm.kids.length > 0) {
                    div.innerHTML += '<p><strong>Смотреть ответы</strong></p>'
                    div.addEventListener('click', function callback() {
                        getSubComments(index)
                        div.removeEventListener('click', callback)
                    })
                }
                point.append(authorDiv)
                point.append(div)
            }
        }
        )
    }


    if (isLoading) {
        return <Div className='loader'></Div>
    } else {
        return (
            <>
                <PanelHeader>
                    <Button onClick={() => routeNavigator.back()} >Назад</Button>
                    <Button className='header__button' onClick={() => location.reload()}>Обновить список комментариев</Button>
                    <Div className='header__title' >Stay up to date</Div>
                </PanelHeader>
                <Group mode="plain" header={<Header mode="secondary">История номер {story.id}</Header>}>
                    <CardGrid size="l">
                        <Card  >
                            <Div><Title level='1' >{story.title}</Title></Div>
                            {story.url && <Div>Читать подробнее... <Link>{story.url}</Link></Div>}
                            <Div>Автор: {story.by}</Div>
                            <Subhead><DateHelper time={story.time} /></Subhead>  {/*Опубликовано */}
                            <Div><Caption weight='3' >Рейтинг: {story.score}</Caption></Div>
                            {comments.length > 0 ? <Div> <Title level='3' >Комментариев: {comments.length} </Title></Div> :
                                <Div>Нет комментариев</Div>}
                            <Div className='point'></Div>
                        </Card>
                    </CardGrid>
                </Group>

            </>
        )
    }

}

// style={{ height: 96 }}