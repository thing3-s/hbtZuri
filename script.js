document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. 🌟 新增：信封开场动画逻辑 🌟 ---
    const envelopeContainer = document.getElementById('envelope-container');
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const openEnvelopeBtn = document.getElementById('open-envelope-btn');

    if (openEnvelopeBtn && envelopeWrapper && envelopeContainer) {
        openEnvelopeBtn.addEventListener('click', () => {
            // 1. 触发信封打开和信纸冒出的动画
            envelopeWrapper.classList.add('open');
            
            // 2. 延迟后触发整体向上的拓展滑动动画
            envelopeContainer.classList.add('slide-up');

            // 3. 动画完成后将信封彻底从DOM中隐藏，防止阻挡后面的网页点击
            setTimeout(() => {
                envelopeContainer.style.display = 'none';
            }, 2200); // 等待上滑动画执行完毕 (1s 延迟 + 1.2s 动画时间)
        });
    }

    // 1. 音乐与动画控制
    const surpriseBtn = document.getElementById('surpriseBtn');
    const bgMusic = document.getElementById('bgMusic');
    const musicPlayer = document.getElementById('musicPlayer');
    const musicNotes = document.getElementById('musicNotes');
    const screenFlash = document.getElementById('screenFlash');
    const mainTitle = document.querySelector('.main-title');

    // 调试：检查元素是否获取成功
    console.log('按钮:', surpriseBtn);
    console.log('音乐:', bgMusic);
    console.log('唱片:', musicPlayer);
    console.log('音符:', musicNotes);

    if (surpriseBtn && bgMusic && musicPlayer && musicNotes) {
        surpriseBtn.addEventListener('click', async () => {
            console.log('按钮被点击了！'); // 调试用
            
            try {
                // 播放音乐
                await bgMusic.play();
                console.log('音乐播放成功');
                
                // 触发屏幕闪光
                if (screenFlash) {
                    screenFlash.classList.add('active');
                    setTimeout(() => screenFlash.classList.remove('active'), 600);
                }
                
                // 显示唱片并开始旋转（添加 playing 类）
                musicPlayer.classList.add('playing');
                
                // 显示音符并开始飘动（添加 playing 类）
                musicNotes.classList.add('playing');
                
                // 标题发光效果
                if (mainTitle) {
                    mainTitle.classList.add('playing-glow');
                }
                
                // 改变按钮状态
                surpriseBtn.textContent = '音乐播放中... 💕';
                surpriseBtn.style.opacity = '0.6';
                surpriseBtn.style.pointerEvents = 'none';
                
                // 弹出提示（可选）
                setTimeout(() => {
                    alert('2026年4月25日。\n这是我第一次为你过生日，应该还是意义重大的🎉\n这首孙燕姿的遇见是我们那天在KTV唱过的歌，我排着队，拿着爱的号码牌，终于遇见了你。');
                }, 800);
                
            } catch (err) {
                console.error('播放失败:', err);
                alert('需要点击才能播放音乐哦~');
            }
        });
    } else {
        console.error('有些元素没找到，请检查HTML结构');
    }

    // 2. 3D 全屏背景粒子星云
    const initParticles = () => {
        if (typeof THREE === 'undefined') return;

        const container = document.getElementById('particle-container');
        if (!container) return;

        // 全屏尺寸
        let width = window.innerWidth;
        let height = window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.3, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // 粒子系统参数
        const particlesCount = 10000; // 3万个粒子，全屏才够炫
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);

        const colorInside = new THREE.Color(0xffb6c1); // 主色
        const colorOutside = new THREE.Color(0xff4d6d); // 辅色

        for (let i = 0; i < particlesCount; i++) {
            // 玫瑰螺旋数学公式
            const angle = i * 0.1;
            const radius = 0.04 * Math.sqrt(i);
            
            positions[i * 3] = radius * Math.cos(angle);
            positions[i * 3 + 1] = radius * Math.sin(angle);
            positions[i * 3 + 2] = (Math.random() - 0.5) * 5 + Math.sin(radius * 5);

            // 颜色渐变
            const mixedColor = colorInside.clone().lerp(colorOutside, radius / 8);
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 200] = mixedColor.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            transparent: true,
            blending: THREE.AdditiveBlending,
            opacity: 0.7
        });

        const particlesMesh = new THREE.Points(geometry, material);
        scene.add(particlesMesh);

        // 动画
        const animate = () => {
            requestAnimationFrame(animate);
            particlesMesh.rotation.y += 0.0003; // 极慢的旋转，更显高级
            particlesMesh.rotation.x += 0.0005;
            renderer.render(scene, camera);
        };

        animate();

        // 真正的全屏窗口缩放适配
        window.addEventListener('resize', () => {
            width = window.innerWidth;
            height = window.innerHeight;
            
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            
            renderer.setSize(width, height);
        });
    };

    setTimeout(initParticles, 100);

    // --- NEW: Sticky Note System ---
    const modal = document.getElementById('sticky-modal');
    const noteContent = document.getElementById('note-content');
    const closeBtn = document.getElementById('close-note');

    // Personalized messages (edit freely)
    const photoNotes = {
        1: "校园里的花海，花的角度看我们的合照。",
        2: "雨天寻找咖啡店的日子，最后还是找到合适的一家。",
        3: "你精致的化了妆，去KTV的路上，这一刻定格。",
        4: "泉山森林公园里，我们在水杉的间隙，抬头望着天。",
        5: "你在微信里陪我探索校园的照片，那天的榴莲千层很好吃。",
        6: "仿佛变成了一朵朵油菜花，，向太阳生长。",
        7: "你宿舍旁的临花街上，像是深海里的一树花。",
        8: "那是漫步在樱花小道的夜晚。",
        9: "呈坎没看到的鱼灯，被我们发现了。"
    };

    // Add click listeners to all photo cards
    document.querySelectorAll('.photo-card').forEach(card => {
        card.addEventListener('click', () => {
            const photoId = card.getAttribute('data-photo');
            if (photoNotes[photoId]) {
                noteContent.innerHTML = `<p>${photoNotes[photoId]}</p>`;
                modal.style.display = 'flex';
            }
        });
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
});