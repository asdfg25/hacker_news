import { Div } from "@vkontakte/vkui"

interface IProps {
    time: number
}
export const DateHelper = ({ time }: IProps) => {
    return (
        <Div>Опубликовано: {new Date(time).toDateString()}, {new Date(time).getHours()}:
            {new Date(time).getMinutes().toString().length === 1 ? '0' + new Date(time).getMinutes().toString() :
                new Date(time).getSeconds().toString()}:
            {new Date(time).getSeconds().toString().length === 1 ? '0' + new Date(time).getSeconds().toString() :
                new Date(time).getSeconds().toString()} </Div>
    )
}