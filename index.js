const ACCESS_KEY='VIt1iYS3h4RPIVra7Y7jZnZVm2r3oAs2DEGH8psZ4kw';

const API_URL='https://api.unsplash.com';
const PER_PAGE = 12; // get images 12 per page

const getList = () => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', (e) => appendImages(xhr.response));
    xhr.open('GET', `${API_URL}/photos?page=1&per_page=${PER_PAGE}`);
    xhr.setRequestHeader('Authorization', `Client-ID ${ACCESS_KEY}`);
    xhr.send();
}
//cursor on input search
const focusOnSearch = () => {
    const search = document.getElementById('search');
    search.focus();
}

const pageInit = () => {
    focusOnSearch();
    getList();

    const searchButton = document.getElementById('fa-search');
    searchButton.addEventListener('click', (e) => searchImages());

    const searchElement = document.getElementById('input');
    searchElement.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchImages();
        }
    })
    
}

const clearImages = () => {
    const imagesParentEl = document.getElementById('images');

    while (imagesParentEl.firstChild) {
        imagesParentEl.firstChild.remove();
    }
}

const createImageElements = (images) => {
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

// get images start
const appendImages = (response) => {
    const images = JSON.parse(response);

    createImageElements(images);
}

const searchImages = () => {
    const searchEl = document.getElementById('input');
    const search = searchEl.value;
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        clearImages();

        const res = JSON.parse(xhr.response);

        createImageElements(res.results);
    });
    xhr.open('GET', `${API_URL}/search/photos?query=${search}&page=1&per_page=${PER_PAGE}`);
    xhr.setRequestHeader('Authorization', `Client-ID ${ACCESS_KEY}`);
    xhr.send();
}

window.addEventListener('DOMContentLoaded', pageInit());