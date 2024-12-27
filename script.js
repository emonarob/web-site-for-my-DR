const canvas = document.getElementById('fireworks');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const fireworks = [];

        class Firework {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.particles = [];
                for (let i = 0; i < 200; i++) {
                    this.particles.push(new Particle(this.x, this.y));
                }
            }

            update() {
                this.particles.forEach(particle => particle.update());
            }

            draw() {
                this.particles.forEach(particle => particle.draw());
            }
        }

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 8 - 4;
                this.speedY = Math.random() * 8 - 4;
                this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
                this.opacity = 1;
                this.decay = Math.random() * 0.02 + 0.01;
                this.gravity = 0.05;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.speedY += this.gravity;
                this.opacity -= this.decay;
            }

            draw() {
                if (this.opacity > 0) {
                    ctx.globalAlpha = this.opacity;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = this.color;
                    ctx.fill();
                }
            }
        }

        function createFirework() {
            fireworks.push(new Firework(Math.random() * canvas.width, Math.random() * canvas.height));
        }

        function animate() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            fireworks.forEach((firework, index) => {
                firework.update();
                firework.draw();
                if (firework.particles.every(p => p.opacity <= 0)) {
                    fireworks.splice(index, 1);
                }
            });
            requestAnimationFrame(animate);
        }

        for (let i = 0; i < 8; i++) {
            setTimeout(createFirework, i * 500);
        }

        setTimeout(() => {
            document.getElementById('heartContainer').style.display = 'block';
            canvas.style.display = 'none';
        }, 6000);

        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });