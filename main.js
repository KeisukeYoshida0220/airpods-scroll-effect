document.addEventListener("DOMContentLoaded", function() {
  const html = document.documentElement;
  const canvas = document.getElementById("hero-lightpass");
  const context = canvas.getContext("2d");

  const frameCount = 92;
  const frameDelay = 100; // ミリ秒単位の遅延時間
  const preloadOffset = 6; // 先読みする画像の数
  const currentFrame = index =>
    `https://www.apple.com/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/hero/small/${index
      .toString()
      .padStart(4, "0")}.jpg`;

  let loadedCount = 0;
  let currentIndex = 1;
  const imagesToLoad = [];

  let isScrolling = false;
  let animationFrameId = null;

  const img = new Image();
  img.src = currentFrame(1);
  canvas.width = 1440;
  canvas.height = 810;
  img.onload = function() {
    context.drawImage(img, 0, 0);
  };

  const updateImage = () => {
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
      frameCount - 1,
      Math.ceil(scrollFraction * frameCount)
    );

    if (frameIndex !== currentIndex) {
      const imgIndex = frameIndex + preloadOffset;
      if (imgIndex < frameCount && !imagesToLoad.some(img => img.index === imgIndex)) {
        const preloadImg = new Image();
        preloadImg.index = imgIndex;
        preloadImg.src = currentFrame(imgIndex);
        imagesToLoad.push(preloadImg);
      }

      if (imagesToLoad.length > 0) {
        const currentImg = imagesToLoad[0];
        if (currentImg.complete) {
          img.src = currentImg.src;
          context.drawImage(img, 0, 0);
          currentIndex = frameIndex;
          imagesToLoad.shift();
        }
      }
    }

    isScrolling = false;
  };

  const scrollHandler = () => {
    if (!isScrolling) {
      isScrolling = true;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(updateImage);
    }
  };

  window.addEventListener("scroll", scrollHandler);

  updateImage(); // 初期表示時に画像を更新

}, false);
