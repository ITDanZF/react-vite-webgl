import {RouteObject} from "react-router";

export type CustomRouteRaw  = RouteObject & {
    name: string,
    children?: CustomRouteRaw[];  // 明确指定 children 字段
}