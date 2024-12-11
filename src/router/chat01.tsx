import Sierpinski from "@/view/chat01/Sierpinski";
import {CustomRouteRaw} from "@/types/Router.types.ts";
import SierpinskiThree from "@/view/chat01/Sierpinski-Three";
import SierpinskiThree2 from "@/view/chat01/Sierpinski-Three-2";
import SierpinskiColors from "@/view/chat01/Sierpinski-colors";
const chat01: Array<CustomRouteRaw> = [
    {
        path: '/chat01',
        name: 'chat01',
        children: [{
            path: 'Sierpinski',
            element: <Sierpinski />,
            name: 'Sierpinski',
        },{
            path: 'SierpinskiThree',
            element: <SierpinskiThree />,
            name: 'SierpinskiThree',
        },{
            path: 'SierpinskiColor',
            element: <SierpinskiColors />,
            name: 'SierpinskiColor',
        },{
            path: 'SierpinskiThree2',
            element: <SierpinskiThree2 />,
            name: 'SierpinskiThree2',
        }] as Array<CustomRouteRaw>,
    }
]

export default chat01;