/** 类目响应 */
declare interface CategoryVo {
    id: number;
    name: string;
    description: string;
    parentId: number;
    path: string;
    children: CategoryVo[];
}
