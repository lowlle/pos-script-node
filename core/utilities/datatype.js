function dataType(){
    function isString(value) {
        return typeof value === 'string' || value instanceof String;
    }

    function isNumber(value) {
        return typeof value === 'number' && isFinite(value);
    }

    function isArray(value) {
        return value && typeof value === 'object' && value.constructor === Array;
    }

    function isFunction(value) {
        return typeof value === 'function';
    }

    function isNull(value) {
        return value === null;
    }

    function isUndefined(value) {
        return typeof value === 'undefined';
    }

    function isBoolean(value) {
        return typeof value === 'boolean';
    }

    function isRegExp(value) {
        return value && typeof value === 'object' && value.constructor === RegExp;
    }

    function isError(value) {
        return value instanceof Error && typeof value.message !== 'undefined';
    }

    function isDate(value) {
        return value instanceof Date;
    }

    function isSymbol(value) {
        return typeof value === 'symbol';
    }

    function isObject(value) {
        return value && typeof value === 'object' && value.constructor === Object;
    }

    function isInt(value){
        Number.isInteger = Number.isInteger || function (value) {
            return typeof value === 'number' &&
                isFinite(value) &&
                Math.floor(value) === value;
        };
        return Number.isInt(value)
    }

    function isFloat(value) {
        return isNumber(value) && Number(value) === value && value % 1 !== 0;
    }

    function checkDataType(value) {
        if(isString(value)) return "String"
        if(isInt(value)) return "Integer"
        if (isFloat(value)) return "Float"
        if(isArray(value)) return "Array"
        if(isFunction(value)) return "Function"
        if(isNull(value)) return "Null"
        if(isUndefined(value)) return "Undefined"
        if(isBoolean(value)) return "Boolean"
        if (isObject(value)) return "Object"
        if(isRegExp(value)) return "RegExp"
        if(isError(value)) return "Error"
        if(isDate(value)) return "Date"
        if(isSymbol(value)) return "Symbol"
        if(isNumber(value)) return "Number"
    }

    return {
        isString,
        isNumber,
        isArray,
        isFunction,
        isNull,
        isUndefined,
        isBoolean,
        isObject,
        isRegExp,
        isError,
        isDate,
        isSymbol,
        checkDataType
    }
}

module.exports = dataType()