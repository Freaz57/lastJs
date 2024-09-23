const accessKey = 'NNGnouP3lRPERYCfH2wJv2pqleSZLDcpW9BrFkdamtw';
const photoElement = document.getElementById('photo');
const photographerElement = document.getElementById('photographer');
const likeCountElement = document.getElementById('like-count');

async function randomPhoto() {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`);
        const data = await response.json();
        displayPhoto(data);
    } catch (error) {
        console.error('Ошибка при получении изображения:', error);
    }
}

function displayPhoto(photoData) {
    // Обновляем изображение и фотографа
    photoElement.src = photoData.urls.regular;
    photographerElement.textContent = photoData.user.name;
    photoElement.setAttribute('data-photo-id', photoData.id);
    loadLike(photoData.id);
}

function likePhoto() {
    let currentCount = parseInt(likeCountElement.textContent);
    currentCount++;
    likeCountElement.textContent = currentCount;
    saveLike(photoElement.getAttribute('data-photo-id'), currentCount);
}

function saveLike(photoId, count) {
    localStorage.setItem(`like-${photoId}`, count);
}

function loadLike(photoId) {
    const savedCount = localStorage.getItem(`like-${photoId}`);
    likeCountElement.textContent = savedCount ? savedCount : 0;
}


randomPhoto();
