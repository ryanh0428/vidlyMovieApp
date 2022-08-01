import _ from 'lodash';
export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items).slice(startIndex).take(pageSize).value();
    // _.slice(items, startIndex);cut the array from the start index
    //.take(pageSize) total number of items we are going to take from the array
    //.value convert a lodash wrapper item to simple array
}