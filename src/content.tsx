// src/content.tsx
console.log("Content script loaded");

// 移除 WPS 便签右侧的小程序二维码
function removeMiniProCont() {
  // 获取页面元素
  const paragraphs = document.querySelectorAll(
    "#cmd-bar-wrapper > div.miniProCont"
  );
  if (paragraphs.length > 0) {
    paragraphs.forEach((paragraph) => {
      paragraph.remove();
    });
  }
}

// 移除 WPS 便签编辑器的类名
// 此类名用 important 标记了最大宽度，通过 css 样式无法覆盖，所以要移除此类名
function removeEditorClass() {
  const editorEle = document.querySelector("#editor");
  if (editorEle) {
    const editor = editorEle as HTMLElement;
    editor.classList.remove("containMiniPro");
  }
}

// 调整 WPS 便签内容左侧宽度
function resizeTopBarWidth() {
  const topBarEle = document.querySelector(".clz-editor-top-bar");
  if (topBarEle) {
    const topBar = topBarEle as HTMLElement;
    topBar.style.maxWidth = "100%";
  }
}

// 调整 WPS 便签内容左侧宽度
function resizeEDivWidth() {
  const eDivEles = document.querySelectorAll(".e-div");
  if (eDivEles.length > 0) {
    eDivEles.forEach((eDivEle) => {
      const eDiv = eDivEle as HTMLElement;
      eDiv.style.maxWidth = "100%";
      eDiv.style.width = "calc(100% - .4rem)";
    });
  }
}

// 调整 WPS 便签内容左侧宽度
function resizeEHeaderWidth() {
  const eDivEles = document.querySelectorAll(".e-header");
  if (eDivEles.length > 0) {
    eDivEles.forEach((eDivEle) => {
      const eDiv = eDivEle as HTMLElement;
      eDiv.style.maxWidth = "100%";
      eDiv.style.width = "calc(100% - .4rem)";
    });
  }
}

// 调整 WPS 便签内容左侧宽度
function resizeEListWidth() {
  const eDivEles = document.querySelectorAll(".e-list");
  if (eDivEles.length > 0) {
    eDivEles.forEach((eDivEle) => {
      const eDiv = eDivEle as HTMLElement;
      eDiv.style.maxWidth = "100%";
      eDiv.style.width = "calc(100% - .4rem)";
    });
  }
}

// 图片左对齐
function resizeEImgWidth() {
  const eDivEles = document.querySelectorAll(".e-img");
  if (eDivEles.length > 0) {
    eDivEles.forEach((eDivEle) => {
      const eDiv = eDivEle as HTMLElement;
      eDiv.style.margin = "0";
    });
  }
}

// 调整 WPS 便签编辑器内容区域的文本对齐方式
function editContainerTextAlign() {
  const cmdBarContainerEles = document.querySelectorAll(".cmd-bar-container");
  if (cmdBarContainerEles.length > 0) {
    cmdBarContainerEles.forEach((cmdBarContainerEle) => {
      const cmdBarContainer = cmdBarContainerEle as HTMLElement;
      cmdBarContainer.style.textAlign = "left";
    });
  }
}

// 监听页面变化，当页面发生变化时，执行以下操作
const observer = new MutationObserver(() => {
  removeMiniProCont();
  removeEditorClass();
  resizeTopBarWidth();
  resizeEDivWidth();
  resizeEHeaderWidth();
  resizeEListWidth();
  resizeEImgWidth();
  editContainerTextAlign();
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
    removeEditorClass();
    executionCount++;
  }, 500);
});
