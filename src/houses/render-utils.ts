import { FastifyReply } from 'fastify';
import { IAppPage, IAppPageContext } from '@app/core/app-page/app-page';
import { IMenuItem } from '@app/core/app-page/menu-item';
import { IHouse } from './house';
import { HousePages } from './house-pages';
import { PageUtils } from './page-utils';

export class RenderUtils {
    static renderWithContext(reply: FastifyReply, currentPage: IAppPage, house: IHouse, data: any): FastifyReply {
        const menu: IMenuItem[] = HousePages.getMenuPages().map(pageItem => {
            const ref = PageUtils.getPageRef(house, pageItem);
            return {
                label: pageItem.label, 
                ref, 
                active: pageItem === currentPage
            };
        })
        const context: IAppPageContext = {
            siteArea: house.name,
            pageHeader: currentPage.label,
            menu
        };
        return reply.view('/templates/house/' + currentPage.template, { context, data });
    }
}