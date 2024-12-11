import {FC} from 'react'
import {Layout, Menu, theme } from "antd";
import { LaptopOutlined } from '@ant-design/icons'
import {Outlet, useNavigate} from "react-router-dom";
import {WebGLProvider} from "@/providers/WebGLProvider.tsx";
import MainLayoutScss from "./ManLayout.module.scss";
import router from '@/router/index'
import {CustomRouteRaw} from "@/types/Router.types.ts";
import type { ItemType, MenuItemType } from "antd/es/menu/interface";
const { Sider, Content } = Layout;


export type MenuItem = MenuItemType & {
    children?: ItemType<MenuItem>[]; // 允许有子菜单项
};

const MainLayout: FC = () => {
    const navigate =  useNavigate()

    // 侧边栏的伸缩隐藏
    // const [collapsed, setCollapsed] = useState<boolean>(false);
    // const toggleCollapse = () => {
    //     setCollapsed(!collapsed)
    // }

    // 递归动态生成侧边栏菜单
    const [route] = router.routes
    const routeArray = route.children as Array<CustomRouteRaw>
    if (!routeArray || !routeArray.length ) return
    function GetSiderRouter(RouteArray: Array<CustomRouteRaw>): ItemType<MenuItemType>[] {
        if (!RouteArray) return []
        const menuArr: ItemType<MenuItem>[] = []

        for (let i = 0; i < RouteArray.length; i++) {
            const result = {
                label: RouteArray[i].name,
                key: RouteArray[i].name,
                icon: <LaptopOutlined />,
            }
            if (RouteArray[i].children) {
                (result as MenuItem).children = GetSiderRouter(RouteArray[i].children as Array<CustomRouteRaw>)
            } else {
                (result as MenuItem).onClick = (e) => {
                    // console.log('点击', e)
                    navigate(`${e.keyPath[1]}/${e.keyPath[0]}`)
                }
            }

            menuArr.push(result)
        }
        return menuArr
    }

    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken()
    return (
        <Layout
        style={{ padding: '0', background: colorBgContainer, borderRadius: borderRadiusLG }}>
            <Sider style={{ background: colorBgContainer }} width={300}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[routeArray[0].name]}
                    defaultOpenKeys={[routeArray[0].name]}
                    style={{ height: '100%' }}
                    items={GetSiderRouter(routeArray)}
                />
            </Sider>
            <Content className={MainLayoutScss.CONTENT}>
                <WebGLProvider>
                    <div className={MainLayoutScss.CHILDREN}>
                        <Outlet/>
                    </div>
                </WebGLProvider>
            </Content>
        </Layout>
    )
}

export default MainLayout
