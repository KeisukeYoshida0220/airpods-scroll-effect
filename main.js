document.addEventListener("DOMContentLoaded", function() {
  const html = document.documentElement;
  const canvas = document.getElementById("hero-lightpass");
  const context = canvas.getContext("2d");

  const frameCount = 92;
  const frameDelay = 100; // ミリ秒単位の遅延時間
  const preloadOffset = 10; // 先読みする画像の数
  const currentFrame = index =>
    `https://www.apple.com/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/hero/small/${index
      .toString()
      .padStart(4, "0")}.jpg`;

  let loadedCount = 0;
  let currentIndex = 1;
  const imagesToLoad = [];

  const preloadNextImages = () => {
    if (currentIndex >= frameCount) {
      return;
    }

    for (let i = 0; i < preloadOffset; i++) {
      const imgIndex = currentIndex + i;
      if (imgIndex >= frameCount) {
        break;
      }

      const img = new Image();
      img.src = currentFrame(imgIndex);
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= frameCount - 1) {
          loadedCount = frameCount - 1;
        }
      };

      imagesToLoad.push(img);
    }

    currentIndex += preloadOffset;
  };

  const img = new Image();
  img.src = currentFrame(1);
  canvas.width = 1440;
  canvas.height = 810;
  img.onload = function() {
    context.drawImage(img, 0, 0);
  };

  let isScrolling = false;
  let lastKnownScrollPosition = 0;
  let ticking = false;

  const scrollHandler = () => {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateImage();
        ticking = false;
      });

      ticking = true;
    }
  };

  const updateImage = () => {
    const scrollTop = lastKnownScrollPosition;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
      frameCount - 1,
      Math.ceil(scrollFraction * frameCount)
    );

    if (imagesToLoad.length > 0) {
      const currentImg = imagesToLoad[0];
      if (currentImg.complete) {
        img.src = currentImg.src;
        context.drawImage(img, 0, 0);
        imagesToLoad.shift();
      }
    }

    const preloadIndex = frameIndex + preloadOffset;
    if (preloadIndex < frameCount && !imagesToLoad.some(img => img.src === currentFrame(preloadIndex))) {
      const preloadImg = new Image();
      preloadImg.src = currentFrame(preloadIndex);
      imagesToLoad.push(preloadImg);
    }
  };

  window.addEventListener("scroll", scrollHandler, { passive: true });

  preloadNextImages();
}, false);
