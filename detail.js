/**
 * 详情页JavaScript文件
 * 负责处理详情页的交互逻辑和动态内容生成
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化导航菜单（移动端响应式）
    initMobileNav();
    
    // 获取URL参数中的经历ID
    const experienceId = getExperienceIdFromUrl();
    
    // 根据ID加载经历详情
    if (experienceId) {
        loadExperienceDetail(experienceId);
    } else {
        // 如果没有ID参数，显示错误信息
        showErrorMessage();
    }
});

/**
 * 初始化移动端导航菜单
 */
function initMobileNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
}

/**
 * 从URL中获取经历ID
 * @returns {number|null} 经历ID或null
 */
function getExperienceIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    
    return idParam ? parseInt(idParam) : null;
}

/**
 * 根据ID加载经历详情
 * @param {number} id 经历ID
 */
function loadExperienceDetail(id) {
    // 从数据中查找对应ID的经历
    const experience = experiencesData.find(exp => exp.id === id);
    
    if (experience) {
        renderExperienceDetail(experience);
        // 更新页面标题
        document.title = `${experience.title} - 我的个人网站`;
    } else {
        showErrorMessage();
    }
}

/**
 * 渲染经历详情
 * @param {Object} experience 经历对象
 */
function renderExperienceDetail(experience) {
    const detailContainer = document.getElementById('experience-detail');
    
    if (!detailContainer) return;
    
    // 构建详情HTML
    let detailHTML = `
        <div class="detail-header">
            <h2>${experience.title}</h2>
            <div class="detail-meta">
                <div class="detail-meta-item">
                    <i class="far fa-calendar-alt"></i>
                    <span>${experience.startDate} - ${experience.endDate}</span>
                </div>
                <div class="detail-meta-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${experience.location}</span>
                </div>
            </div>
        </div>
    `;
    
    // 添加图片（如果有）
    if (experience.image) {
        detailHTML += `<img src="${experience.image}" alt="${experience.title}" class="detail-image">`;
    }
    
    // 添加标签（如果有）
    if (experience.tags && experience.tags.length > 0) {
        detailHTML += '<div class="detail-tags">';
        experience.tags.forEach(tag => {
            detailHTML += `<span class="tag">${tag}</span>`;
        });
        detailHTML += '</div>';
    }

    // 添加详细描述
    if (experience.description) {
        detailHTML += `
            <div class="detail-section">
                <h3>详细描述</h3>
                <p>${experience.description}</p>
            </div>
        `;
    }

    // 添加公司/机构信息
    detailHTML += `
        <div class="detail-section">
            <h3>公司/机构</h3>
            <p class="company-name">${experience.company}</p>
        </div>
    `;

    // 渲染到容器
    detailContainer.innerHTML = detailHTML;

    // 隐藏错误信息容器
    const errorContainer = document.getElementById('error-container');
    if (errorContainer) {
        errorContainer.style.display = 'none';
    }
}

/**
 * 显示错误信息
 */
function showErrorMessage() {
    // 隐藏详情容器
    const detailContainer = document.getElementById('experience-detail');
    if (detailContainer) {
        detailContainer.style.display = 'none';
    }
    
    // 显示错误信息容器
    const errorContainer = document.getElementById('error-container');
    if (errorContainer) {
        errorContainer.style.display = 'block';
    }
}