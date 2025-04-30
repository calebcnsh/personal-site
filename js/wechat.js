// 创建弹窗容器
function createWechatModal() {
    const modal = document.createElement('div');
    modal.id = 'wechat-modal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modal.style.zIndex = '1000';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.3s ease';

    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = '#fff';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '10px';
    modalContent.style.textAlign = 'center';
    modalContent.style.maxWidth = '300px';
    modalContent.style.width = '90%';

    const title = document.createElement('h3');
    title.textContent = '扫码添加微信';
    title.style.marginBottom = '15px';

    const qrCode = document.createElement('img');
    qrCode.id = 'wechat-qr';
    qrCode.src = 'images/IMG_2495.JPG';
    qrCode.style.width = '100%';
    qrCode.style.maxWidth = '250px';
    qrCode.style.height = 'auto';
    qrCode.alt = '微信二维码';

    modalContent.appendChild(title);
    modalContent.appendChild(qrCode);
    modal.appendChild(modalContent);

    // 点击空白处关闭弹窗
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    return modal;
}

// 显示弹窗
function showModal() {
    const modal = document.getElementById('wechat-modal');
    modal.style.display = 'flex';
    // 强制重绘
    modal.offsetHeight;
    modal.style.opacity = '1';
}

// 隐藏弹窗
function hideModal() {
    const modal = document.getElementById('wechat-modal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// 初始化微信弹窗
document.addEventListener('DOMContentLoaded', () => {
    // 创建并添加弹窗到页面
    const modal = createWechatModal();
    document.body.appendChild(modal);

    // 为微信图标添加点击事件（使用事件委托，以支持动态添加的元素）
    document.body.addEventListener('click', (e) => {
        const wechatLink = e.target.closest('.wechat-link');
        if (wechatLink) {
            e.preventDefault();
            showModal();
        }
    });
});