function isDesktop(width) {
    if (document.body.clientWidth >= parseInt(width)) {
        return true;
    }
    else {
        return false;
    }
}
(function main() {
    let animateDelay = 3;
    document.querySelectorAll('.thumbnail').forEach(function(item) {
        item.style.animationDelay = animateDelay + 's';
        item.classList.add('animate__animated', 'animate__fadeIn');
        animateDelay += .5;
    });
    document.querySelectorAll('video').forEach(function(video) {
        video.addEventListener('ended', function() {
            video.closest('.modal').querySelector('.btn-close').click();
        })
    })
    const headerAnimationContainer = document.querySelector('.header-col > div');
    if (isDesktop(992)) {
        headerAnimationContainer.classList.add('animate__animated', 'animate__fadeInRight');
    }
    else {
        headerAnimationContainer.classList.add('animate__animated', 'animate__fadeInDown');
    }
})();
function onResize() {
    document.querySelectorAll('.thumbnail').forEach(function(item, index) {
        if (isDesktop(992) && (index == 2)) {
            item.style.marginTop = (item.clientHeight / 2) + 'px';
        }
        else {
            item.style.marginTop = 0;
        }
    });
}
onResize();
window.onresize = onResize;