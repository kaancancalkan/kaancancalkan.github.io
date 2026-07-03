"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Download,
  Mail,
  Sun,
  Moon,
  Github,
  Linkedin,
  ExternalLink,
  Pencil,
  PenTool,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import Image from "next/image";

type Language = "en" | "tr" | "vi";

function isPeriodInFuture(period: string): boolean {
  const yearMatch = period.match(/\b\d{4}\b/);
  if (!yearMatch) return false;
  const year = parseInt(yearMatch[0], 10);

  let month = 1;
  const periodLower = period.toLowerCase();

  const enMonths = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const enFullMonths = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
  
  const trMonths = ["ocak", "şubat", "subat", "mart", "nisan", "mayıs", "mayis", "haziran", "temmuz", "ağustos", "agustos", "eylül", "eylul", "ekim", "kasım", "kasim", "aralık", "aralik"];
  const trMonthMap: Record<string, number> = {
    ocak: 1, şubat: 2, subat: 2, mart: 3, nisan: 4, mayıs: 5, mayis: 5, haziran: 6,
    temmuz: 7, ağustos: 8, agustos: 8, eylül: 9, eylul: 9, ekim: 10, kasım: 11, kasim: 11, aralık: 12, aralik: 12
  };

  const viMatch = periodLower.match(/tháng\s*(\d+)/);
  if (viMatch) {
    month = parseInt(viMatch[1], 10);
  } else {
    let found = false;
    for (let i = 0; i < 12; i++) {
      if (periodLower.includes(enFullMonths[i]) || periodLower.includes(enMonths[i])) {
        month = i + 1;
        found = true;
        break;
      }
    }
    if (!found) {
      for (const trM of Object.keys(trMonthMap)) {
        if (periodLower.includes(trM)) {
          month = trMonthMap[trM];
          found = true;
          break;
        }
      }
    }
  }

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // 1-indexed (e.g. June = 6)

  if (year > currentYear) return true;
  if (year === currentYear && month > currentMonth) return true;
  return false;
}

interface Translation {
  // Header
  title: string;
  subtitle: string;
  downloadResume: string;
  sendEmail: string;

  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  findMeOn: string;

  // Sections
  education: string;
  workExperience: string;
  projectExperience: string;
  skills: string;
  languages: string;
  interests: string;

  // Education entries
  educationEntries: {
    title: string;
    institution: string;
    period: string;
    description: string;
  }[];

  // Work experience entries
  workEntries: {
    company: string;
    position: string;
    period: string;
    description: string;
  }[];

  // Project entries
  projectEntries: {
    company: string;
    position: string;
    description: string;
  }[];

  // Skills
  softwareSkills: string;
  codeSkills: string;

  skillsList: {
    name: string;
    percentage: number;
  }[];

  codeSkillsList: {
    name: string;
    percentage: number;
  }[];

  // Languages
  languagesList: {
    name: string;
    level: string;
    percentage: number;
    certificates?: {
      name: string;
      url: string;
    }[];
  }[];

  // Interests
  interestsList: {
    title: string;
    description: string;
    link?: string;
  }[];
}

const translations: Record<Language, Translation> = {
  en: {
    heroTitle: "Hi, I'm Kaan Can Calkan",
    heroSubtitle: "ERP Consultant & Business Analyst | SAP HR, ABAP & Fiori",
    heroDescription: "As a Management Information Systems graduate from Sakarya University, I have 3 years of experience in SAP HCM, ABAP, and Fiori. Alongside my expertise in SAP, I have a background in freelance web development and a proven track record in optimizing customer service operations through knowledge base creation and process improvement. I aim to leverage my technical background and analytical skills in roles such as Business Analyst, ERP Consultant, or Customer Experience Specialist.",
    downloadResume: "Download my resume",
    sendEmail: "Send me an email",
    findMeOn: "Connect With Me",
    education: "Education",
    workExperience: "Work Experience",
    projectExperience: "Project Experience",
    skills: "Skills",
    languages: "Languages",
    interests: "Interests",
    softwareSkills: "Software Skills",
    codeSkills: "Code Skills",
    educationEntries: [
      {
        title: "Management Information Systems",
        institution: "Sakarya University",
        period: "2017-2020",
        description: "GPA: 3.18/4",
      },
      {
        title: "Management Information Systems",
        institution: "Istanbul Medipol University",
        period: "2016-2017",
        description: "Transferred to Sakarya University.",
      },
      {
        title: "Social Sciences High School",
        institution: "Denizli Ibrahim Cinkaya Social Sciences High School",
        period: "2011-2016",
        description: "Completed one year of compulsory English preparatory education.",
      },
    ],
    workEntries: [
      {
        company: "Center of International English (CIE)",
        position: "English Teacher",
        period: "July 2026 - Now",
        description:
          "Teaching English using interactive, AI-powered tools in Lam Dong Province. Delivering engaging, technology-enhanced English lessons and utilizing advanced AI feedback tools to provide real-time, personalized guidance on students' writing, pronunciation, and grammar. Implementing innovative digital learning strategies that blend traditional ESL methodologies with modern EdTech to maximize student engagement and learning outcomes.",
      },
      {
        company: "Bulutfon Telecommunications",
        position: "Customer Relationship Specialist",
        period: "Sep 2025 - Dec 2025",
        description:
          "Provided customer support through ticketing systems and phone calls, resolving inquiries efficiently and professionally. Maintained and expanded the corporate knowledge base and FAQ pages to enhance customer self-service and reduce inbound support volume. Conducted SEO keyword research, backlink building, and competitor analysis to improve search engine rankings and organic performance.",
      },
      {
        company: "Smod Business Solutions",
        position: "SAP ABAP & Fiori Consultant",
        period: "Feb 2024 - July 2024",
        description:
          "Worked as a SAP ABAP and Fiori Consultant at SMOD, a specialized SAP HR service provider. Developed custom ABAP reports, user exits, and implemented Fiori applications to streamline human resources processes.",
      },
      {
        company: "Athena Information Services",
        position: "Oracle HR Cloud Technical Consultant",
        period: "Nov 2023 - Jan 2024",
        description:
          "Served as an Oracle HR Cloud Technical Consultant. Developed complex SQL queries and utilized Business Intelligence (BI) tools to generate comprehensive reports and dashboards for HR decision-making.",
      },
      {
        company: "Mbis Consulting",
        position: "SAP HCM Consultant",
        period: "Jan 2021 - July 2023",
        description:
          "Worked as a SAP HCM Consultant, configuring and adapting Human Capital Management modules to meet client business requirements. Provided post-implementation support and user training.",
      },
      {
        company: "Ömer Hazıroglu",
        position: "SAP Fiori Consultant",
        period: "Jan 2023 - July 2023",
        description:
          "Received hands-on SAP Fiori consultancy training under senior advisor Ömer Hazıroğlu. Designed and built UI screens for the Enerya project and actively participated in the integration of ABAP oData services.",
      },
      {
        company: "Seyit Usta Trailer",
        position: "Intern",
        period: "Feb 2020 - Apr 2020",
        description:
          "Conducted website translations and mobile responsiveness optimizations using WordPress. Assisted in manufacturing operations by performing time and motion studies on the factory floor.",
      },
      {
        company: "Freelance Web & Wordpress Developer",
        position: "Web Developer",
        period: "Apr 2019 - Jan 2021",
        description:
          "Began freelance web development using Wix and subsequently expanded into WordPress site customization. Designed and built responsive static landing pages utilizing HTML5, CSS3, and JavaScript.",
      },
    ],
    projectEntries: [
      {
        company: "Support Tickets",
        position: "SAP HCM ABAP & Fiori Consultant",
        description:
          "Developed front-end and back-end solutions for ISTAC, Sedef Shipyard, and THY projects, and resolved post-implementation client support requests.",
      },
      {
        company: "Lesaffre",
        position: "SAP HCM ABAP & Fiori Consultant",
        description:
          "Resolved front-end and back-end bugs, conducted process analysis through remote and on-site client meetings, and delivered comprehensive SAP HR training.",
      },
      {
        company: "Taha LC Waikiki",
        position: "SAP HCM Fiori Consultant",
        description:
          "Implemented the user interface for the Annual Leave Plan Application, developed approval screen flows, and completed SAP Fiori application deployments.",
      },
      {
        company: "Air Ties",
        position: "Oracle Technical Consultant",
        description:
          "Developed and optimized vacation and leave-related database queries for the Air Ties project.",
      },
      {
        company: "Kahve Dünyası",
        position: "Oracle Technical Consultant",
        description:
          "Served as the primary technical contact for the Kahve Dünyası project, coordinating client meetings and resolving system support tickets.",
      },
      {
        company: "Enerya",
        position: "Junior SAP Fiori Consultant",
        description:
          "Designed and built custom Fiori screens, developed the management panel, and bound oData services to interactive data tables with custom filter bars.",
      },
      {
        company: "TOGG Turkish national car",
        position: "Junior SAP HCM Consultant",
        description:
          "Executed test scenarios for the Travel Management Fiori interface and collaborated with ABAP and Fiori developers to resolve issues.",
      },
      {
        company: "Zen Diamond",
        position: "Junior SAP HCM Consultant",
        description:
          "Created LSMW templates for data migration, provided post-go-live support, drafted technical specification documents, and performed integration testing.",
      },
      {
        company: "Ozler Plastic",
        position: "Junior SAP HCM Consultant",
        description:
          "Conducted payroll testing, customized payroll journals, managed master data migration, and delivered on-site training sessions.",
      },
      {
        company: "ALY Food",
        position: "Junior SAP HCM Consultant",
        description:
          "Executed payroll tests, customized payslip layouts, adapted salary scales, and assisted clients with master data migration.",
      },
      {
        company: "Camsan Entegre",
        position: "SAP HCM Consultant",
        description:
          "Conducted payroll simulation tests, configured custom schemas, and delivered user training during on-site workshops.",
      },
      {
        company: "Istanbul Finance Center",
        position: "SAP HCM Consultant",
        description:
          "Configured custom workflows for the Travel Management module and performed user acceptance testing (UAT) on Fiori screens.",
      },
    ],
    skillsList: [
      { name: "SAP HCM", percentage: 75 },
      { name: "WordPress", percentage: 75 },
      { name: "Microsoft Office", percentage: 70 },
      { name: "Server Configurations", percentage: 60 },
      { name: "Adobe Products", percentage: 50 },
      { name: "Microsoft SQL Server", percentage: 50 },
      { name: "Git Bash and GUI", percentage: 50 },
      { name: "Jira", percentage: 50 },
    ],
    codeSkillsList: [
      { name: "HTML / XML", percentage: 75 },
      { name: "CSS", percentage: 75 },
      { name: "JavaScript", percentage: 65 },
      { name: "Fiori UI5", percentage: 60 },
      { name: "ABAP", percentage: 55 },
      { name: "Python for Data Science", percentage: 40 },
    ],
    languagesList: [
      { name: "Native Turkish", level: "Native", percentage: 100 },
      { 
        name: "English", 
        level: "Fluent", 
        percentage: 85,
        certificates: [
          {
            name: "Level 5 Diploma in Teaching English as a Foreign Language (TEFL) (Premier TEFL)",
            url: "/CanCalkan%20TEFL.pdf"
          },
          {
            name: "EFSET Certificate",
            url: "https://cert.efset.org/en/FtAZ7i"
          }
        ]
      },
      { 
        name: "Vietnamese", 
        level: "Starter", 
        percentage: 10,
        certificates: [
          {
            name: "Duolingo Score 30",
            url: "https://en.duolingo.com/profile/CanHocTiengViet"
          }
        ]
      },
    ],
    interestsList: [
      {
        title: "Movies",
        description:
          "Growing up with a father who loved cinema, I was captivated by movies at an early age. You can explore my watch history using the link below.",
        link: "https://trakt.tv/users/kaancalkan/history",
      },
      {
        title: "Weight Lifting",
        description:
          "After 24 years of a sedentary lifestyle, I took up weightlifting. It has since evolved into a core part of my daily routine. You can track my lifting stats via the link below.",
        link: "https://kaancancalkan.github.io/My-Weights/",
      },
      {
        title: "Books",
        description:
          "Reading became a cornerstone of my life during my time at Social Sciences High School. I enjoy books on sociology, philosophy, and history, with dystopia being my favorite genre. You can see my reading list at the link below.",
        link: "https://1000kitap.com/Never119",
      },
      {
        title: "Technological Devices",
        description:
          "I have been deeply fascinated by the software and hardware architecture of technological devices ever since I first laid hands on a computer.",
      },
    ],
    title: "Kaan Can Calkan",
    subtitle: "SAP HR, ABAP & Fiori Consultant",
  },

  tr: {
    heroTitle: "Merhaba, ben Kaan Can Calkan",
    heroSubtitle: "ERP Danışmanı & İş Analisti | SAP HR, ABAP & Fiori",
    heroDescription: "Sakarya Üniversitesi Yönetim Bilişim Sistemleri mezunuyum. 3 yıllık SAP HCM, ABAP ve Fiori deneyimime ek olarak, freelance web geliştirme projeleriyle teknik dikeyde yetkinlik kazandım. Müşteri hizmetleri süreçlerinde çözüm odaklı stratejiler geliştirerek bilgi tabanı ve süreç dökümantasyonu çalışmalarını yürüttüm. Teknik birikimimi iş süreçleriyle harmanlayarak; İş Analisti, ERP Danışmanı veya Müşteri Hizmetleri alanlarında değer katmayı hedefliyorum.",
    downloadResume: "Özgeçmişimi İndir",
    sendEmail: "E-posta Gönder",
    findMeOn: "Bana Ulaşın",
    education: "Eğitim",
    workExperience: "İş Deneyimi",
    projectExperience: "Proje Deneyimi",
    skills: "Yetenekler",
    languages: "Diller",
    interests: "İlgi Alanlarım",
    softwareSkills: "Yazılım Yetenekleri",
    codeSkills: "Kodlama Becerileri",
    educationEntries: [
      {
        title: "Yönetim Bilişim Sistemleri",
        institution: "Sakarya Üniversitesi",
        period: "2017-2020",
        description: "Genel Not Ortalaması: 3.18/4",
      },
      {
        title: "Yönetim Bilişim Sistemleri",
        institution: "İstanbul Medipol Üniversitesi",
        period: "2016-2017",
        description: "Sakarya Üniversitesi'ne yatay geçiş yaptım.",
      },
      {
        title: "Sosyal Bilimler Lisesi",
        institution: "Denizli İbrahim Cinkaya Sosyal Bilimler Lisesi",
        period: "2011-2016",
        description: "1 yıl zorunlu İngilizce hazırlık eğitimi aldım.",
      },
    ],
    workEntries: [
      {
        company: "Center of International English (CIE)",
        position: "İngilizce Öğretmeni",
        period: "Temmuz 2026 - Devam Ediyor",
        description:
          "Lam Dong eyaletinde yapay zeka destekli interaktif araçlarla İngilizce eğitimi veriyorum. Öğrencilerin yazma, telaffuz ve dil bilgi becerilerini geliştirmek amacıyla, son teknoloji yapay zeka tabanlı geribildirim araçlarını derslerime entegre ediyorum. Geleneksel ESL (İkinci Dil Olarak İngilizce) öğretim metotlarını ileri teknolojiyle harmanlayarak, öğrenci katılımını ve öğrenme çıktılarını en üst düzeye çıkaran yenilikçi dijital öğrenme stratejileri uyguluyorum. Eğitim teknolojilerini (EdTech) kullanarak dersleri daha verimli ve etkileşimli hale getiriyorum.",
      },
      {
        company: "Bulutfon Telekomünikasyon",
        position: "Müşteri İlişkileri Uzmanı",
        period: "Eylül 2025 - Aralık 2025",
        description:
          "Müşteri destek süreçlerinde çağrı ve talep (ticket) sistemleri üzerinden etkin ve çözüm odaklı hizmet verdim. Bilgi tabanı ve SSS (Sıkça Sorulan Sorular) sayfalarının hazırlanması ve güncellenmesi çalışmalarını yürüterek müşteri deneyimini iyileştirdim ve destek talebi yoğunluğunu azalttım. Ayrıca SEO çalışmaları kapsamında backlink yönetimi ve rakip analizleri gerçekleştirerek şirketin arama motoru görünürlüğünü ve SEO performansını artırdım.",
      },
      {
        company: "Smod İş Çözümleri",
        position: "SAP Abap Fiori Danışmanı",
        period: "Şubat 2024 - Temmuz 2024",
        description:
          "SAP HR alanında uzmanlaşmış SMOD bünyesinde SAP ABAP ve Fiori Danışmanı olarak görev yaptım. Müşteri ihtiyaçları doğrultusunda özel ABAP geliştirmeleri ve kullanıcı dostu Fiori ekran tasarımları gerçekleştirdim.",
      },
      {
        company: "Athena Information Services",
        position: "Oracle HR Cloud Teknik Danışmanı",
        period: "Kasım 2023 - Ocak 2024",
        description:
          "Oracle HR Cloud modülünde Teknik Danışman olarak görev aldım. Karmaşık veri modelleri üzerinde SQL sorguları yazarak iş zekası (BI) araçları ile yönetimsel ve operasyonel raporlar hazırladım.",
      },
      {
        company: "Mbis Danışmanlık",
        position: "SAP HCM Danışmanı",
        period: "Ocak 2021 - Temmuz 2023",
        description:
          "MBIS Danışmanlık bünyesinde SAP HCM (İnsan Kaynakları) modülü danışmanı olarak görev yaptım. Müşterilerin insan kaynakları süreçlerini SAP sistemine uyarlayarak teknik destek ve danışmanlık hizmetleri sağladım.",
      },
      {
        company: "Ömer Hazıroğlu",
        position: "SAP Fiori Danışmanı",
        period: "Ocak 2023 - Temmuz 2023",
        description:
          "Kıdemli danışman Ömer Hazıroğlu'nden SAP Fiori danışmanlığı üzerine uygulamalı eğitim aldım. Bu süreçte Enerya projesinde kullanıcı arayüzü tasarımlarını üstlendim ve arka planda çalışan ABAP oData servislerinin entegrasyon süreçlerinde yer aldım.",
      },
      {
        company: "Seyit Usta Treyler",
        position: "Stajyer",
        period: "Şubat 2020 - Nisan 2020",
        description:
          "WordPress tabanlı kurumsal web sitesinin çok dilli çevirilerini ve mobil arayüz optimizasyonları gerçekleştirdim. Ayrıca üretim tesisinde zaman etüdü çalışmaları yürüttüm.",
      },
      {
        company: "Freelance Web & Wordpress Geliştirici",
        position: "Web Geliştirici",
        period: "Nisan 2019 - Ocak 2021",
        description:
          "Web geliştirme kariyerime Wix projeleriyle başlayıp ardından WordPress platformunda uzmanlaşarak devam ettim. HTML, CSS ve JavaScript kullanarak modern ve duyarlı (responsive) statik web siteleri geliştirdim.",
      },
    ],
    projectEntries: [
      {
        company: "Destek Talepleri",
        position: "SAP HCM ABAP & Fiori Danışmanı",
        description:
          "İSTAÇ, Sedef Tersanesi ve THY projelerinde hem ön yüz (Fiori) hem de arka plan (ABAP) geliştirmeleri yaparak müşterilerin destek taleplerine çözümler sundum.",
      },
      {
        company: "Lesaffre",
        position: "SAP HCM ABAP & Fiori Danışmanı",
        description:
          "Arka plan ve ön yüz hatalarını gidererek sistem optimizasyonu sağladım. Müşterilerle çevrim içi ve yüz yüze toplantılar düzenleyerek iş süreçlerini analiz ettim ve anahtar kullanıcılara SAP HR eğitimleri verdim.",
      },
      {
        company: "Taha LC Waikiki",
        position: "SAP HCM Fiori Danışmanı",
        description:
          "Yıllık İzin Planlama uygulamasının kullanıcı arayüzünü (front-end) geliştirdim, onay mekanizması ekranlarını tasarladım ve SAP Fiori dağıtım süreçlerini tamamladım.",
      },
      {
        company: "Air Ties",
        position: "Oracle Teknik Danışmanı",
        description:
          "Proje kapsamında yıllık izin ve devir izinlerine yönelik veritabanı sorgularının geliştirilmesi ve optimize edilmesi süreçlerini yürüttüm.",
      },
      {
        company: "Kahve Dünyası",
        position: "Oracle Teknik Danışmanı",
        description:
          "Projenin teknik sorumlusu olarak müşteri toplantılarını koordine ettim, sistem sorunlarını analiz ederek destek taleplerini (ticket) sonuçlandırdım.",
      },
      {
        company: "Enerya",
        position: "Junior SAP Fiori Danışmanı",
        description:
          "Web terminali giriş paneli ve Fiori ekran tasarımlarını yaptım. SAP'den gelen verileri dinamik filtreleme (Filterbar) özellikleriyle tablolara entegre ettim.",
      },
      {
        company: "TOGG Türkiye'nin Yerli Otomobili",
        position: "Junior SAP HCM Danışmanı",
        description:
          "Seyahat Yönetim Sistemi'ne ait Fiori ekranlarının test senaryolarını yürüttüm, tespit edilen arayüz hatalarını ABAP ve Fiori geliştirici ekipleriyle koordineli şekilde giderdim.",
      },
      {
        company: "Zen Pırlanta",
        position: "Junior SAP HCM Danışmanı",
        description:
          "Veri aktarımı için LSMW şablonlarını hazırlayarak canlıya geçiş desteği sağladım. Ek geliştirme gereksinimleri için fonksiyonel spesifikasyon (spec) dokümanları hazırladım ve ABAP geliştirmelerini test ettim.",
      },
      {
        company: "Özler Plastik",
        position: "Junior SAP HCM Danışmanı",
        description:
          "Bordro simülasyonları ve 'Çarşaf İcmal' raporu uyarlamalarını gerçekleştirdim. Müşterilere ana veri aktarımı ve ABAP program testleri konusunda destek vererek yerinde kullanıcı eğitimleri düzenledim.",
      },
      {
        company: "Aksular Gıda",
        position: "Junior SAP HCM Danışmanı",
        description:
          "Bordro testlerini gerçekleştirdim. Bordro zarfı uyarlaması yaptım. Ücret uyarlamaları üzerine çalıştım. Ana veri aktarımında müşteriye destek verdim.",
      },
      {
        company: "Camsan Entegre",
        position: "SAP HCM Danışmanı",
        description:
          "Bordro testlerini ve sistemsel uyarlamaları gerçekleştirdim. Müşteri lokasyonunda anahtar kullanıcı eğitimleri verdim.",
      },
      {
        company: "İstanbul Finans Merkezi",
        position: "SAP HCM Danışmanı",
        description:
          "Seyahat ve Masraf Yönetimi Modülü uyarlamalarını gerçekleştirdim ve Fiori ekranlarının kullanıcı kabul testlerini (UAT) yönettim.",
      },
    ],
    skillsList: [
      { name: "SAP HCM", percentage: 75 },
      { name: "WordPress", percentage: 75 },
      { name: "Microsoft Office", percentage: 70 },
      { name: "Sunucu Konfigürasyonları", percentage: 60 },
      { name: "Adobe Ürünleri", percentage: 50 },
      { name: "Microsoft Sql Server", percentage: 50 },
      { name: "Git Bash ve GUI", percentage: 50 },
      { name: "Jira", percentage: 50 },
    ],
    codeSkillsList: [
      { name: "Html / XML", percentage: 75 },
      { name: "CSS", percentage: 75 },
      { name: "JavaScript", percentage: 65 },
      { name: "ABAP", percentage: 55 },
      { name: "Fiori UI5", percentage: 55 },
      { name: "Veri Bilimi İçin Python", percentage: 40 },
    ],
    languagesList: [
      { name: "Ana Dil Türkçe", level: "Ana Dil", percentage: 100 },
      { 
        name: "İngilizce", 
        level: "Akıcı", 
        percentage: 85,
        certificates: [
          {
            name: "Yabancı Dil Olarak İngilizce Öğretimi (TEFL) Seviye 5 Diploması (Premier TEFL)",
            url: "/CanCalkan%20TEFL.pdf"
          },
          {
            name: "EFSET Sertifikası",
            url: "https://cert.efset.org/en/FtAZ7i"
          }
        ]
      },
      { 
        name: "Vietnamca", 
        level: "Başlangıç", 
        percentage: 10,
        certificates: [
          {
            name: "Duolingo Puanı 30",
            url: "https://en.duolingo.com/profile/CanHocTiengViet"
          }
        ]
      },
    ],
    interestsList: [
      {
        title: "Filmler",
        description:
          "Sinema sever bir babanın oğlu olarak sinemanın büyüsüne erken yaşta kapıldım. İzlediğim filmleri aşağıdaki bağlantıdan inceleyebilirsiniz.",
        link: "https://trakt.tv/users/kaancalkan/history",
      },
      {
        title: "Ağırlık Kaldırma",
        description:
          "Hareketsiz geçen 24 yılın ardından ağırlık kaldırmaya başladım ve bunu zamanla bir yaşam tarzı haline getirdim. Ağırlık kaldırma gelişimimi aşağıdaki bağlantıdan takip edebilirsiniz.",
        link: "https://kaancancalkan.github.io/My-Weights/",
      },
      {
        title: "Kitaplar",
        description:
          "Okumak, özellikle Sosyal Bilimler Lisesine başladıktan sonra hayatımın vazgeçilmez bir parçası haline geldi. Sosyoloji, felsefe ve tarih kitapları okumayı çok seviyorum; en sevdiğim tür ise distopya. Okuduğum kitapları aşağıdaki bağlantıdan inceleyebilirsiniz.",
        link: "https://1000kitap.com/Never119",
      },
      {
        title: "Teknolojik Cihazlar",
        description:
          "Bilgisayarla ilk tanıştığım günden beri teknolojik cihazların yazılım ve donanım mimarilerine büyük ilgi duyuyorum.",
      },
    ],
    title: "Kaan Can Calkan",
    subtitle: "SAP HR, ABAP & Fiori Consultant",
  },
  vi: {
    heroTitle: "Xin chào, tôi là Kaan Can Calkan",
    heroSubtitle:
      "Chuyên gia tư vấn ERP và Chuyên viên phân tích nghiệp vụ - SAP HR & Abap & Fiori",
    heroDescription:
      "Tôi tốt nghiệp ngành Hệ thống thông tin quản lý (MIS) tại Đại học Sakarya. Bên cạnh 3 năm kinh nghiệm làm việc với SAP HCM, ABAP và Fiori, tôi đã nâng cao năng lực kỹ thuật chuyên sâu thông qua các dự án phát triển web tự do (freelance). Tôi có kinh nghiệm trong việc phát triển các chiến lược tập trung vào giải pháp cho quy trình dịch vụ khách hàng, đồng thời thực hiện các nghiên cứu về cơ sở dữ liệu tri thức và tài liệu hóa quy trình. Bằng cách kết hợp kiến thức kỹ thuật với các quy trình kinh doanh, tôi đặt mục tiêu đóng góp giá trị trong các lĩnh vực như Phân tích nghiệp vụ (Business Analyst), Tư vấn ERP hoặc Dịch vụ khách hàng.",
    downloadResume: "Tải CV của tôi",
    sendEmail: "Gửi email cho tôi",
    findMeOn: "Tìm tôi trên",
    education: "Học vấn",
    workExperience: "Kinh nghiệm làm việc",
    projectExperience: "Kinh nghiệm dự án",
    skills: "Kỹ năng",
    languages: "Ngôn ngữ",
    interests: "Sở thích",
    softwareSkills: "Kỹ năng phần mềm",
    codeSkills: "Kỹ năng lập trình",
    educationEntries: [
      {
        title: "Hệ thống Thông tin Quản lý",
        institution: "Đại học Sakarya (2017-2020) Đã tốt nghiệp",
        period: "2017-2020",
        description: "GPA của tôi là 3.18/4.",
      },
      {
        title: "Hệ thống Thông tin Quản lý",
        institution: "Đại học Istanbul Medipol (2016-2017)",
        period: "2016-2017",
        description: "Tôi đã chuyển trường đến Đại học Sakarya.",
      },
      {
        title: "Trường Trung học Khoa học Xã hội",
        institution:
          "Trường Trung học Khoa học Xã hội Denizli Ibrahim Cinkaya (2011-2016) Tốt nghiệp tháng 6 năm 2016",
        period: "2011-2016",
        description:
          "Tôi đã nhận được khóa đào tạo tiếng Anh bắt buộc trong 1 năm.",
      },
    ],
    workEntries: [
      {
        company: "Center of International English (CIE)",
        position: "Giáo viên Tiếng Anh",
        period: "Tháng 7 năm 2026 - Hiện tại",
        description:
          "Giảng dạy tiếng Anh với các Chú thích được Hỗ trợ bởi Trí tuệ Nhân tạo Tương tác tại Tỉnh Lâm Đông. Cung cấp các bài học tiếng Anh hấp dẫn, được hỗ trợ bởi công nghệ, sử dụng các công cụ chú thích AI tiên tiến để cung cấp phản hồi theo thời gian thực, được cá nhân hóa về viết lách, phát âm và ngữ pháp của học sinh. Triển khai các chiến lược học tập kỹ thuật số sáng tạo kết hợp liền mạch các phương pháp giáo dục tiếng Anh truyền thống với công nghệ AI tiên tiến để tối đa hóa sự tham gia, hiểu biết và kết quả học tập của học sinh. Tạo dựng các môi trường lớp học tương tác tận dụng EdTech để tạo ra các trải nghiệm giáo dục biến đổi.",
      },
      {
        company: "Bulutfon Telecommunications",
        position: "Chuyên viên Quan hệ Khách hàng",
        period: "Tháng 9 năm 2025 – Tháng 12 năm 2025",
        description:
          "Tôi đã hỗ trợ khách hàng thông qua hệ thống xử lý yêu cầu và các cuộc gọi, giải quyết vấn đề một cách hiệu quả và chuyên nghiệp. Tôi cũng đã đóng góp vào việc xây dựng và duy trì cơ sở kiến thức cùng trang Câu hỏi thường gặp (FAQ), giúp khách hàng tự phục vụ tốt hơn và giảm tải cho bộ phận hỗ trợ. Tôi đã thực hiện các công việc backlink cần thiết trong lĩnh vực SEO, phân tích các công ty đối thủ và cải thiện hiệu suất SEO của công ty chúng tôi.",
      },
      {
        company: "Smod Business Solutions",
        position:
          "Chuyên viên tư vấn SAP Abap Fiori",
        period: "Tháng 2 2024 - Tháng 7 2024",
        description:
          "Tôi đã làm việc với tư cách là Chuyên viên tư vấn Sap Abap và Fiori tại SMOD Business Solutions (Nhà cung cấp dịch vụ Sap HR).",
      },
      {
        company: "Athena Information Services",
        position:
          "Chuyên viên tư vấn Kỹ thuật Oracle HR Cloud",
        period: "Tháng 11 2023 - Tháng 1 2024",
        description:
          "Tôi đã làm việc với tư cách là Chuyên viên tư vấn Kỹ thuật Oracle HR Cloud tại Athena Information Services. Tôi đã viết các truy vấn SQL và sử dụng các công cụ BI.",
      },
      {
        company: "Mbis Consulting",
        position: "Chuyên viên tư vấn Sap HCM",
        period: "Tháng 1 2021 - Tháng 7 2023",
        description:
          "Tôi đã làm việc trên mô-đun Sap HCM tại Dịch vụ Tư vấn Mbis.",
      },
      {
        company: "Ömer Hazıroglu",
        position: "Chuyên viên tư vấn Sap Fiori",
        period: "Tháng 1 2023 - Tháng 7 2023",
        description:
          "Tôi đã nhận được đào tạo tư vấn Fiori từ Ömer Hazıroğlu. Trong quá trình này, tôi đã thực hiện các thiết kế màn hình trong dự án Enerya. Đồng thời, tôi đã quan sát quá trình viết các dịch vụ Abap",
      },
      {
        company: "Seyit Usta Trailer",
        position: "Thực tập sinh",
        period: "Tháng 2 2020 - Tháng 4 2020",
        description:
          "Tôi đã làm việc về dịch thuật trang web và tối ưu hóa giao diện di động trên WordPress. Tôi cũng đã thực hiện một số nghiên cứu thời gian bên trong nhà máy. Kỳ thực tập của tôi đã kết thúc sau khi Covid-19 xảy ra.",
      },
      {
        company: "Nhà phát triển Web & Wordpress Tự do",
        position: "Web Developer",
        period: "Tháng 4 2019 - Tháng 1 2021",
        description:
          "Tôi bắt đầu sự nghiệp web với Wix và tiếp tục với wordpress, mà tôi đã học trong thời gian thực tập. Tôi cũng đã thiết kế các trang web tĩnh với HTML CSS và JS.",
      },
    ],
    projectEntries: [
      {
        company: "Vé hỗ trợ",
        position: "Chuyên viên tư vấn Sap HCM Abap & Fiori",
        description:
          "Tôi đã thực hiện phát triển Front end và Backend tại Istac, Sedef Ship, THY. Tôi đã giải quyết các yêu cầu hỗ trợ từ khách hàng.",
      },
      {
        company: "Lesaffre",
        position: "Chuyên viên tư vấn Sap HCM Abap & Fiori",
        description:
          "Tôi đã giải quyết các lỗi back-end và front-end, thực hiện một số cải tiến trong Front-end và Back-end. Tôi đã tổ chức các cuộc họp địa phương và ảo với khách hàng để phân tích quy trình và nhu cầu kinh doanh của họ và cung cấp đào tạo SAP HR cho họ.",
      },
      {
        company: "Taha LC Waikiki",
        position: "Chuyên viên tư vấn Sap HCM Fiori",
        description:
          "Tôi đã triển khai phía Front End của Ứng dụng Kế hoạch Nghỉ phép Hàng năm. Đã sửa một số lỗi Backend. Đã thêm Trang Phê duyệt và Hoàn thành Cấu hình Phát triển Sap Fiori.",
      },
      {
        company: "Air Ties",
        position: "Chuyên viên tư vấn Kỹ thuật Oracle",
        description:
          "Tôi đã làm việc về các truy vấn kỳ nghỉ trong dự án Air Ties.",
      },
      {
        company: "Kahve Dünyası",
        position: "Chuyên viên tư vấn Kỹ thuật Oracle",
        description:
          "Với tư cách là người chịu trách nhiệm kỹ thuật cho Dự án Kahve Dünyası, tôi đã tham gia các cuộc họp trực tuyến và địa phương. Tôi đã giải quyết các vấn đề về vé và hỗ trợ khách hàng.",
      },
      {
        company: "Enerya",
        position: "Chuyên viên tư vấn Sap Fiori Cấp độ Junior",
        description:
          "Tôi đã lập trình Bảng điều khiển Trang web. Tôi đã Thiết kế Màn hình Fiori. Tôi đã liên kết oData với các bảng với filterbar.",
      },
      {
        company: "TOGG xe quốc gia Thổ Nhĩ Kỳ",
        position: "Chuyên viên tư vấn Sap HCM Cấp độ Junior",
        description:
          "Tôi đã kiểm tra các màn hình fiori của hệ thống quản lý du lịch trong dự án. Tôi đã giải quyết các lỗi mà tôi tìm thấy với các Nhà phát triển Abap và Fiori.",
      },
      {
        company: "Zen Diamond",
        position: "Chuyên viên tư vấn Sap HCM Cấp độ Junior",
        description:
          "Tôi đã chuẩn bị các mẫu LSMW cho khách hàng sử dụng. Đã cung cấp hỗ trợ di chuyển hệ thống sau khi đi vào hoạt động cho khách hàng. Tôi đã viết Specs cho các phát triển bổ sung. Đã kiểm tra các cải tiến Abap và sửa các lỗi cùng với cố vấn kỹ thuật.",
      },
      {
        company: "Ozler Plastic",
        position: "Chuyên viên tư vấn Sap HCM Cấp độ Junior",
        description:
          "Tôi đã thực hiện các bài kiểm tra bảng lương. Tôi đã thực hiện việc điều chỉnh carsaf icmal. Tôi đã phục vụ khách hàng về việc chuyển giao dữ liệu chính. Tôi đã kiểm tra các Chương trình Abap và sửa lỗi với các Nhà phát triển Abap. Tôi đã đào tạo Sap HCM cho khách hàng với các cuộc họp địa phương. Tôi đã thực hiện tùy chỉnh trên Sap HCM",
      },
      {
        company: "ALY Food",
        position: "Chuyên viên tư vấn Sap HCM Cấp độ Junior",
        description:
          "Tôi đã thực hiện các bài kiểm tra bảng lương. Tôi đã thực hiện việc điều chỉnh phong bì bảng lương. Tôi đã làm việc về các điều chỉnh lương. Tôi đã hỗ trợ khách hàng trong việc chuyển giao dữ liệu chính.",
      },
      {
        company: "Camsan Entegre",
        position: "Chuyên viên tư vấn Sap HCM",
        description:
          "Tôi đã thực hiện các bài kiểm tra bảng lương. Tôi đã đào tạo Sap HCM cho khách hàng với các cuộc họp địa phương. Tôi đã thực hiện tùy chỉnh.",
      },
      {
        company: "Trung tâm Tài chính Istanbul",
        position: "Chuyên viên tư vấn Sap HCM",
        description:
          "Tôi đã thực hiện tùy chỉnh trên Mô-đun Quản lý Du lịch. Tôi đã kiểm tra Màn hình Fiori",
      },
    ],
    skillsList: [
      { name: "SAP HCM", percentage: 75 },
      { name: "WordPress", percentage: 75 },
      { name: "Microsoft Office", percentage: 70 },
      { name: "Cấu hình Máy chủ", percentage: 60 },
      { name: "Sản phẩm Adobe", percentage: 50 },
      { name: "Microsoft Sql Server", percentage: 50 },
      { name: "Git Bash và GUI", percentage: 50 },
      { name: "Jira", percentage: 50 },
    ],
    codeSkillsList: [
      { name: "Html / XML", percentage: 75 },
      { name: "CSS", percentage: 75 },
      { name: "JavaScript", percentage: 65 },
      { name: "ABAP", percentage: 55 },
      { name: "Fiori UI5", percentage: 55 },
      { name: "Python cho Khoa học Dữ liệu", percentage: 40 },
    ],
    languagesList: [
      { name: "Tiếng Thổ Nhĩ Kỳ ", level: "Bản ngữ", percentage: 100 },
      { 
        name: "Tiếng Anh", 
        level: "Thành thạo", 
        percentage: 85,
        certificates: [
          {
            name: "Chứng chỉ Giảng dạy Tiếng Anh như Ngoại ngữ (TEFL) Cấp độ 5 (Premier TEFL)",
            url: "/CanCalkan%20TEFL.pdf"
          },
          {
            name: "Chứng chỉ EFSET",
            url: "https://cert.efset.org/en/FtAZ7i"
          }
        ]
      },
      { 
        name: "Tiếng Việt", 
        level: "Mới bắt đầu", 
        percentage: 10,
        certificates: [
          {
            name: "Duolingo Điểm 30",
            url: "https://en.duolingo.com/profile/CanHocTiengViet"
          }
        ]
      },
    ],
    interestsList: [
      {
        title: "Phim ảnh",
        description:
          "Là con của một người cha yêu điện ảnh, tôi đã bị mê hoặc bởi điện ảnh từ khi còn nhỏ. Bạn có thể xem những bộ phim tôi đã xem từ liên kết bên dưới.",
        link: "https://trakt.tv/users/kaancalkan/history",
      },
      {
        title: "Cử tạ",
        description:
          "Sau 24 năm sống khép mình, tôi đã đến phòng gym và bắt đầu tập thể hình. Tôi đã biến nó thành lối sống lành mạnh của mình. Bạn có thể xem các số liệu thống kê cử tạ của tôi từ liên kết bên dưới.",
        link: "https://kaancancalkan.github.io/My-Weights/",
      },
      {
        title: "Sách",
        description:
          "Đọc sách đã trở thành một phần của cuộc sống tôi, đặc biệt là sau khi tôi bắt đầu học Trường Trung học Khoa học Xã hội. Tôi thích đọc sách về xã hội học, triết học và lịch sử. Thể loại yêu thích của tôi là dystopia. Nếu bạn muốn xem những cuốn sách tôi đã đọc, bạn có thể kiểm tra liên kết bên dưới.",
        link: "https://1000kitap.com/Never119",
      },
      {
        title: "Thiết bị công nghệ",
        description:
          "Tôi đã có sự quan tâm lớn đến phần mềm và phần cứng của các thiết bị công nghệ kể từ lần đầu tiên tôi được tiếp xúc với máy tính.",
      },
    ],
    title: "Kaan Can Calkan",
    subtitle: "Chuyên viên tư vấn SAP HR & ABAP & Fiori",
  },
};

const languageNames: Record<Language, string> = {
  en: "English",
  tr: "Türkçe",
  vi: "Tiếng Việt",
};

const languageFlags: Record<Language, string> = {
  en: "./flags/us.png",
  tr: "./flags/tr.png",
  vi: "./flags/vn.png",
};

const SkillBar = ({
  name,
  percentage,
}: {
  name: string;
  percentage: number;
}) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-foreground">{name}</span>
      <span className="text-sm text-muted-foreground">{percentage}%</span>
    </div>
    <div className="w-full bg-secondary rounded-full h-2">
      <div
        className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

// Portfolio Gallery Data (multi-language)
const portfolioGallery = [
  {
    title: {
      en: "Rock Paper Scissors",
      tr: "Taş Kağıt Makas",
      vi: "Đá Giấy Kéo",
    },
    category: "webapp",
    image: "/rockpaperscissors.png",
    description: {
      en: "Interactive Rock Paper Scissors game where you play against the computer with score tracking.",
      tr: "Bilgisayara karşı oynayabileceğiniz, puan takibi olan etkileşimli Taş Kağıt Makas oyunu.",
      vi: "Trò chơi Đá Giấy Kéo tương tác nơi bạn chơi với máy tính có theo dõi điểm số.",
    },
    link: "https://kaancancalkanrockpaperscissors.netlify.app/",
  },
  {
    title: {
      en: "Currency Converter",
      tr: "Döviz Dönüştürücü",
      vi: "Trình Chuyển Đổi Tiền Tệ",
    },
    category: "webapp",
    image: "/currencyconventer.png",
    description: {
      en: "Live currency converter with real-time exchange rates for multiple currencies.",
      tr: "Birden fazla para birimi için gerçek zamanlı döviz kurları ile canlı döviz dönüştürücü.",
      vi: "Trình chuyển đổi tiền tệ trực tiếp với tỷ giá hối đoái thực tế cho nhiều loại tiền tệ.",
    },
    link: "https://currencyconventer.netlify.app/",
  },
  {
    title: {
      en: "Bagci Perde",
      tr: "Bagcı Perde",
      vi: "Bagci Perde",
    },
    category: "website",
    image: "/bagciperde.jpg",
    description: {
      en: "Modern curtain shop website for Bagcı Perde.",
      tr: "Bagcı Perde için modern perde mağazası web sitesi.",
      vi: "Website cửa hàng rèm hiện đại cho Bagcı Perde.",
    },
    link: "https://bagciperde.netlify.app/",
  },
    {
    title: {
      en: "Techno Store",
      tr: "Techno Store",
      vi: "Techno Store",
    },
    category: "website",
    image: "/technostore.png",
    description: {
      en: "Modern e-commerce website demo.",
      tr: "Modern e-ticaret web sitesi demosu.",
      vi: " Website cửa hàng bán hàng hình thực mẫu.",
    },
    link: "https://kaancancalkantechnostore.netlify.app/",
  },
  
  {
    title: {
      en: "Hades",
      tr: "Hades",
      vi: "Hades",
    },
    category: "website",
    image: "/hades-heroai.jpg",
    description: {
      en: "Website showcasing the photo gallery of a cute cat named Hades.",
      tr: "Hades isimli sevimli bir kedinin fotoğraf galerisini barındıran web sitesi.",
      vi: "Trang giới thiệu cho dự án sáng tạo Hades.",
    },
    link: "https://hadess.netlify.app/",
  },
  {
    title: {
      en: "Vietnam Chronicle",
      tr: "Vietnam Kroniği",
      vi: "Biên niên sử Việt Nam",
    },
    category: "website",
    image: "/ho-chi-minh-portrait.png",
    description: {
      en: "Interactive website introducing Vietnamese culture and traditions.",
      tr: "Vietnam kültürünü ve geleneklerini tanıtan etkileşimli web sitesi.",
      vi: "Trang giới thiệu cho dự án sáng tạo Hades.",
    },
    link: "https://vietnamculture.netlify.app/",
  },
  {
    title: {
      en: "VietCulture Quiz",
      tr: "VietCulture Quiz",
      vi: "VietCulture Quiz",
    },
    category: "webapp",
    image: "/vietquiz.jpg",
    description: {
      en: "Quiz app about Vietnamese culture.",
      tr: "Vietnam kültürü hakkında quiz uygulaması.",
      vi: "Ứng dụng quiz về văn hóa Việt Nam.",
    },
    link: "https://vietculturequizkaancancalkan.netlify.app/",
  },
  {
    title: {
      en: "VietTeach",
      tr: "VietTeach",
      vi: "VietTeach",
    },
    category: "education",
    image: "/canhoctiengviet.png",
    description: {
      en: "Flashcard-based Vietnamese vocabulary learning platform showcasing my own language learning journey.",
      tr: "Kendi Vietnamca öğrenme yolculuğumu destekleyen, flashcard tabanlı bir kelime öğrenme platformu.",
      vi: "Nền tảng học từ tiếng Việt dựa trên thẻ flash và hành trình học tiếng Việt của riêng tôi.",
    },
    link: "https://kaancancalkanhoctiengviet.netlify.app/",
  },
    {
    title: {
      en: "CosmoCode",
      tr: "CosmoCode",
      vi: "CosmoCode",
    },
    category: "education",
    image: "/Cosmocode.png",
    description: {
      en: "Space-themed Python learning platform.",
      tr: "Uzay yolculuğu temalı Python öğrenme platformu.",
      vi: "Nền tảng học Python theo chủ đề du hành vũ trụ.",
    },
    link: "https://cosmocodekaancancalkan.netlify.app/",
  },
  {
    title: {
      en: "LearnEnglishWithCat",
      tr: "LearnEnglishWithCat",
      vi: "LearnEnglishWithCat",
    },
    category: "education",
    image: "/learnenglishwithcat.png",
    description: {
      en: "Cat-themed English learning platform for young children.",
      tr: "Küçük çocuklar için kedi temalı İngilizce öğrenme platformu.",
      vi: "Nền tảng học tiếng Anh theo chủ đề mèo dành cho trẻ nhỏ.",
    },
    link: "https://learnenglishwithcat.netlify.app/",
  },
  {
    title: {
      en: "Fishy English",
      tr: "Fishy English",
      vi: "Fishy English",
    },
    category: "education",
    image: "/grammarfishing.png",
    description: {
      en: "Grammar Fishing is an interactive, bilingual (TR/VN) web game where players practice English tenses by catching fish through grammar questions.",
      tr: "Grammar Fishing, oyuncuların dilbilgisi soruları aracılığıyla balık tutarak İngilizce zamanları pratik yapabilecekleri etkileşimli, çift dilli (TR/VN) bir web oyunudur.",
      vi: "Grammar Fishing là một trò chơi web tương tác, song ngữ (TR/VN) nơi người chơi luyện tập các thì tiếng Anh bằng cách bắt cá thông qua các câu hỏi ngữ pháp.",},
    link: "https://englishwithfishing.netlify.app/",
  },
  {
    title: {
      en: "English Chef",
      tr: "English Chef",
      vi: "English Chef",
    },
    category: "education",
    image: "/englishchef.png",
    description: {
      en: "Chef Lin's Pho Academy is a playful English grammar game for children, using cooking-themed lessons and fun mini-challenges to teach grammar naturally.",
      tr: "Chef Lin's Pho Academy, çocuklara yemek temalı dersler ve eğlenceli mini görevlerle İngilizce dil bilgisini doğal bir şekilde öğretmeyi amaçlayan bir oyundur.",
      vi: "Chef Lin's Pho Academy là trò chơi ngữ pháp tiếng Anh dành cho trẻ em, sử dụng các bài học theo chủ đề nấu ăn và thử thách nhỏ thú vị để dạy ngữ pháp một cách tự nhiên.",
    },
    link: "https://englishchef.netlify.app/",
  },
  {
    title: {
      en: "English Penalty",
      tr: "English Penalty",
      vi: "English Penalty",
    },
    category: "education",
    image:"/English Penalty.png",
  description: {
      en: "Interactive game-based platform to learn English by solving grammar questions and taking penalty shots.",
      tr: "İngilizce dil bilgisi sorularını çözerek penaltı atışları yapılan oyun tabanlı İngilizce öğrenme platformu.",
      vi: "Nền tảng học tiếng Anh bằng cách bắt cá thông qua các câu hỏi ngữ pháp.",},
    link: "https://englishpenalty.netlify.app/",
  },
  {
    title: {
      en: "English Basketball",
      tr: "English Basketball",
      vi: "English Basketball",
    },
    category: "education",
    image:"/basketballenglish.png",
  description: {
      en: "Interactive game-based platform to learn English by solving grammar questions and playing basketball.",
      tr: "Dil bilgisisi sorularını çözerek basketbol oynanan eğlenceli ve etkileşimli İngilizce öğrenme platformu.",
      vi: "Nền tảng học tiếng Anh bằng cách bắt cá thông qua các câu hỏi ngữ pháp.",},
    link: "https://basketballenglish.netlify.app/",
  },
  {
    title: {
      en: "AI Teacher",
      tr: "AI Teacher",
      vi: "AI Teacher",
    },
    category: "education",
    image: "/aiteacher.png",
    description: {
      en: "Interactive AI-powered educational platform designed to teach AI and machine learning concepts through engaging mini-games.",
      tr: "Yapay zeka ve makine öğrenimi kavramlarını eğlenceli mini oyunlarla öğreten yapay zeka destekli etkileşimli eğitim platformu.",
      vi: "Nền tảng giáo dục tương tác hỗ trợ bởi AI, giúp học sinh tìm hiểu các khái niệm trí tuệ nhân tạo và học máy qua các trò chơi nhỏ thú vị.",
    },
    link: "https://aiteacherr.netlify.app/",
  },
  {
    title: {
      en: "AI CV",
      tr: "AI CV",
      vi: "AI CV",
    },
    category: "webapp",
    image: "/aicv.jpg",
    description: {
      en: "AI-powered resume builder allowing users to generate professional CVs with manual customization.",
      tr: "Yapay zeka destekli ve manuel özelleştirme imkanı sunan, kolay özgeçmiş oluşturma platformu.",
      vi: "Một nền tảng cho phép tạo CV dễ dàng bằng AI và khả năng chỉnh sửa thủ công.",
    },
    link: "https://aicvkaancancalkan.netlify.app/",
  },


  
];



// Filter translations
const filterLabels = {
  en: { all: "All", webapp: "Web Apps", website: "Websites", education: "Education", view: "View", github: "GitHub" },
  tr: { all: "Tümü", webapp: "Web Uygulamaları", website: "Web Siteleri", education: "Eğitim", view: "Görüntüle", github: "GitHub" },
  vi: { all: "Tất cả", webapp: "Ứng dụng Web", website: "Website", education: "Giáo dục", view: "Xem", github: "GitHub" },
};

// PortfolioGallery component içinde:
function PortfolioGallery({ lang }: { lang: Language }) {
  const [filter, setFilter] = useState<"all" | "webapp" | "website" | "education">("all");
  const labels = filterLabels[lang];

  const filtered = filter === "all"
    ? portfolioGallery
    : portfolioGallery.filter((p) => p.category === filter);

  return (
    <section className="py-16 px-4 bg-muted/10">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-2 text-center">
          {lang === "en" && "My  Web Projects"}
          {lang === "tr" && " Web Projelerim"}
          {lang === "vi" && "Dự Án Web Của Tôi"}
        </h2>
        {/* <p className="text-center mb-8 text-muted-foreground">
          {lang === "en" && "Some of my recent works"}
          {lang === "tr" && "Son çalışmalarım"}
          {lang === "vi" && "Một số dự án gần đây"}
        </p> */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {(["all", "webapp", "website", "education"] as const).map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition
                ${
                  filter === cat
                    ? "bg-neutral-900 text-white border-primary"
                    : "bg-background border-muted text-foreground hover:bg-muted"
                }
                ${filter === cat ? "shadow" : ""}
              `}
              onClick={() => setFilter(cat)}
              type="button"
            >
              {labels[cat]}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((proj, idx) => (
            <div
              key={idx}
              className="relative group rounded-xl overflow-hidden shadow-lg bg-background transition-transform"
              tabIndex={0}
            >
              <div className="aspect-[4/2.5] overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title[lang]}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black/90 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 px-4 text-center">
                <h3 className="text-lg font-semibold text-white mb-2">{proj.title[lang]}</h3>
                <p className="text-white text-sm mb-4">{proj.description[lang]}</p>
                <div className="flex gap-2 justify-center">
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-full bg-white text-primary font-semibold text-sm shadow hover:bg-primary hover:text-white transition"
                    style={{ color: "#222" }}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    {labels.view}
                  </a>
                  {/* {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-full bg-white text-primary font-semibold text-sm shadow hover:bg-primary hover:text-white transition"
                    >
                      <Github className="h-4 w-4 mr-1" />
                      {labels.github}
                    </a>
                  )} */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [currentLang, setCurrentLang] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = translations[currentLang];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSendEmail = () => {
    window.location.href = "mailto:cancalkaniletisim@gmail.com";
  };

  const handleDownloadResume = () => {
    // Choose file based on currentLang
    const file =
      currentLang === "tr"
        ? "./Kaan-Can-Calkan-CV-BA-TR.pdf"
        : "./Kaan-Can-Calkan-CV-BA-EN.pdf";
    const link = document.createElement("a");
    link.href = file; // public klasöründeki dosya
    link.download = file.split("/").pop() || "resume.pdf"; // fallback ile  document.body.appendChild(link); // bazı tarayıcılarda gerekli
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">{t.title}</h1>
              <p className="text-sm text-muted-foreground">{t.subtitle}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="bg-transparent"
              >
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>

              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent"
                  >
                    <Globe className="h-4 w-4" />
                    <Image
                      src={languageFlags[currentLang] || "/placeholder.svg"}
                      alt={`${languageNames[currentLang]} flag`}
                      width={20}
                      height={15}
                      className="rounded-sm"
                    />
                    {languageNames[currentLang]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {(Object.keys(languageNames) as Language[]).map((lang) => (
                    <DropdownMenuItem
                      key={lang}
                      onClick={() => setCurrentLang(lang)}
                      className={currentLang === lang ? "bg-accent" : ""}
                    >
                      <Image
                        src={languageFlags[lang] || "/placeholder.svg"}
                        alt={`${languageNames[lang]} flag`}
                        width={20}
                        height={15}
                        className="rounded-sm mr-2"
                      />
                      {languageNames[lang]}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/20">
              <img
                src="./kaan-profile-photo.jpeg"
                alt="Kaan Can Calkan"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t.heroTitle}
            </h1>
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">
              {t.heroSubtitle}
            </h2>
            <p className="text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
              {t.heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="gap-2"
                onClick={handleDownloadResume}
              >
                <Download className="h-4 w-4" />
                {t.downloadResume}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 bg-transparent"
                onClick={handleSendEmail}
              >
                <Mail className="h-4 w-4" />
                {t.sendEmail}
              </Button>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">{t.findMeOn}</h3>
              <div className="flex justify-center gap-4 flex-wrap">
                <a
                  href="https://www.linkedin.com/in/kaancancalkan/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-black hover:bg-gray-800 text-white border-black dark:bg-blue-600 dark:hover:bg-blue-700 dark:border-blue-600"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Button>
                </a>
                <a
                  href="https://github.com/kaancancalkan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-black hover:bg-gray-800 text-white border-black dark:bg-blue-600 dark:hover:bg-blue-700 dark:border-blue-600"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </Button>
                </a>
                <a
                  href="https://kaancancalkan.medium.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-black hover:bg-gray-800 text-white border-black dark:bg-blue-600 dark:hover:bg-blue-700 dark:border-blue-600"
                  >
                    <Pencil className="h-4 w-4" />
                    Medium
                  </Button>
                </a>
                <a
                  href="https://kaancancalkan.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-black hover:bg-gray-800 text-white border-black dark:bg-blue-600 dark:hover:bg-blue-700 dark:border-blue-600"
                  >
                    <Globe className="h-4 w-4" />
                    WordPress
                  </Button>
                </a>
                <a href="mailto:cancalkaniletisim@gmail.com">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-black hover:bg-gray-800 text-white border-black dark:bg-blue-600 dark:hover:bg-blue-700 dark:border-blue-600"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">{t.education}</h2>
          <div className="space-y-6">
            {t.educationEntries.map((edu, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-semibold">{edu.title}</h3>
                    <Badge variant="secondary">{edu.period}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    {edu.institution}
                  </p>
                  <p className="text-sm">{edu.description}</p>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t.workExperience}
          </h2>
          <div className="space-y-6">
            {t.workEntries
              .filter((work) => !isPeriodInFuture(work.period))
              .map((work, index) => (
                <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">{work.position}</h3>
                      <p className="text-lg text-primary">{work.company}</p>
                    </div>
                    <Badge variant="outline">{work.period}</Badge>
                  </div>
                  <p className="text-sm mt-3">{work.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Experience Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t.projectExperience}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.projectEntries.map((project, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    {project.company}
                  </h3>
                  <Badge variant="secondary" className="mb-3">
                    {project.position}
                  </Badge>
                  <p className="text-sm">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Gallery Section */}
      <PortfolioGallery lang={currentLang} />

      {/* Skills Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">{t.skills}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">
                  {t.softwareSkills}
                </h3>
                {t.skillsList.map((skill, index) => (
                  <SkillBar
                    key={index}
                    name={skill.name}
                    percentage={skill.percentage}
                  />
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">{t.codeSkills}</h3>
                {t.codeSkillsList.map((skill, index) => (
                  <SkillBar
                    key={index}
                    name={skill.name}
                    percentage={skill.percentage}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">{t.languages}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {t.languagesList.map((lang, index) => (
              <Card key={index} className="flex flex-col">
                <CardContent className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold">{lang.name}</h3>
                      <Badge>{lang.level}</Badge>
                    </div>
                    <SkillBar name="" percentage={lang.percentage} />
                  </div>
                  {lang.certificates && lang.certificates.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border space-y-2">
                      {lang.certificates.map((cert, certIndex) => (
                        <a 
                          key={certIndex}
                          href={cert.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-foreground hover:opacity-80 hover:underline transition-all flex items-start gap-2"
                        >
                          <FileText className="h-4 w-4 shrink-0 mt-0.5" />
                          <span>{cert.name}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">{t.interests}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {t.interestsList.map((interest, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">
                    {interest.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {interest.description}
                  </p>
                  {interest.link && (
                    <a
                      href={interest.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="default" size="sm" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        {currentLang === "en" && "View More"}
                        {currentLang === "tr" && "Daha Fazla"}
                        {currentLang === "vi" && "Xem thêm"}
                      </Button>
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="py-8 border-t bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://kaancancalkan.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Kaan Can Calkan.
            </a>{" "}
            All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
