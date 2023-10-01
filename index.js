const ACCESS_KEY='VIt1iYS3h4RPIVra7Y7jZnZVm2r3oAs2DEGH8psZ4kw';

const API_URL='https://api.unsplash.com';
const PER_PAGE = 12;

const getList = () => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', (e) => appendImages(xhr.response));
    xhr.open('GET', `${API_URL}/photos?page=1&per_page=${PER_PAGE}`);
    xhr.setRequestHeader('Authorization', `Client-ID ${ACCESS_KEY}`);
    xhr.send();
}

const appendImages = (response) => {
    const images = JSON.parse(response);

    const imagesParentEl = document.getElementById('images');

    if (images && images.length) {
        images.forEach((image) => {
            const el = document.createElement('div');
            const resizedImageUrl = `${image.urls.raw}&w=1366&h=768`;

            el.style.backgroundImage = `url("${resizedImageUrl}")`;
            imagesParentEl.appendChild(el);
        })
    }
}

window.addEventListener('DOMContentLoaded', getList());