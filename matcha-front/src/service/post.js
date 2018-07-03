export function PostData(type, data) {
    let BaseURL = 'http://localhost:8100/routes.php';
    return new Promise((resolve, reject) => {
        fetch(BaseURL+type, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then((response) => response.JSON())
        .then((res) => {
            resolve(res);
        })
        .catch((error) => {
            reject(error);
        });
    });
}
