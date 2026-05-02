/* ============================================================
   KALI LINUX PORTFOLIO — script.js
   ============================================================ */

"use strict";

// ============================================================
// MATRIX RAIN
// ============================================================
(function initMatrix() {
  const canvas = document.getElementById("matrix-canvas");
  const ctx = canvas.getContext("2d");
  let columns, drops;

  const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノ01ハヒフヘホ10マミムメモ{}<>[];/\\|ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / 18);
    drops   = Array(columns).fill(1);
  }

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff9f";
    ctx.font = "14px Share Tech Mono, monospace";

    for (let i = 0; i < drops.length; i++) {
      const char = CHARS[Math.floor(Math.random() * CHARS.length)];
      ctx.fillText(char, i * 18, drops[i] * 18);
      if (drops[i] * 18 > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  resize();
  window.addEventListener("resize", resize);
  setInterval(draw, 50);
})();


// ============================================================
// BOOT SEQUENCE
// ============================================================
(function initBoot() {
  document.body.classList.add("boot-active");

  const asciiDragon = `
     .                                                      .
    / V\\                                                  / V\\
  / \`  /   ██╗  ██╗ █████╗ ██╗     ██╗                 /\`  /
 <<   |    ██╔══██╗██╔══██╗██║     ██║                <<   |
  \\   \\    ██║  ██║███████║██║     ██║                 \\   \\
  /\\   \\   ██║  ██║██╔══██║██║     ██║                 /\\   \\
 (  \\    \\  ██████╔╝██║  ██║███████╗██║                (  \\    \\
  \\  \\    \\ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝                \\  \\    \\
   \\  \\    \\    ██╗     ██╗███╗   ██╗██╗   ██╗██╗  ██╗  \\  \\    \\
    \\  \\    \\   ██║     ██║████╗  ██║██║   ██║╚██╗██╔╝   \\  \\    \\
     \\  \\    \\  ██║     ██║██╔██╗ ██║██║   ██║ ╚███╔╝     \\  \\    \\
      \\  \\  / \\ ██║     ██║██║╚██╗██║██║   ██║ ██╔██╗      \\  \\  / \\
       \\  \\/   '██████╗ ██║██║ ╚████║╚██████╔╝██╔╝ ██╗      \\  \\/   '
        \\       ╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝       \\
`;

  const bootMessages = [
    { text: "[    0.000000] Kali GNU/Linux Rolling kernel initializing...", type: "info", delay: 100 },
    { text: "[    0.024731] BIOS-provided physical RAM map:", type: "log", delay: 80 },
    { text: "[    0.148200] Loading exploit framework... done", type: "ok", delay: 120 },
    { text: "[    0.352100] Mounting /proc filesystem... done", type: "ok", delay: 90 },
    { text: "[    0.601300] Initializing network interfaces: eth0 wlan0", type: "ok", delay: 100 },
    { text: "[    0.820500] Starting Metasploit Framework... done", type: "ok", delay: 150 },
    { text: "[    1.024000] Loading Burp Suite Community Edition... done", type: "ok", delay: 130 },
    { text: "[    1.350000] Starting nmap service... done", type: "ok", delay: 110 },
    { text: "[    1.621000] Initializing web development environment...", type: "info", delay: 120 },
    { text: "[    1.892000] Node.js v20.x detected... ok", type: "ok", delay: 90 },
    { text: "[    2.100000] React / Next.js frameworks loaded... ok", type: "ok", delay: 100 },
    { text: "[    2.355000] WARNING: root privileges detected", type: "warn", delay: 130 },
    { text: "[    2.600000] Freelance mode: ACTIVATED", type: "ok", delay: 150 },
    { text: "[    2.901000] Portfolio loading... please wait", type: "info", delay: 80 },
    { text: "[    3.200000] System ready. Welcome, hacker.", type: "ok", delay: 200 },
  ];

  const asciiEl    = document.getElementById("ascii-art");
  const bootLog    = document.getElementById("boot-log");
  const progressEl = document.getElementById("progress-bar");
  const bootScreen = document.getElementById("boot-screen");
  const mainSite   = document.getElementById("main-site");

  asciiEl.textContent = asciiDragon;

  let messageIndex = 0;
  const totalMessages = bootMessages.length;

  function showNextMessage() {
    if (messageIndex >= totalMessages) {
      finishBoot();
      return;
    }
    const msg = bootMessages[messageIndex];
    const span = document.createElement("span");
    span.className = `log-line log-${msg.type}`;
    span.textContent = msg.text;
    bootLog.appendChild(span);
    bootLog.scrollTop = bootLog.scrollHeight;

    const progress = ((messageIndex + 1) / totalMessages) * 100;
    progressEl.style.width = progress + "%";

    messageIndex++;
    setTimeout(showNextMessage, msg.delay);
  }

  function finishBoot() {
    setTimeout(() => {
      bootScreen.classList.add("fade-out");
      mainSite.classList.remove("hidden");
      document.body.classList.remove("boot-active");
      setTimeout(() => {
        mainSite.classList.add("visible");
        bootScreen.style.display = "none";
        initHeroTerminal();
        initScrollAnimations();
        initNavHighlight();
        initSkillBars();
        initUptimeCounter();
        revealOnScroll();
      }, 300);
    }, 500);
  }

  // Skip on Enter/click
  function skipBoot() {
    messageIndex = totalMessages;
    progressEl.style.width = "100%";
    setTimeout(finishBoot, 200);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") skipBoot();
  });
  bootScreen.addEventListener("click", skipBoot);

  setTimeout(showNextMessage, 400);
})();


// ============================================================
// HERO TERMINAL TYPEWRITER
// ============================================================
function initHeroTerminal() {
  const output = document.getElementById("terminal-output");
  const cursorLine = document.getElementById("cursor-line");
  const heroNameEl = document.getElementById("hero-name");
  const roleTags   = document.querySelectorAll(".role-tag");

  const lines = [
    { text: "root@kali:~# whoami", class: "t-green", delay: 0 },
    { text: "   ► John Doe — Security Engineer & Developer", class: "t-white", delay: 600 },
    { text: "", class: "", delay: 1000 },
    { text: "root@kali:~# cat specialization.txt", class: "t-green", delay: 1100 },
    { text: "   Web Development  |  Penetration Testing  |  Freelance", class: "t-cyan", delay: 1700 },
    { text: "", class: "", delay: 2200 },
    { text: "root@kali:~# ping -c 1 opportunity.com", class: "t-green", delay: 2300 },
    { text: "   PING opportunity.com: 64 bytes, icmp_seq=1, ttl=64, time=0.42ms", class: "t-blue", delay: 2900 },
    { text: "   Connection established. Let's build something great.", class: "t-white", delay: 3400 },
  ];

  let heroName = "John Doe";
  let nameIndex = 0;

  function typeName() {
    if (nameIndex <= heroName.length) {
      heroNameEl.textContent = heroName.slice(0, nameIndex);
      nameIndex++;
      setTimeout(typeName, 80);
    }
  }

  function typeLines(index) {
    if (index >= lines.length) {
      typeHeroName();
      return;
    }
    const line = lines[index];
    const delay = index === 0 ? 300 : line.delay;

    setTimeout(() => {
      const div = document.createElement("div");
      div.className = line.class;
      div.textContent = line.text;
      output.appendChild(div);
      output.scrollTop = output.scrollHeight;
      typeLines(index + 1);
    }, index === 0 ? 300 : line.delay - (index > 0 ? lines[index-1].delay : 0));
  }

  function typeHeroName() {
    setTimeout(typeName, 200);
    let roleIndex = 0;
    const roleInterval = setInterval(() => {
      roleTags.forEach(t => t.classList.remove("active"));
      roleTags[roleIndex]?.classList.add("active");
      roleIndex = (roleIndex + 1) % roleTags.length;
    }, 2000);
  }

  // sequential render
  let cumDelay = 300;
  lines.forEach((line, i) => {
    const thisDelay = i === 0 ? 300 : line.delay;
    setTimeout(() => {
      const div = document.createElement("div");
      div.className = line.class;
      div.textContent = line.text;
      output.appendChild(div);
      output.scrollTop = output.scrollHeight;
    }, thisDelay);
  });

  const lastDelay = lines[lines.length - 1].delay;
  setTimeout(() => {
    typeName();
    let roleIndex = 0;
    setInterval(() => {
      roleTags.forEach(t => t.classList.remove("active"));
      roleTags[roleIndex]?.classList.add("active");
      roleIndex = (roleIndex + 1) % roleTags.length;
    }, 2500);
  }, lastDelay + 500);

  // Typing simulation in input line
  const commands = ["nmap -sV target.com", "sqlmap -u 'http://...'", "python3 exploit.py", "nikto -h target.com", "gobuster dir -u ...", "hydra -l admin -P pass.txt"];
  let cmdIndex = 0;
  let charIndex = 0;
  let typing = true;

  function typeCommand() {
    const cmd = commands[cmdIndex];
    if (typing) {
      if (charIndex <= cmd.length) {
        cursorLine.textContent = cmd.slice(0, charIndex);
        charIndex++;
        setTimeout(typeCommand, 80);
      } else {
        typing = false;
        setTimeout(typeCommand, 1500);
      }
    } else {
      if (charIndex > 0) {
        charIndex--;
        cursorLine.textContent = cmd.slice(0, charIndex);
        setTimeout(typeCommand, 30);
      } else {
        typing = true;
        cmdIndex = (cmdIndex + 1) % commands.length;
        setTimeout(typeCommand, 400);
      }
    }
  }

  setTimeout(typeCommand, lastDelay + 800);
}


// ============================================================
// NAVBAR SCROLL & HIGHLIGHT
// ============================================================
function initNavHighlight() {
  const navbar   = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    // Scrolled state
    navbar.classList.toggle("scrolled", window.scrollY > 50);

    // Active section
    let current = "";
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) {
        current = sec.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}


// ============================================================
// HAMBURGER MENU
// ============================================================
(function initHamburger() {
  const btn     = document.getElementById("hamburger");
  const navList = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!btn) return;

  btn.addEventListener("click", () => {
    btn.classList.toggle("open");
    navList.classList.toggle("open");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      btn.classList.remove("open");
      navList.classList.remove("open");
    });
  });
})();


// ============================================================
// SKILL BARS ANIMATION
// ============================================================
function initSkillBars() {
  const bars = document.querySelectorAll(".skill-fill");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const width = target.getAttribute("data-width") + "%";
        setTimeout(() => { target.style.width = width; }, 200);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}


// ============================================================
// REVEAL ON SCROLL
// ============================================================
function revealOnScroll() {
  const revealTargets = [
    ...document.querySelectorAll(".skill-category"),
    ...document.querySelectorAll(".service-card"),
    ...document.querySelectorAll(".project-card"),
    ...document.querySelectorAll(".about-grid"),
    ...document.querySelectorAll(".contact-grid"),
  ];

  revealTargets.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealTargets.forEach(el => observer.observe(el));
}


// ============================================================
// INIT SCROLL ANIMATIONS (section headers)
// ============================================================
function initScrollAnimations() {
  const headers = document.querySelectorAll(".section-header");
  headers.forEach(h => {
    h.style.opacity = "0";
    h.style.transform = "translateX(-20px)";
    h.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = "1";
        e.target.style.transform = "translateX(0)";
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  headers.forEach(h => obs.observe(h));
}


// ============================================================
// UPTIME COUNTER
// ============================================================
function initUptimeCounter() {
  const startTime = Date.now();
  const footerEl  = document.getElementById("footer-uptime");
  const uptimeEl  = document.getElementById("uptime-val");

  function formatTime(ms) {
    const secs  = Math.floor(ms / 1000);
    const mins  = Math.floor(secs / 60);
    const hours = Math.floor(mins / 60);
    const days  = Math.floor(hours / 24);
    if (days > 0) return `${days}d ${hours % 24}h ${mins % 60}m`;
    if (hours > 0) return `${hours}h ${mins % 60}m ${secs % 60}s`;
    return `${mins}m ${secs % 60}s`;
  }

  setInterval(() => {
    const elapsed = Date.now() - startTime;
    if (footerEl) footerEl.textContent = formatTime(elapsed);
    if (uptimeEl) uptimeEl.textContent = "Freelance [" + formatTime(elapsed) + "]";
  }, 1000);
}


// ============================================================
// CONTACT FORM
// ============================================================
function handleFormSubmit(e) {
  e.preventDefault();
  const btn     = e.target.querySelector(".btn-text");
  const loader  = document.getElementById("btn-loader");
  const success = document.getElementById("form-success");

  btn.classList.add("hidden");
  loader.classList.remove("hidden");

  // Simulate send
  setTimeout(() => {
    loader.classList.add("hidden");
    btn.classList.remove("hidden");
    success.classList.remove("hidden");
    e.target.reset();
    setTimeout(() => success.classList.add("hidden"), 4000);
  }, 1800);
}


// ============================================================
// GLITCH EFFECT ON HOVER (project titles)
// ============================================================
(function initGlitch() {
  const titles = document.querySelectorAll(".project-title, .service-title");
  titles.forEach(title => {
    title.addEventListener("mouseenter", () => {
      const original = title.textContent;
      const chars = "!@#$%^&*<>[]{}|";
      let iterations = 0;
      const interval = setInterval(() => {
        title.textContent = original.split("").map((c, i) => {
          if (i < iterations) return original[i];
          if (c === " ") return " ";
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("");
        iterations += 1.5;
        if (iterations >= original.length) {
          clearInterval(interval);
          title.textContent = original;
        }
      }, 40);
    });
  });
})();


// ============================================================
// CURSOR TRAIL
// ============================================================
(function initCursorTrail() {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (isMobile) return;

  const trail = [];
  const trailLength = 8;

  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement("div");
    dot.style.cssText = `
      position: fixed;
      width: ${6 - i * 0.5}px;
      height: ${6 - i * 0.5}px;
      border-radius: 50%;
      background: rgba(0, 255, 159, ${0.6 - i * 0.07});
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.05s;
      will-change: left, top;
    `;
    document.body.appendChild(dot);
    trail.push({ el: dot, x: 0, y: 0 });
  }

  let mouseX = 0, mouseY = 0;
  window.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateTrail() {
    let x = mouseX, y = mouseY;
    trail.forEach((point, i) => {
      const prev = trail[i - 1] || { x: mouseX, y: mouseY };
      point.x += (prev.x - point.x) * 0.4;
      point.y += (prev.y - point.y) * 0.4;
      point.el.style.left = (point.x - 3) + "px";
      point.el.style.top  = (point.y - 3) + "px";
    });
    requestAnimationFrame(animateTrail);
  }

  animateTrail();
})();


// ============================================================
// SMOOTH ANCHOR SCROLL
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const navHeight = document.getElementById("navbar").offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 10;
    window.scrollTo({ top, behavior: "smooth" });
  });
});


// ============================================================
// TOOL BADGE HOVER SOUND (visual feedback)
// ============================================================
document.querySelectorAll(".tool-badge, .badge").forEach(el => {
  el.addEventListener("mouseenter", () => {
    el.style.letterSpacing = "0.08em";
    setTimeout(() => { el.style.letterSpacing = ""; }, 200);
  });
});


// ============================================================
// NAV CMD TOOLTIP
// ============================================================
(function initNavTooltips() {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function() {
      this.style.color = "var(--kali-cyan)";
      setTimeout(() => { this.style.color = ""; }, 300);
    });
  });
})();


// ============================================================
// SERVICE CARD ACTIVE PULSE
// ============================================================
document.querySelectorAll(".service-card").forEach((card, i) => {
  card.style.animationDelay = `${i * 0.1}s`;
});


// ============================================================
// FOOTER SOCIAL LINKS (prevent default for demo)
// ============================================================
document.querySelectorAll(".footer-links a").forEach(a => {
  if (a.getAttribute("href") === "#") {
    a.style.cursor = "pointer";
  }
});


console.log(`
%c
██╗  ██╗ █████╗ ██╗     ██╗    ██████╗  ██████╗ ██████╗ ████████╗
██║ ██╔╝██╔══██╗██║     ██║    ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝
█████╔╝ ███████║██║     ██║    ██████╔╝██║   ██║██████╔╝   ██║   
██╔═██╗ ██╔══██║██║     ██║    ██╔═══╝ ██║   ██║██╔══██╗   ██║   
██║  ██╗██║  ██║███████╗██║    ██║     ╚██████╔╝██║  ██║   ██║   
╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝   ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   

 root@kali:~# Welcome, fellow hacker. Stay ethical. 🐉
 [source code available on GitHub]
`, "color: #00ff9f; font-family: monospace; font-size: 10px;");
