export function buildFormData(obj): FormData {
    const formData = new FormData();

    for (const key of Object.keys(obj)) {
        const value = obj[key];
        formData.append(key, value);
    }

    return formData;
}
