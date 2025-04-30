/**
 * 主页JavaScript文件
 * 负责处理主页的交互逻辑和动态内容生成
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化导航菜单（移动端响应式）
    initMobileNav();
    
    // 渲染经历列表
    renderExperiencesList();

    // 保持名字显示为HTML中设置的原始文本
    // const nameElement = document.querySelector('.about-text h3 .highlight');
    // if (nameElement) {
    //     nameElement.textContent = '张紫阳';
    // }
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
 * 渲染经历列表
 */
function renderExperiencesList() {
    const experiencesContainer = document.getElementById('experiences-list');
    
    if (!experiencesContainer || !experiencesData || !experiencesData.length) return;
    
    // 清空容器
    experiencesContainer.innerHTML = '';
    
    // 遍历经历数据并创建卡片
    experiencesData.forEach(experience => {
        // 创建经历卡片
        const card = createExperienceCard(experience);
        
        // 添加点击事件，跳转到详情页
        card.addEventListener('click', function() {
            window.location.href = `experience-detail.html?id=${experience.id}`;
        });
        
        // 添加到容器
        experiencesContainer.appendChild(card);
    });
}

/**
 * 创建经历卡片元素
 * @param {Object} experience 经历对象
 * @returns {HTMLElement} 卡片元素
 */
function createExperienceCard(experience) {
    // 创建卡片元素
    const card = document.createElement('div');
    card.className = 'experience-card';
    
    // 构建卡片内容HTML
    card.innerHTML = `
        <div class="experience-image">
            <img src="${experience.image || 'images/placeholder.jpg'}" alt="${experience.title}">
        </div>
        <div class="experience-card-inner">
            <div class="experience-info">
                <h3>${experience.title}</h3>
                <div class="experience-meta">
                    <div class="experience-meta-item">
                        <i class="far fa-calendar-alt"></i>
                        <span>${experience.startDate} - ${experience.endDate}</span>
                    </div>
                    <div class="experience-meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${experience.location}</span>
                    </div>
                </div>
                <p>${experience.shortDescription}</p>
                <a href="experience-detail.html?id=${experience.id}" class="btn">查看详情</a>
            </div>
        </div>
    `;
    
    return card;
}