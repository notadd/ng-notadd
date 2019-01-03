import { MatPaginatorIntl } from '@angular/material';

export class NotaddMatPaginatorIntlService extends MatPaginatorIntl {
    itemsPerPageLabel = '每页条数';
    nextPageLabel  = '下一页';
    previousPageLabel = '上一页';
    firstPageLabel = '首页';
    lastPageLabel = '尾页';

    getRangeLabel = function (page, pageSize, length) {
        if (length === 0 || pageSize === 0) {
            return '0 到 ' + length;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        // If the start index exceeds the list length,
        // do not try and fix the end index to the end.
        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;
        return `第${startIndex + 1}-${endIndex}条, 总共${length}条`;
    };
}
