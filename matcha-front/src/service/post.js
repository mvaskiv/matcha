export function PostData(type, data) {
    let BaseURL = '/routes.php/';
    return new Promise((resolve, reject) => {
        fetch(BaseURL+type, {
            method: 'POST',
            // mode: 'no-cors',
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        });
    });
}
