import { IAppPage } from '@app/core/app-page/app-page';
import { IHouse } from '@app/houses/house';

export class PageUtils {
    static getPageRef(house: IHouse, page: IAppPage): string {
        const segments = ['houses', house.page];
        if (page.path) 
            segments.push(page.path);
        return '/' + segments.join('/');
    }
}