import type { Menu } from "@/types/menu"

const menuData: Menu[] = [
  {
    id: 1,
    title: "Jelajahi",
    newTab: false,
    submenu: [
      { id: 11, title: "About Us", path: "/about", newTab: false },
      { id: 12, title: "FAQ", path: "/faq", newTab: false },
      { id: 13, title: "Blog (Coming Soon)", path: "#", newTab: false },
      { id: 14, title: "Career (Coming Soon)", path: "#", newTab: false },
    ],
  },
  {
    id: 2,
    title: "Layanan",
    newTab: false,
    megaMenu: [
      {
        title: "Main Produk",
        items: [
          {
            id: 21,
            title: "Pembuatan Custom Website",
            path: "/layanan/custom-website",
            newTab: false,
            icon: "FiMonitor",
            desc: "Website sesuai kebutuhan dan bisnis Anda.",
          },
          {
            id: 22,
            title: "Desain Grafis",
            path: "/layanan/desain-grafis",
            newTab: false,
            icon: "FiPenTool",
            desc: "Desain visual profesional untuk branding.",
          },
          {
            id: 23,
            title: "SEO Specialist",
            path: "/layanan/seo-specialist",
            newTab: false,
            icon: "FiTrendingUp",
            desc: "Optimasi website agar mudah ditemukan di Google.",
          },
          {
            id: 24,
            title: "Social Media Management",
            path: "/layanan/social-media",
            newTab: false,
            icon: "FiShare2",
            desc: "Kelola dan tingkatkan performa media sosial Anda.",
          },
        ],
      },
      {
        title: "Sub Produk",
        items: [
          {
            id: 25,
            title: "Google Bisnis",
            path: "/layanan/google-bisnis",
            newTab: false,
            icon: "FiMapPin",
            desc: "Optimasi Google Bisnismu agar mudah ditemukan.",
          },
          {
            id: 26,
            title: "Company Profile Design",
            path: "/layanan/company-profile",
            newTab: false,
            icon: "FiFileText",
            desc: "Profil perusahaan yang menarik dan informatif.",
          },
        ],
      },
      {
        title: "Others",
        items: [
          {
            id: 27,
            title: "Corporate Branding",
            path: "/layanan/corporate-branding",
            newTab: false,
            icon: "FiBriefcase",
            desc: "Bangun identitas merek perusahaan Anda.",
          },
          {
            id: 28,
            title: "Tech Support",
            path: "/layanan/tech-support",
            newTab: false,
            icon: "FiHeadphones",
            desc: "Bantuan teknis untuk kelancaran bisnis Anda.",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Harga",
    path: "/products",
    newTab: false,
  },
  {
    id: 4,
    title: "Portofolio",
    path: "/portofolio",
    newTab: false,
  },
  {
    id: 5,
    title: "How to Order",
    path: "/how-to-order",
    newTab: false,
  },
  {
    id: 6,
    title: "Contact Us",
    path: "/contact",
    newTab: false,
  },
]
export default menuData
