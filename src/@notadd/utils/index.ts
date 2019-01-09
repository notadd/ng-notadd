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

    public static isValidFiles(files: Array<File>, maxFiles: number): Array<string> {
        const errors: Array<string> = [];

        // Check Number of files
        if (files.length > maxFiles) {
            errors.push(`文件份数超出限制，一次只能上传 ${maxFiles} 份文件`);
        }
        return errors;
    }

    public static  isValidFileExtension(files: Array<File>, fileExtensions: string): Array<string> {
        const errors: Array<string> = [];

        // Make array of file extensions
        const extensions = fileExtensions
            .split(',')
            .map(extension => extension.toLocaleUpperCase().trim());

        for (let i = 0; i < files.length; i++) {
            if (!extensions.includes('*')) {
                // Get file extension
                const extension = files[i].name.toUpperCase().split('.').pop() || files[i].name;
                // Check the extension exists
                const exists = extensions.includes(extension);
                if (!exists) {
                    errors.push(`文件 [ ${files[i].name} ] 扩展名不符合，仅支持 ${fileExtensions}`);
                }
            }
        }

        return errors;
    }

    public static  isValidFileSize(files: Array<File>, maxFileSize: number): Array<string> {
        const errors: Array<string> = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileSizeInMB = file.size / (1024 * 1000);
            const size = Math.round(fileSizeInMB * 100) / 100; // convert upto 2 decimal place
            if (size > maxFileSize) {
                errors.push(`文件 [ ${file.name} ] 大小超过了 ${maxFileSize} MB`);
            }
        }

        return errors;
    }
}
