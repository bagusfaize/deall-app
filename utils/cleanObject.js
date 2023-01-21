import { isEmpty } from "lodash";

export const cleanObject = (obj) => {
    for (const key in obj) {
        if (isEmpty(obj[key])) {
            delete obj[key];
        }
    }
    return obj;
};