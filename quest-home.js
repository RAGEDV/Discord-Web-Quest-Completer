(function() {
  'use strict';

  // 1️⃣ تحميل مكتبة Flaticon CSS تلقائياً
  const flaticonCSS = document.createElement('link');
  flaticonCSS.rel = 'stylesheet';
  flaticonCSS.href = 'https://cdn-uicons.flaticon.com/3.0.0/uicons-solid-rounded/css/uicons-solid-rounded.css'; // رابط مكتبة الأيقونات
  document.head.appendChild(flaticonCSS);

  // 2️⃣ إنشاء الزر
  function createQuestButton() {
    if (!window.location.pathname.includes('/quest-home')) {
      const existingButton = document.getElementById('discord-quest-helper-btn');
      if (existingButton) existingButton.remove();
      return;
    }

    if (document.getElementById('discord-quest-helper-btn')) return;

    const button = document.createElement('button');
    button.id = 'discord-quest-helper-btn';
    // سطر CSS يظهر أيقونة Flaticon باللون الأبيض
    button.innerHTML = '<i class="fi fi-sr-rocket-lunch" style="color:white;"></i> Run Quest Code';
    button.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 10000;
      padding: 12px 24px;
      background: linear-gradient(135deg, #5865F2 0%, #7289DA 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(88, 101, 242, 0.4);
      transition: all 0.3s ease;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      display: flex;
      align-items: center;
      gap: 6px;
    `;

    // تأثير hover
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)';
      button.style.boxShadow = '0 6px 16px rgba(88, 101, 242, 0.5)';
    });
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = '0 4px 12px rgba(88, 101, 242, 0.4)';
    });

    // عند الضغط على الزر
    button.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'executeQuestCode' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error:', chrome.runtime.lastError);
          button.innerHTML = '❌ Error!';
          button.style.background = 'linear-gradient(135deg, #F23F42 0%, #DC3F41 100%)';

          setTimeout(() => {
            button.innerHTML = '<i class="fi fi-sr-rocket-lunch" style="color:white;"></i> Run Quest Code';
            button.style.background = 'linear-gradient(135deg, #5865F2 0%, #7289DA 100%)';
          }, 2000);

        } else if (response && response.success) {
          button.innerHTML = '✅ Code Executed!';
          button.style.background = 'linear-gradient(135deg, #23A55A 0%, #2DCE7F 100%)';

          setTimeout(() => {
            button.innerHTML = '<i class="fi fi-sr-rocket-lunch" style="color:white;"></i> Run Quest Code';
            button.style.background = 'linear-gradient(135deg, #5865F2 0%, #7289DA 100%)';
          }, 2000);

        } else {
          button.innerHTML = '❌ Error!';
          button.style.background = 'linear-gradient(135deg, #F23F42 0%, #DC3F41 100%)';

          setTimeout(() => {
            button.innerHTML = '<i class="fi fi-sr-rocket-lunch" style="color:white;"></i> Run Quest Code';
            button.style.background = 'linear-gradient(135deg, #5865F2 0%, #7289DA 100%)';
          }, 2000);
        }
      });
    });

    document.body.appendChild(button);
  }

  // 3️⃣ مراقبة تغييرات الصفحة لتحديث الزر
  function init() {
    createQuestButton();

    let lastUrl = window.location.href;
    new MutationObserver(() => {
      const currentUrl = window.location.href;
      if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        createQuestButton();
      }
    }).observe(document.body, { childList: true, subtree: true });

    const observer = new MutationObserver(() => {
      createQuestButton();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
