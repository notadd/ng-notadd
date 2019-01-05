export class NotaddUtils {
    static RowRangeStatus = {
        NO_ERROR: 0,
        SYNTAX_ERROR: -1,
        LIMIT_ERROR: -2
    };

    public static isInteger(toTest) {
        const numericExp = /^\s*[0-9]+\s*$/;
        return numericExp.test(toTest);
    }

    public static isPositiveInteger(value) {
        return this.isInteger(value) && parseInt(value, 10) > 0;
    }

    public  static rowRangeTextToRowList(rowRangeText, totalRowCount) {
        const rowRanges = this.rowRangeTextToRowRanges(rowRangeText, totalRowCount);
        const rowList = [];
        if (Array.isArray(rowRanges)) {
            for (let i = 0; i < rowRanges.length; ++i) {
                for (let j = rowRanges[i].from; j <= Math.min(rowRanges[i].to, totalRowCount); ++j) {
                    rowList.push(j);
                }
            }
        } else {
            return rowRanges;
        }
        if (rowList.length === 0) {
            for (let j = 1; j <= totalRowCount; ++j) {
                rowList.push(j);
            }
        }
        return rowList;
    }

    private static rowRangeTextToRowRanges(rowRangeText, optionTotalRowCount) {
        if (rowRangeText === '') {
            return [];
        }
        const MAX_ROW_NUMBER = 1e9;
        const totalRowCount = optionTotalRowCount ? optionTotalRowCount : MAX_ROW_NUMBER;
        const regex = /^\s*([0-9]*)\s*-\s*([0-9]*)\s*$/;
        const parts = rowRangeText.split(/[,|\u3001]/);
        const rowRanges = [];
        for (let i = 0; i < parts.length; ++i) {
            const match = parts[i].match(regex);
            if (match) {
                if (!this.isPositiveInteger(match[1]) && match[1] !== '') {
                    return this.RowRangeStatus.SYNTAX_ERROR;
                }
                if (!this.isPositiveInteger(match[2]) && match[2] !== '') {
                    return this.RowRangeStatus.SYNTAX_ERROR;
                }
                const from = match[1] ? parseInt(match[1], 10) : 1;
                const to = match[2] ? parseInt(match[2], 10) : totalRowCount;
                if (from > to) {
                    return this.RowRangeStatus.SYNTAX_ERROR;
                }
                if (to > totalRowCount) {
                    return this.RowRangeStatus.LIMIT_ERROR;
                }
                rowRanges.push({
                    from,
                    to
                });
            } else {
                if (!this.isPositiveInteger(parts[i])) {
                    return this.RowRangeStatus.SYNTAX_ERROR;
                }
                const singleRowNumber = parseInt(parts[i], 10);
                if (singleRowNumber > totalRowCount) {
                    return this.RowRangeStatus.LIMIT_ERROR;
                }
                rowRanges.push({
                    from: singleRowNumber,
                    to: singleRowNumber
                });
            }
        }
        return rowRanges;
    }
}
