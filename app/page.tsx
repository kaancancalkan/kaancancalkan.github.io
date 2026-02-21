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
    certificate?: {
      name: string;
      url: string;
    };
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
    heroSubtitle: "ERP Consultant And Business Analyst - SAP HR & Abap & Fiori",
    heroDescription:"As a Management Information Systems graduate from Sakarya University, I have 3 years of experience in SAP HCM, ABAP, and Fiori. Alongside my expertise in SAP, I have a background in freelance web development and a proven track record in optimizing customer service operations through knowledge base creation and process improvement. I aim to leverage my technical background and analytical skills in roles such as Business Analyst, ERP Consultant, or Customer Experience Specialist.",
    downloadResume: "Download my resume",
    sendEmail: "Send me a mail",
    findMeOn: "Find Me On",
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
        institution: "Sakarya University (2017-2020) Graduated",
        period: "2017-2020",
        description: "My GPA is 3.18/4.",
      },
      {
        title: "Management Information Systems",
        institution: "Istanbul Medipol University (2016-2017)",
        period: "2016-2017",
        description: "I made an undergraduate transfer to Sakarya University.",
      },
      {
        title: "Social Sciences High School",
        institution:
          "Denizli Ibrahim Cinkaya Social Sciences High School (2011-2016) Graduation June 2016",
        period: "2011-2016",
        description:
          "I completed one year of compulsory English preparatory training.",
      },
    ],
    workEntries: [
      {
        company: "Bulutfon Telecommunications",
        position: "Customer Relationship Specialist",
        period: "Sep 2025 - Dec 2025",
        description:
          "I provided customer support through ticketing systems and phone calls, resolving issues efficiently and professionally. I also contributed to the creation and maintenance of the knowledge base and FAQ pages to enhance customer self-service and reduce support demand. I performed necessary backlink work in the SEO field, analyzed competitor companies, and improved our company's SEO performance.",
      },
      {
        company: "Smod Business Solutions",
        position: "SAP ABAP & Fiori Consultant (Feb 2024 - July 2024)",
        period: "Feb 2024 - July 2024",
        description:
          "I worked as a SAP ABAP and Fiori Consultant in SMOD Business Solutions (SAP HR Service Provider).",
      },
      {
        company: "Athena Information Services",
        position: "Oracle HR Cloud Technical Consultant (Nov 2023 - Jan 2024)",
        period: "Nov 2023 - Jan 2024",
        description:
          "I worked as an Oracle HR Cloud Technical Consultant at Athena Information Services. I wrote SQL queries and used BI tools.",
      },
      {
        company: "Mbis Consulting",
        position: "SAP HCM Consultant (Jan 2021 - July 2023)",
        period: "Jan 2021 - July 2023",
        description:
          "I worked on the SAP HCM module at MBIS Consultancy Services.",
      },
      {
        company: "Ömer Hazıroglu",
        position: "SAP Fiori Consultant (Jan 2023 - July 2023)",
        period: "Jan 2023 - July 2023",
        description:
          "I received Fiori consultancy training from Ömer Hazıroğlu. During this process, I implemented screen designs in the Enerya project. At the same time, I observed the process of writing ABAP services.",
      },
      {
        company: "Seyit Usta Trailer",
        position: "Intern (Feb 2020 - Apr 2020)",
        period: "Feb 2020 - Apr 2020",
        description:
          "I worked on website translations and mobile interface optimizations in WordPress. I also conducted time studies inside the factory. My internship ended due to Covid-19.",
      },
      {
        company: "Freelance Web & Wordpress Developer",
        position: "(Apr 2019 - Jan 2021)",
        period: "Apr 2019 - Jan 2021",
        description:
          "I started my web career with Wix and continued on WordPress, which I learned during my internship. I also designed static web pages with HTML, CSS, and JS.",
      },
    ],
    projectEntries: [
      {
        company: "Support Tickets",
        position: "SAP HCM ABAP & Fiori Consultant",
        description:
          "I made front-end and back-end developments in Istac, Sedef Ship, and THY. I resolved support requests from customers.",
      },
      {
        company: "Lesaffre",
        position: "SAP HCM ABAP & Fiori Consultant",
        description:
          "I solved back-end and front-end bugs, made improvements, and organized local and virtual meetings with customers to analyze their processes and business needs. I also provided SAP HR training.",
      },
      {
        company: "Taha LC Waikiki",
        position: "SAP HCM Fiori Consultant",
        description:
          "I implemented the front-end side of the Annual Leave Plan Application, fixed some back-end bugs, added an approver page, and completed SAP Fiori development configuration.",
      },
      {
        company: "Air Ties",
        position: "Oracle Technical Consultant",
        description: "I worked on vacation queries in the Air Ties project.",
      },
      {
        company: "Kahve Dünyası",
        position: "Oracle Technical Consultant",
        description:
          "As the technical responsible for the Kahve Dünyası Project, I participated in online and local meetings and resolved customer support tickets.",
      },
      {
        company: "Enerya",
        position: "Junior SAP Fiori Consultant",
        description:
          "I coded the website panel, designed Fiori screens, and bound oData to tables with a filter bar.",
      },
      {
        company: "TOGG Turkish national car",
        position: "Junior SAP HCM Consultant",
        description:
          "I tested the Fiori screens of the travel management system and resolved bugs together with ABAP and Fiori developers.",
      },
      {
        company: "Zen Diamond",
        position: "Junior SAP HCM Consultant",
        description:
          "I prepared LSMW templates for customers, provided post-go-live migration support, wrote specifications for additional developments, and tested ABAP improvements with the technical advisor.",
      },
      {
        company: "Ozler Plastic",
        position: "Junior SAP HCM Consultant",
        description:
          "I performed payroll tests, adapted the 'Çarşaf İcmal' payroll summary, assisted customers with master data transfer, tested ABAP programs, and provided SAP HCM training.",
      },
      {
        company: "ALY Food",
        position: "Junior SAP HCM Consultant",
        description:
          "I performed payroll tests, adapted the payroll envelope, worked on salary adaptations, and supported customers with master data transfer.",
      },
      {
        company: "Camsan Entegre",
        position: "SAP HCM Consultant",
        description:
          "I conducted payroll tests, provided SAP HCM training in local meetings, and implemented customizations.",
      },
      {
        company: "Istanbul Finance Center",
        position: "SAP HCM Consultant",
        description:
          "I made customizations on the Travel Management Module and tested Fiori screens.",
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
        certificate: {
          name: "Level 5 Diploma in Teaching English as a Foreign Language (TEFL) (Premier TEFL)",
          url: "/CanCalkan%20TEFL.pdf"
        }
      },
      { name: "Vietnamese", level: "Starter", percentage: 10 },
    ],
    interestsList: [
      {
        title: "Movies",
        description:
          "As the child of a cinema-loving father, I was captivated by cinema at an early age. You can see the movies I have watched from the link below.",
        link: "https://trakt.tv/users/kaancalkan/history",
      },
      {
        title: "Weight Lifting",
        description:
          "After 24 years of inactivity, I started going to the gym and lifting weights. It has now become a lifestyle for me. You can see my weightlifting stats from the link below.",
        link: "https://kaancancalkan.github.io/My-Weights/",
      },
      {
        title: "Books",
        description:
          "Reading has become an important part of my life, especially since Social Sciences High School. I enjoy books on sociology, philosophy, and history. My favorite genre is dystopia. If you want to see the books I read, check the link below.",
        link: "https://1000kitap.com/Never119",
      },
      {
        title: "Technological Devices",
        description:
          "I have had a great interest in the software and hardware of technological devices ever since I first started using computers.",
      },
    ],
    title: "Kaan Can Calkan",
    subtitle: "SAP HR & ABAP & Fiori Consultant",
  },

  tr: {
    heroTitle: "Merhaba Ben Kaan Can Calkan",
    heroSubtitle:
      "ERP Danışmanı ve İş Analisti - SAP HR & Abap & Fiori Danışmanıyım",
    heroDescription:"Sakarya Üniversitesi Yönetim Bilişim Sistemleri mezunuyum. 3 yıllık SAP HCM, ABAP ve Fiori deneyimime ek olarak, freelance web geliştirme projeleriyle teknik dikeyde yetkinlik kazandım. Müşteri hizmetleri süreçlerinde çözüm odaklı stratejiler geliştirerek bilgi tabanı ve süreç dökümantasyonu çalışmalarını yürüttüm. Teknik birikimimi iş süreçleriyle harmanlayarak; İş Analisti, ERP Danışmanı veya Müşteri Hizmetleri alanlarında değer katmayı hedefliyorum.",
    downloadResume: "Özgeçmişimi İndirin",
    sendEmail: "Bana e posta atın",
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
        institution: "Sakarya Üniversitesi (2017-2020) Mezun Oldum",
        period: "2017-2020",
        description: "Ortalamam 3.18/4.",
      },
      {
        title: "Yönetim Bilişim Sistemleri",
        institution: "İstanbul Medipol Üniversitesi (2016-2017)",
        period: "2016-2017",
        description: "Sakarya Üniversitesi'ne yatay geçiş yaptım.",
      },
      {
        title: "Sosyal Bilimler Lisesi",
        institution:
          "Denizli İbrahim Cinkaya Sosyal Bilimler Lisesi(2011-2016) Temmuz 2016 Mezuniyet",
        period: "2011-2016",
        description: "1 sene zorunlu İngilizce Hazırlık eğitimi aldım",
      },
    ],
    workEntries: [
      {
        company: "Bulutfon Telekomünikasyon",
        position: "Müşteri İlişkileri Uzmanı",
        period: "Eylül 2025 - Aralık 2025",
        description:
          "Müşteri destek süreçlerinde çağrılar ve talep sistemleri üzerinden etkin çözümler sundum. Ayrıca bilgi tabanı ve SSS (Sıkça Sorulan Sorular) sayfalarının oluşturulması ve güncellenmesine katkı sağladım, böylece müşteri deneyimini iyileştirdim ve destek yükünü azalttım. Seo alanında gerekli Backlink çalışmalarını yapıp rakip firmaları analiz edip firmamızın Seo performansını arttırdım.",
      },
      {
        company: "Smod İş Çözümleri",
        position: "SAP Abap Fiori Danışmanı (Şubat 2024 - Temmuz 2024)",
        period: "Şubat 2024 - Temmuz 2024",
        description:
          "SMOD Busıness Solutions (Sap HR Servis Sağlayıcısı ) bünyesinde Sap Abap ve Fiori Danışmanı olarak çalıştım.",
      },
      {
        company: "Athena Information Services",
        position: "Oracle HR Cloud Teknik Danışmanı (Kasım 2023 - Ocak 2024)",
        period: "Kasım 2023 - Ocak 2024",
        description:
          "Athena Bilişim Çözümlerinde Oracle HR Cloud Teknik Danışmanı olarak çalıştım. SQL sorguları ve iş zekası araçları ile raporlar hazırladım.",
      },
      {
        company: "Mbis Danışmanlık",
        position: "Sap HCM Danışmanı (Ocak 2021- Temmuz 2023)",
        period: "Ocak 2021 - Temmuz 2023",
        description: "Mbis Danışmanlıkta Sap HCM modülünde çalıştım.",
      },
      {
        company: "Ömer Hazıroğlu",
        position: "Sap Fiori Danışmanı (Ocak 2023- Temmuz 2023)",
        period: "Ocak 2023 - Temmuz 2023",
        description:
          "Ömer Hazıroğlu'dan Fiori danışmanlık eğitimi aldım. Bu süreçte Enerya projesinde ekran tasarımlarını gerçekleştirdim. Aynı zamanda Abap servislerinin yazım sürecini de gözlemledim",
      },
      {
        company: "Seyit Usta Treyler",
        position: "Stajyer (Şubat-Nisan 2020)",
        period: "Şubat 2020 - Nisan 2020",
        description:
          "WordPress'te web sitesi çevirileri, mobil arayüz optimizasyonları yaptım. Stajım Covid-19 salgını sebebiyle erken bitti.",
      },
      {
        company: "Freelance Web & Wordpress Geliştirici",
        position: "(Nisan 2019 -Ocak 2021)",
        period: "Nisan 2019 - Ocak 2021",
        description:
          "Web kariyerime Wix ile başladım ve stajımda öğrendiğim wordpress ile devam ettim. HTML CSS ve JS ile statik web sayfaları da tasarladım.",
      },
    ],
    projectEntries: [
      {
        company: "Destek Talepleri",
        position: "Sap HCM Abap & Fiori Danışmanı",
        description:
          "İstaç,Sedef Gemi, THY'de Front end ve Backend geliştirmeleri yaptım. Müşteriden gelen destek taleplerini çözdüm.",
      },
      {
        company: "Lesaffre",
        position: "Sap HCM Abap & Fiori Danışmanı",
        description:
          "Back-end ve front-end hatalarını çözdüm, Front-end ve Back-end'de bazı geliştirmeler yaptım. Müşterilerle yerel ve sanal toplantılar düzenleyerek süreçlerini ve iş ihtiyaçlarını analiz ettim ve onlara SAP HR eğitimi verdim.",
      },
      {
        company: "Taha LC Waikiki",
        position: "Sap HCM Fiori Danışmanı",
        description:
          "Yıllık izin planlama uygulamasının ön yüzünü implemente ettim. Bazı backend hatalarını çözdüm. Onaycı ekranını tasarladım ve SAP Fiori Developmentini gerçekleştirdim.",
      },
      {
        company: "Air Ties",
        position: "Oracle Teknik Danışmanı",
        description: "Air Ties projesinde izin sorguları üzerine çalıştım.",
      },
      {
        company: "Kahve Dünyası",
        position: "Oracle Teknik Danışmanı",
        description:
          "Kahve Dünyası Projesinde teknik sorumlu olarak online ve lokaldeki toplantılara katıldım. Müşterilerden gelen destek ticketlarını çözümledim.",
      },
      {
        company: "Enerya",
        position: "Junior Sap Fiori Danışmanı",
        description:
          "Web Terminal giriş ekranını tasarladım. Fiori ekran tasarımlarını gerçekleştirdim. Sap'den gelen verileri Filterbar ile Tablolara bağladım.",
      },
      {
        company: "TOGG Türkiye'nin Yerli Otomobili",
        position: "Junior Sap HCM Danışmanı",
        description:
          "Projedeki seyahat yönetim sisteminin fiori ekranlarını test ettim. Bulduğum hataları Abap ve Fiori Developerlar ile birlikte çözümledim.",
      },
      {
        company: "Zen Pırlanta",
        position: "Junior Sap HCM Danışmanı",
        description:
          "Müşterilerin kullanacağı LSMW şablonlarını hazırladım. Müşterilere canlı geçiş sonrası desteği verdim. Ek geliştirmelerin Spec dökümanlarını oluşturdum. Abap geliştirmelerini test edip hataları teknik danışman ile birlikte çözdük.",
      },
      {
        company: "Özler Plastik",
        position: "Junior Sap HCM Danışmanı",
        description:
          "Bordro testlerini gerçekleştirdim. Çarsaf icmal uyarlamasını gerçekleştirdim. Müşterilere ana veri aktarımı konusunda hizmet verdim. Abap programlarını test edip bulduğum bugları Abapçılar ile çözdüm. Müşteri eğitimlerini lokasyonda gerçekleştirdim.",
      },
      {
        company: "Aksular Gıda",
        position: "Junior Sap HCM Danışmanı",
        description:
          "Bordro testlerini gerçekleştirdim. Bordro zarfı uyarlaması yaptım.Ücret uyarlamaları üzerine çalıştım. Ana veri aktarımında müşteriye destek verdim.",
      },
      {
        company: "Camsan Entegre",
        position: "Sap HCM Danışmanı",
        description:
          "Bordro testlerini gerçekleştirdim. Uyarlamaları gerçekleştirdim. Müşterilere lokasyonda eğitimler verdim.",
      },
      {
        company: "İstanbul Finans Merkezi",
        position: "Sap HCM Danışmanı",
        description:
          "Seyahat Masraf Modülü uyarlamalarını gerçekleştirdim. .Fiori testlerini gerçekleştirdim.",
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
        certificate: {
          name: "Yabancı Dil Olarak İngilizce Öğretimi (TEFL) Seviye 5 Diploması (Premier TEFL)",
          url: "/CanCalkan%20TEFL.pdf"
        }
      },
      { name: "Vietnamca", level: "Başlangıç", percentage: 10 },
    ],
    interestsList: [
      {
        title: "Filmler",
        description:
          "Sinema sever bir babanın oğlu olarak erken yaşta sinemanın büyüsüne kapıldım, izlediğim filmleri aşağıdaki bağlantıdan görebilirsiniz.",
        link: "https://trakt.tv/users/kaancalkan/history",
      },
      {
        title: "Ağırlık Kaldırma",
        description:
          "Hareketsiz geçirdiğim 24 yılın ardından spor salonuna gidip ağırlık kaldırmaya başladım. Ve bunu bir yaşam tarzı haline getirdim. Ağırlık kaldırma istatistiklerimi aşağıdaki linkten görebilirsiniz.",
        link: "https://kaancancalkan.github.io/My-Weights/",
      },
      {
        title: "Kitaplar",
        description:
          "Okumak, özellikle Sosyal Bilimler Lisesine başladıktan sonra hayatımın bir parçası haline geldi.Sosyoloji, felsefe ve tarih kitaplarını okumayı çok seviyorum, En sevdiğim tür distopya. Okuduğum kitapları görmek isterseniz aşağıdaki bağlantıya göz atabilirsiniz.",
        link: "https://1000kitap.com/Never119",
      },
      {
        title: "Teknolojik Cihazlar",
        description:
          "Bilgisayarla ilk tanıştığım zamandan beri teknolojik cihazların yazılım ve donanımlarına büyük ilgi duydum.",
      },
    ],
    title: "Kaan Can Calkan",
    subtitle: "SAP HR & ABAP & Fiori Consultant",
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
        company: "Bulutfon Telecommunications",
        position: "Chuyên viên Quan hệ Khách hàng",
        period: "Tháng 9 năm 2025 – Tháng 12 năm 2025",
        description:
          "Tôi đã hỗ trợ khách hàng thông qua hệ thống xử lý yêu cầu và các cuộc gọi, giải quyết vấn đề một cách hiệu quả và chuyên nghiệp. Tôi cũng đã đóng góp vào việc xây dựng và duy trì cơ sở kiến thức cùng trang Câu hỏi thường gặp (FAQ), giúp khách hàng tự phục vụ tốt hơn và giảm tải cho bộ phận hỗ trợ. Tôi đã thực hiện các công việc backlink cần thiết trong lĩnh vực SEO, phân tích các công ty đối thủ và cải thiện hiệu suất SEO của công ty chúng tôi.",
      },
      {
        company: "Smod Business Solutions",
        position:
          "Chuyên viên tư vấn SAP Abap Fiori (Tháng 2 2024 - Tháng 7 2024)",
        period: "Tháng 2 2024 - Tháng 7 2024",
        description:
          "Tôi đã làm việc với tư cách là Chuyên viên tư vấn Sap Abap và Fiori tại SMOD Business Solutions (Nhà cung cấp dịch vụ Sap HR).",
      },
      {
        company: "Athena Information Services",
        position:
          "Chuyên viên tư vấn Kỹ thuật Oracle HR Cloud (Tháng 11 2023 - Tháng 1 2024)",
        period: "Tháng 11 2023 - Tháng 1 2024",
        description:
          "Tôi đã làm việc với tư cách là Chuyên viên tư vấn Kỹ thuật Oracle HR Cloud tại Athena Information Services. Tôi đã viết các truy vấn SQL và sử dụng các công cụ BI.",
      },
      {
        company: "Mbis Consulting",
        position: "Chuyên viên tư vấn Sap HCM (Tháng 1 2021 - Tháng 7 2023)",
        period: "Tháng 1 2021 - Tháng 7 2023",
        description:
          "Tôi đã làm việc trên mô-đun Sap HCM tại Dịch vụ Tư vấn Mbis.",
      },
      {
        company: "Ömer Hazıroglu",
        position: "Chuyên viên tư vấn Sap Fiori (Tháng 1 2023 - Tháng 7 2023)",
        period: "Tháng 1 2023 - Tháng 7 2023",
        description:
          "Tôi đã nhận được đào tạo tư vấn Fiori từ Ömer Hazıroğlu. Trong quá trình này, tôi đã thực hiện các thiết kế màn hình trong dự án Enerya. Đồng thời, tôi đã quan sát quá trình viết các dịch vụ Abap",
      },
      {
        company: "Seyit Usta Trailer",
        position: "Thực tập sinh (Tháng 2 - Tháng 4 2020)",
        period: "Tháng 2 2020 - Tháng 4 2020",
        description:
          "Tôi đã làm việc về dịch thuật trang web và tối ưu hóa giao diện di động trên WordPress. Tôi cũng đã thực hiện một số nghiên cứu thời gian bên trong nhà máy. Kỳ thực tập của tôi đã kết thúc sau khi Covid-19 xảy ra.",
      },
      {
        company: "Nhà phát triển Web & Wordpress Tự do",
        position: "(Tháng 4 2019 - Tháng 1 2021)",
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
        certificate: {
          name: "Chứng chỉ Giảng dạy Tiếng Anh như Ngoại ngữ (TEFL) Cấp độ 5 (Premier TEFL)",
          url: "/CanCalkan%20TEFL.pdf"
        }
      },
      { name: "Tiếng Việt", level: "Mới bắt đầu", percentage: 10 },
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
      en: "Modern e-commerce website demo .",
      tr: "Modern e ticaret web sitesi demosu",
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
      en: "Website introducing the photo gallery of a cute cat named Hades.",
      tr: "Hades adlı tatlı kedinin fotoğraf galerisi",
      vi: "Trang giới thiệu cho dự án sáng tạo Hades.",
    },
    link: "https://hadess.netlify.app/",
  },
  {
    title: {
      en: "Vietnam Culture",
      tr: "Vietnam Kültürü",
      vi: "Văn hóa Việt Nam",
    },
    category: "website",
    image: "/ho-chi-minh-portrait.png",
    description: {
      en: "Website introducing Vietnamese culture.",
      tr: "Vietnam kültürünü anlatmak ",
      vi: "Trang giới thiệu cho dự án sáng tạo Hades.",
    },
    link: "https://vietnamculture.netlify.app/",
  },
  // {
  //   title: {
  //     en: "FitTrack",
  //     tr: "FitTrack",
  //     vi: "FitTrack",
  //   },
  //   category: "webapp",
  //   image: "/fittrack.jpg",
  //   description: {
  //     en: "Fitness tracking web app for daily workouts.",
  //     tr: "Günlük antrenmanlar için fitness takip uygulaması.",
  //     vi: "Ứng dụng web theo dõi tập luyện thể dục hằng ngày.",
  //   },
  //   link: "https://fittrackkaancancalkan.netlify.app/",
  // },
  {
    title: {
      en: "Vietnam SAP Consulting",
      tr: "Vietnam SAP Danışmanlığı",
      vi: "Tư vấn SAP tại Việt Nam",
    },
    category: "website",
    image: "/vietnamsap.jpg",
    description: {
      en: "Personal website created during my SAP consulting job search in Vietnam.",
      tr: "Vietnam’daki SAP danışmanlığı iş arama sürecimde oluşturduğum kişisel web sitesi.",
      vi: "Trang web cá nhân được tạo trong quá trình tìm việc tư vấn SAP tại Việt Nam.",
    },
    link: "https://kaancancalkanvietnam.netlify.app/",
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
      en: "Vietnamese word  learning platform based on flashcards. and my own Vietnamese learning journey.",
      tr: "Kendi Vietnamca öğrenme yolculuğuma ve flashcard tabanlı Vietnamca kelime öğrenme platformu.",
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
      en: "CodeGrowBloom",
      tr: "CodeGrowBloom",
      vi: "CodeGrowBloom",
    },
    category: "education",
    image: "/seedgame.png",
    description: {
      en: "Vietnamese language and coding learning platform by letting users plant virtual seeds that grow as they complete lessons and exercises.",
      tr: "Kullanıcıların dersleri ve alıştırmaları tamamladıkça büyüyen sanal tohumlar dikmelerine izin vererek Vietnamca ve kodlama öğrenme platformu.",
      vi: "Nền tảng học tiếng Việt và lập trình bằng cách cho phép người dùng trồng hạt giống ảo phát triển khi họ hoàn thành các bài học và bài tập.",
    },
    link: "https://learnenglishwithcat.netlify.app/",
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
    link: "https://kaancancalkancodegrowbloom.netlify.app/",
  },
    {
    title: {
      en: "CodeTemple",
      tr: "CodeTemple",
      vi: "CodeTemple",
    },
    category: "education",
    image: "/templecode.png",
    description: {
      en: "Platform planning to teach coding by having users complete coding tasks in Vietnamese temples.",
      tr: "Kullanıcıların Vietnam tapınaklarında kodlama görevlerini yaparak kodlama öğretmeyi planlayan bir platform",
      vi: "Nền tảng dự định dạy lập trình bằng cách để người dùng hoàn thành các nhiệm vụ lập trình trong các ngôi đền Việt Nam.",
    },
    link: "https://kaancancalkancodetemple.netlify.app/",
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
            {t.workEntries.map((work, index) => (
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
                  {lang.certificate && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <a 
                        href={lang.certificate.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-foreground hover:opacity-80 hover:underline transition-all flex items-start gap-2"
                      >
                        <FileText className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{lang.certificate.name}</span>
                      </a>
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
