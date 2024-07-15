// src/content.tsx
console.log("Content script loaded");

const observer = new MutationObserver(() => {
  // 获取页面元素
  const paragraphs = document.querySelectorAll(
    "#cmd-bar-wrapper > div.miniProCont"
  );
  if (paragraphs.length > 0) {
    paragraphs.forEach((paragraph) => {
      paragraph.remove();
    });
  }

  const editorEle = document.querySelector("#editor");
  if (editorEle) {
    const editor = editorEle as HTMLElement;
    editor.classList.remove("containMiniPro");
  }

  const topBarEle = document.querySelector(".clz-editor-top-bar");
  if (topBarEle) {
    const topBar = topBarEle as HTMLElement;
    topBar.style.maxWidth = "100%";
  }

  const eDivEles = document.querySelectorAll(".e-div");
  if (eDivEles.length > 0) {
    eDivEles.forEach((eDivEle) => {
      const eDiv = eDivEle as HTMLElement;
      eDiv.style.maxWidth = "100%";
      eDiv.style.width = "calc(100% - .4rem)";
    });
  }

  const cmdBarContainerEles = document.querySelectorAll(".cmd-bar-container");
  if (cmdBarContainerEles.length > 0) {
    cmdBarContainerEles.forEach((cmdBarContainerEle) => {
      const cmdBarContainer = cmdBarContainerEle as HTMLElement;
      cmdBarContainer.style.textAlign = "left";
    });
  }
});

observer.observe(document.body, { childList: true, subtree: true });

// 监听窗口大小改变事件
// 窗口发生变化后，WPS便签又会把 【containMiniPro】 这个类名加到 #editor 元素上，导致页面布局错乱
// 一次设置不生效，猜测可能是由于 WPS 的渲染机制导致，所以这里采用定时检查的方式解决
window.addEventListener("resize", () => {
  // 定时检查和删除类名，最多执行 5 次
  let executionCount = 0;
  const maxExecutions = 3;
  // 定时检查和删除类名
  const intervalId = setInterval(() => {
    if (executionCount >= maxExecutions) {
      clearInterval(intervalId);
      return;
    }
    const editorEle = document.querySelector("#editor");
    if (editorEle) {
      const editor = editorEle as HTMLElement;
      editor.classList.remove("containMiniPro");
    }
    executionCount++;
  }, 500);
});
