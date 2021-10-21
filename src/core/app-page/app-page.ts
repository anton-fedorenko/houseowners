import { IMenuItem } from './menu-item';

export interface IAppPage {
    label: string;
    template: string;
    path?: string;
}

export interface IAppPageContext {
    siteArea: string;
    pageHeader: string;
    menu: IMenuItem[];
}