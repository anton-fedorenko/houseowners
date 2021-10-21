import { IPagination } from './pagination';

export class PaginationUtils {
    static getPagination(baseRef: string, page: number, count: number, pageLimit: number): IPagination {
        let pagination: IPagination = {
            enabled: count > pageLimit,
            currentPage: page
        };
        if (count > page * pageLimit) {
            const nextPage = page + 1;
            pagination.nextRef = baseRef + `?page=` + nextPage;
        }
        if (page > 1) {
            const prevPage = page - 1;
            pagination.previousRef = baseRef + `?page=` + prevPage;
        }
        return pagination;
    }
}