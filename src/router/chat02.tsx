import {CustomRouteRaw} from "@/types/Router.types.ts";
import Rectangle from "@/view/chat02/Reactangle";
const chat01: Array<CustomRouteRaw> = [
    {
        path: '/chat02',
        name: 'chat02',
        children: [{
            path: 'Rectangle',
            element: <Rectangle />,
            name: 'Rectangle',
        }] as Array<CustomRouteRaw>
    }
]

export default chat01;