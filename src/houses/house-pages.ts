import { IAppPage } from '@app/core/app-page/app-page';

export class HousePages {
    static feed: IAppPage = {
        label: 'Новости',
        template: 'feed.njk',
    };
    static organizations: IAppPage = {
        label: 'Организации',
        template: 'organizations.njk',
        path: 'organizations'
    };
    static about: IAppPage = {
        label: 'Информация',
        template: 'about.njk',
        path: 'about'
    };

    static getMenuPages(): IAppPage[] { 
        return [
            HousePages.feed, 
            HousePages.organizations, 
            HousePages.about
        ];
    }
}