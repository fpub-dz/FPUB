/* ==========================================================================
   FPUB — i18n (EN / FR / AR)
   Simple client-side translation system driven by data-i18n attributes:
     data-i18n            -> sets textContent
     data-i18n-html        -> sets innerHTML (for markup like <br> or <span>)
     data-i18n-placeholder -> sets the placeholder attribute
   ========================================================================== */
(function () {

  const translations = {
    en: {
      nav: { work: "Work", services: "Services", process: "Process", agency: "Agency", cta: "Start Project" },
      hero: {
        eyebrow: "Open 2024",
        title: "Engineering excellence<br>through <span class=\"italic-accent\">human-centric</span><br>design.",
        desc: "We don't just build interfaces; we architect digital experiences that solve complex business challenges with surgical precision and artistic flair."
      },
      work: {
        eyebrow: "Case Studies",
        heading: "Selected Work",
        sub: "A sample of engagements delivered end-to-end, from strategy to measurable growth.",
        loading: "Loading case studies\u2026",
        empty: "No case studies published yet \u2014 add rows to the \u201cfpub_projects\u201d table in Supabase.",
        error: "Could not load case studies. Run supabase/schema.sql in your project, then reload."
      },
      services: {
        eyebrow: "Our Capabilities",
        heading: "What We Do",
        sub: "High-performance marketing, engineering, and creative solutions, precision-tuned for market leaders.",
        loading: "Loading services\u2026",
        empty: "No services published yet \u2014 add rows to the \u201cfpub_services\u201d table in Supabase.",
        error: "Could not load services. Run supabase/schema.sql in your project, then reload."
      },
      process: {
        heading: "Our Process",
        sub: "A 6-step clinical framework designed for speed, stability, and measurable impact.",
        scroll: "Scroll to explore",
        steps: {
          "01": { index: "01. Discovery", title: "Understanding your world", desc: "Deep immersion into your ecosystem. We audit your current tech stack, interview stakeholders, and define the \u201cwhy\u201d behind the project." },
          "02": { index: "02. Strategy", title: "Mapping the journey", desc: "We translate insights into actionable roadmaps, architecture diagrams, and high-fidelity project specifications." },
          "03": { index: "03. Design", title: "Precision-crafted aesthetics", desc: "We build design systems that are both visually arresting and rigorously functional across all breakpoints." },
          "04": { index: "04. Development", title: "Performance-first engineering", desc: "Our developers transform designs into high-speed, secure, and future-proof digital products." },
          "05": { index: "05. Launch", title: "A flawless market entry", desc: "We audit against QA, optimize for SEO, and manage the deployment to ensure a flawless market entry." },
          "06": { index: "06. Growth", title: "Continuous optimization", desc: "We analyze user data and behavior to continuously refine and grow your platform's impact." }
        }
      },
      story: {
        heading: "The FPUB Story",
        p1: "Born in the intersection of art and algorithm, FPUB Agency was founded by a collective of technologists and creatives who felt that agency work had grown stale. We replaced bloated overhead with lean, elite specialists.",
        p2: "Our mission is simple: to build the digital infrastructure of tomorrow, today. We believe in transparency, technical superiority, and the power of bold design to move markets.",
        stats: { retention: "Client Retention", projects: "Projects Launched", awards: "Global Awards", monitoring: "System Monitoring" }
      },
      pillars: {
        vision: { title: "Vision", desc: "To be the global benchmark for creative technology and digital transformation." },
        mission: { title: "Mission", desc: "Empowering visionaries with the technical tools and design expertise required to disrupt limitations." },
        values: { title: "Values", desc: "Radical honesty, ruthless efficiency, and a relentless pursuit of pixel-perfect execution." }
      },
      culture: {
        title: "Agency Culture",
        desc: "We foster an environment of continuous learning and creative freedom. Our studio is more than just a workplace; it's an incubator for the next generation of digital breakthroughs."
      },
      team: {
        heading: "Meet the Experts",
        sub: "A multidisciplinary strike team dedicated to your project's success.",
        roles: { founder: "Founder / CEO", engineer: "Lead Software Engineer", strategy: "Head of Strategy", designer: "Senior UI Designer" }
      },
      faq: {
        heading: "Frequently Asked Questions",
        q1: "How long does a typical project take?",
        a1: "Most engagements run 6 to 12 weeks from discovery to launch, depending on scope. We share a detailed timeline at the end of the strategy phase.",
        q2: "Do you work with startups or enterprises?",
        a2: "Both. Our process scales from lean MVP builds for early-stage startups to multi-market rollouts for established enterprises.",
        q3: "What is your technology stack?",
        a3: "We favor Next.js and React on the front end, headless commerce for storefronts, and cloud-native infrastructure tuned to each client's scale.",
        q4: "Will we own the intellectual property?",
        a4: "Yes. Upon final payment, full ownership of the code, design files, and assets we create transfers to you."
      },
      contact: {
        heading: "Let's build something bold.",
        sub: "Brief us on your vision, and we'll engineer the impact.",
        name: "Full Name", namePlaceholder: "John Doe",
        email: "Email Address", emailPlaceholder: "john@example.com",
        scope: "Project Scope",
        scopeOptions: { rebrand: "Full Rebrand", webapp: "Web App / Platform", marketing: "Marketing Campaign", ai: "AI Automation", other: "Other" },
        message: "Message", messagePlaceholder: "Tell us about your goals...",
        send: "Send Inquiry",
        sending: "Sending...",
        success: "Thanks — your inquiry has been sent. We'll be in touch shortly.",
        error: "Something went wrong. Please try again in a moment.",
        info: { heading: "Get in Touch", channels: "Direct Channels", channelsLoading: "Loading…", hq: "Headquarters" }
      },
      footer: {
        tagline: "Architecting the future of digital interaction through engineering excellence and luxury design.",
        explore: "Explore", caseStudies: "Case Studies", ourStory: "Our Story", services: "Services",
        company: "Company", careers: "Careers", pressKit: "Press Kit", blog: "Blog",
        legal: "Legal", privacy: "Privacy Policy", terms: "Terms of Service", contactUs: "Contact Us",
        copy: "© 2024 FPUB Agency. All rights reserved."
      }
    },

    fr: {
      nav: { work: "Réalisations", services: "Services", process: "Process", agency: "Agence", cta: "Démarrer un projet" },
      hero: {
        eyebrow: "Ouvert en 2024",
        title: "Une excellence d'ingénierie<br>au service d'un design <span class=\"italic-accent\">centré sur l'humain</span>.",
        desc: "Nous ne construisons pas de simples interfaces : nous concevons des expériences numériques qui résolvent des enjeux complexes avec précision et sensibilité artistique."
      },
      work: {
        eyebrow: "Études de cas",
        heading: "Réalisations sélectionnées",
        sub: "Un aperçu de projets menés de bout en bout, de la stratégie à une croissance mesurable.",
        loading: "Chargement des études de cas…",
        empty: "Aucune étude de cas publiée pour l'instant — ajoutez des lignes à la table \u00ab fpub_projects \u00bb dans Supabase.",
        error: "Impossible de charger les études de cas. Exécutez supabase/schema.sql dans votre projet, puis rechargez."
      },
      services: {
        eyebrow: "Nos savoir-faire",
        heading: "Ce que nous faisons",
        sub: "Marketing, ingénierie et production créative haute performance, calibrés pour les leaders de marché.",
        loading: "Chargement des services…",
        empty: "Aucun service publié pour l'instant — ajoutez des lignes à la table \u00ab fpub_services \u00bb dans Supabase.",
        error: "Impossible de charger les services. Exécutez supabase/schema.sql dans votre projet, puis rechargez."
      },
      process: {
        heading: "Notre Process",
        sub: "Un cadre clinique en 6 étapes, pensé pour la rapidité, la stabilité et un impact mesurable.",
        scroll: "Découvrir",
        steps: {
          "01": { index: "01. Découverte", title: "Comprendre votre univers", desc: "Une immersion profonde dans votre écosystème. Nous auditons votre stack technique, interrogeons les parties prenantes et définissons le \u00ab pourquoi \u00bb du projet." },
          "02": { index: "02. Stratégie", title: "Cartographier la trajectoire", desc: "Nous traduisons les enseignements en feuilles de route concrètes, en schémas d'architecture et en spécifications détaillées." },
          "03": { index: "03. Design", title: "Une esthétique de précision", desc: "Nous construisons des systèmes de design à la fois marquants visuellement et rigoureusement fonctionnels sur tous les formats." },
          "04": { index: "04. Développement", title: "Une ingénierie orientée performance", desc: "Nos développeurs transforment les maquettes en produits rapides, sécurisés et pérennes." },
          "05": { index: "05. Lancement", title: "Une mise sur le marché sans accroc", desc: "Nous auditons la qualité, optimisons le SEO et pilotons le déploiement pour une entrée sur le marché sans faille." },
          "06": { index: "06. Croissance", title: "Une optimisation continue", desc: "Nous analysons les données et comportements utilisateurs pour affiner et faire grandir l'impact de votre plateforme." }
        }
      },
      story: {
        heading: "L'histoire de FPUB",
        p1: "Née à la croisée de l'art et de l'algorithme, l'agence FPUB a été fondée par un collectif de technologues et de créatifs lassés d'un travail d'agence devenu convenu. Nous avons remplacé les structures lourdes par des spécialistes d'élite, agiles.",
        p2: "Notre mission est simple : construire dès aujourd'hui l'infrastructure numérique de demain. Nous croyons en la transparence, la supériorité technique et le pouvoir d'un design audacieux pour faire bouger les marchés.",
        stats: { retention: "Rétention client", projects: "Projets lancés", awards: "Récompenses internationales", monitoring: "Supervision système" }
      },
      pillars: {
        vision: { title: "Vision", desc: "Devenir la référence mondiale de la technologie créative et de la transformation numérique." },
        mission: { title: "Mission", desc: "Donner aux visionnaires les outils techniques et l'expertise design nécessaires pour dépasser leurs limites." },
        values: { title: "Valeurs", desc: "Honnêteté radicale, efficacité sans compromis et exigence obsessionnelle du détail." }
      },
      culture: {
        title: "Culture d'agence",
        desc: "Nous cultivons un environnement d'apprentissage continu et de liberté créative. Notre studio est bien plus qu'un lieu de travail : c'est un incubateur pour la prochaine génération de ruptures numériques."
      },
      team: {
        heading: "Rencontrez les experts",
        sub: "Une équipe pluridisciplinaire dédiée à la réussite de votre projet.",
        roles: { founder: "Fondateur / CEO", engineer: "Ingénieure logiciel principale", strategy: "Responsable stratégie", designer: "Designer UI senior" }
      },
      faq: {
        heading: "Questions fréquentes",
        q1: "Combien de temps dure un projet type ?",
        a1: "La plupart des projets durent de 6 à 12 semaines, de la découverte au lancement, selon le périmètre. Un calendrier détaillé est partagé à l'issue de la phase de stratégie.",
        q2: "Travaillez-vous avec des startups ou des grandes entreprises ?",
        a2: "Les deux. Notre process s'adapte, d'un MVP léger pour une jeune startup à un déploiement multi-marchés pour un grand groupe.",
        q3: "Quelle est votre stack technique ?",
        a3: "Nous privilégions Next.js et React côté front, le e-commerce headless pour les boutiques en ligne, et une infrastructure cloud-native adaptée à l'échelle de chaque client.",
        q4: "La propriété intellectuelle nous revient-elle ?",
        a4: "Oui. Après le paiement final, la pleine propriété du code, des fichiers de design et des livrables créés vous est transférée."
      },
      contact: {
        heading: "Construisons quelque chose d'audacieux.",
        sub: "Présentez-nous votre vision, nous en ferons un impact concret.",
        name: "Nom complet", namePlaceholder: "Jean Dupont",
        email: "Adresse e-mail", emailPlaceholder: "jean@exemple.com",
        scope: "Périmètre du projet",
        scopeOptions: { rebrand: "Refonte complète de marque", webapp: "Application / plateforme web", marketing: "Campagne marketing", ai: "Automatisation IA", other: "Autre" },
        message: "Message", messagePlaceholder: "Parlez-nous de vos objectifs...",
        send: "Envoyer la demande",
        sending: "Envoi en cours...",
        success: "Merci — votre demande a bien été envoyée. Nous revenons vers vous rapidement.",
        error: "Un problème est survenu. Merci de réessayer dans un instant.",
        info: { heading: "Nous contacter", channels: "Canaux directs", channelsLoading: "Chargement…", hq: "Notre siège" }
      },
      footer: {
        tagline: "Nous construisons l'avenir de l'interaction numérique, entre excellence d'ingénierie et design haut de gamme.",
        explore: "Explorer", caseStudies: "Études de cas", ourStory: "Notre histoire", services: "Services",
        company: "Entreprise", careers: "Carrières", pressKit: "Kit presse", blog: "Blog",
        legal: "Mentions légales", privacy: "Politique de confidentialité", terms: "Conditions d'utilisation", contactUs: "Nous contacter",
        copy: "© 2024 Agence FPUB. Tous droits réservés."
      }
    },

    ar: {
      nav: { work: "أعمالنا", services: "خدماتنا", process: "منهجيتنا", agency: "الوكالة", cta: "ابدأ مشروعك" },
      hero: {
        eyebrow: "منذ 2024",
        title: "هندسة احترافية<br>لتصميم <span class=\"italic-accent\">محوره الإنسان</span>.",
        desc: "نحن لا نبني واجهات فقط، بل نصمّم تجارب رقمية تحلّ تحديات الأعمال المعقّدة بدقة هندسية وحسّ فني عالٍ."
      },
      work: {
        eyebrow: "دراسات الحالة",
        heading: "أعمال مختارة",
        sub: "نماذج من مشاريع أنجزناها من الاستراتيجية حتى نتائج نمو ملموسة.",
        loading: "جارٍ تحميل دراسات الحالة...",
        empty: "لا توجد دراسات حالة منشورة بعد \u2014 أضف سطورًا إلى جدول \u00abfpub_projects\u00bb في Supabase.",
        error: "تعذّر تحميل دراسات الحالة. نفّذ supabase/schema.sql في مشروعك ثم أعد التحميل."
      },
      services: {
        eyebrow: "قدراتنا",
        heading: "ماذا نقدّم",
        sub: "تسويق وهندسة وإنتاج إبداعي عالي الأداء، مصمّم بدقة لقادة السوق.",
        loading: "جارٍ تحميل الخدمات...",
        empty: "لا توجد خدمات منشورة بعد \u2014 أضف سطورًا إلى جدول \u00abfpub_services\u00bb في Supabase.",
        error: "تعذّر تحميل الخدمات. نفّذ supabase/schema.sql في مشروعك ثم أعد التحميل."
      },
      process: {
        heading: "منهجية عملنا",
        sub: "إطار عمل من 6 خطوات مدروسة بدقة، مصمم للسرعة والاستقرار وتحقيق أثر ملموس وقابل للقياس.",
        scroll: "اكتشف المزيد",
        steps: {
          "01": { index: "01. الاكتشاف", title: "فهم عالمك", desc: "انغماس عميق في منظومتك. نراجع بنيتك التقنية الحالية، نجري مقابلات مع أصحاب المصلحة، ونحدّد \u00abلماذا\u00bb المشروع." },
          "02": { index: "02. الاستراتيجية", title: "رسم مسار العمل", desc: "نترجم النتائج إلى خرائط طريق عملية ومخططات معمارية ومواصفات مشروع عالية الدقة." },
          "03": { index: "03. التصميم", title: "جماليات دقيقة الصنع", desc: "نبني أنظمة تصميم لافتة بصريًا وفي نفس الوقت وظيفية بدقة على جميع أحجام الشاشات." },
          "04": { index: "04. التطوير", title: "هندسة تُقدّم الأداء أولاً", desc: "يحوّل مطوّرونا التصاميم إلى منتجات رقمية سريعة وآمنة وجاهزة للمستقبل." },
          "05": { index: "05. الإطلاق", title: "دخول سوق بلا عيوب", desc: "نراجع الجودة، نُحسّن لمحركات البحث، وندير عملية النشر لضمان دخول سلس إلى السوق." },
          "06": { index: "06. النمو", title: "تحسين مستمر", desc: "نحلّل بيانات وسلوك المستخدمين لتطوير أثر منصتك باستمرار." }
        }
      },
      story: {
        heading: "قصة FPUB",
        p1: "وُلدت FPUB عند تقاطع الفن والخوارزمية، على يد مجموعة من التقنيين والمبدعين الذين رأوا أن عمل الوكالات التقليدية أصبح رتيبًا. استبدلنا الهياكل الثقيلة بفريق نخبة رشيق ومتخصص.",
        p2: "مهمتنا بسيطة: بناء البنية التحتية الرقمية للغد، اليوم. نؤمن بالشفافية والتفوق التقني وقدرة التصميم الجريء على تحريك الأسواق.",
        stats: { retention: "نسبة بقاء العملاء", projects: "مشروعًا منجزًا", awards: "جائزة عالمية", monitoring: "مراقبة الأنظمة" }
      },
      pillars: {
        vision: { title: "الرؤية", desc: "أن نكون المرجع العالمي في التكنولوجيا الإبداعية والتحول الرقمي." },
        mission: { title: "الرسالة", desc: "تمكين أصحاب الرؤى من الأدوات التقنية والخبرة التصميمية اللازمة لتجاوز حدودهم." },
        values: { title: "القيم", desc: "صدق جذري، وكفاءة لا تساوم، وسعي دائم إلى تنفيذ متقن حتى آخر تفصيلة." }
      },
      culture: {
        title: "ثقافة الوكالة",
        desc: "نُرسّخ بيئة من التعلّم المستمر والحرية الإبداعية. استوديونا أكبر من مجرد مكان عمل، إنه حاضنة للجيل القادم من الاختراقات الرقمية."
      },
      team: {
        heading: "تعرّف على فريق الخبراء",
        sub: "فريق متعدد التخصصات مكرّس لنجاح مشروعك.",
        roles: { founder: "المؤسس / الرئيس التنفيذي", engineer: "مهندسة برمجيات رئيسية", strategy: "مسؤول الاستراتيجية", designer: "مصممة واجهات أولى" }
      },
      faq: {
        heading: "الأسئلة الشائعة",
        q1: "كم يستغرق المشروع عادة؟",
        a1: "تستغرق معظم المشاريع من 6 إلى 12 أسبوعًا من مرحلة الاكتشاف حتى الإطلاق، حسب حجم المشروع. نشارككم جدولاً زمنيًا مفصلاً في نهاية مرحلة الاستراتيجية.",
        q2: "هل تعملون مع الشركات الناشئة أم الكبرى؟",
        a2: "مع الاثنين. تتكيّف منهجيتنا من نسخة أولية خفيفة لشركة ناشئة إلى انتشار في أسواق متعددة لمؤسسة كبرى.",
        q3: "ما هي التقنيات التي تعتمدونها؟",
        a3: "نفضّل Next.js وReact في الواجهة الأمامية، والتجارة الإلكترونية بدون رأس (headless) للمتاجر، وبنية سحابية مصممة حسب حجم كل عميل.",
        q4: "هل تؤول الملكية الفكرية إلينا؟",
        a4: "نعم. بعد سداد الدفعة النهائية، تنتقل الملكية الكاملة للأكواد وملفات التصميم والأصول التي ننشئها إليكم."
      },
      contact: {
        heading: "لنبنِ شيئًا جريئًا معًا.",
        sub: "شاركونا رؤيتكم، ونحن نتكفّل بهندسة الأثر.",
        name: "الاسم الكامل", namePlaceholder: "أحمد بن علي",
        email: "البريد الإلكتروني", emailPlaceholder: "ahmed@example.com",
        scope: "نطاق المشروع",
        scopeOptions: { rebrand: "إعادة تصميم الهوية بالكامل", webapp: "تطبيق / منصة ويب", marketing: "حملة تسويقية", ai: "أتمتة بالذكاء الاصطناعي", other: "آخر" },
        message: "الرسالة", messagePlaceholder: "أخبرونا عن أهدافكم...",
        send: "أرسل الطلب",
        sending: "جارٍ الإرسال...",
        success: "شكرًا، تم إرسال طلبكم. سنتواصل معكم قريبًا.",
        error: "حدث خطأ ما. من فضلكم أعيدوا المحاولة بعد قليل.",
        info: { heading: "تواصل معنا", channels: "قنوات مباشرة", channelsLoading: "جارٍ التحميل...", hq: "مقرنا الرئيسي" }
      },
      footer: {
        tagline: "نبني مستقبل التفاعل الرقمي بمزيج من التميز الهندسي والتصميم الفاخر.",
        explore: "استكشف", caseStudies: "دراسات الحالة", ourStory: "قصتنا", services: "الخدمات",
        company: "الشركة", careers: "وظائف", pressKit: "ملف صحفي", blog: "المدونة",
        legal: "قانوني", privacy: "سياسة الخصوصية", terms: "شروط الاستخدام", contactUs: "تواصل معنا",
        copy: "© 2024 وكالة FPUB. جميع الحقوق محفوظة."
      }
    }
  };

  function getPath(obj, path) {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  }

  function applyLanguage(lang) {
    const dict = translations[lang] || translations.en;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const val = getPath(dict, el.getAttribute('data-i18n'));
      if (val !== undefined) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      const val = getPath(dict, el.getAttribute('data-i18n-html'));
      if (val !== undefined) el.innerHTML = val;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const val = getPath(dict, el.getAttribute('data-i18n-placeholder'));
      if (val !== undefined) el.setAttribute('placeholder', val);
    });

    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    html.classList.toggle('lang-ar', lang === 'ar');

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    try { localStorage.setItem('fpub-lang', lang); } catch (e) { /* storage may be unavailable */ }
    window.FPUB_LANG = lang;
    window.FPUB_TRANSLATIONS = dict;
  }

  document.addEventListener('DOMContentLoaded', function () {
    let saved = 'en';
    try { saved = localStorage.getItem('fpub-lang') || 'en'; } catch (e) { /* ignore */ }
    applyLanguage(saved);

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLanguage(btn.getAttribute('data-lang'));
      });
    });
  });

  window.FPUB_applyLanguage = applyLanguage;
})();
