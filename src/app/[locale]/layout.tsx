import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "../../styles/index.css";
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { Providers } from "./providers";
import { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CartProvider } from "@/components/Cart/CartContext";

export async function generateMetadata({params}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: {
      template: "%s | Genfity Digital Solutions",
      default: t("title"),
    },
    description:
      "Transform your business with advanced IoT solutions, AI-powered tools, and tailored SaaS products like HRM, HMS, CRM, ERP, and CMS. Based in Nalloorkonam, Arumanai, Kanyakumari, Tamil Nadu, India, we deliver innovative tech solutions globally. Leverage our EdgeTeam for dedicated tech experts and OAAS for end-to-end operational support. Partner with the best AI, IoT, and software solution providers to enhance business efficiency and achieve seamless growth",
    metadataBase: new URL("https://genfity.com"),
    openGraph: {
      type: "website",
      url: "https://genffity.com",
      title: "Genfity Digital Solutions",
      description:
        "AI solutions for streamlined operations, enhanced decisions, and scalable growth. We unlock your full potential with intelligent automation and data-driven insights",
      siteName: "Genfity",
      images: [
        {
          url: "https://k0wq6pnnph6kt8et.public.blob.vercel-storage.com/aahrbitx/aahrbitx_meta_images-DeG1eHIDn5ppeJXCaQgZV6zOPzRaqX.png",
        },
      ],
    },
  }
};

export const revalidate = 60;

const inter = Inter({ subsets: ["latin"] });

export default async function LocaleLayout({children, params}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return (
    <html suppressHydrationWarning lang={locale}>
      <body className={`bg-white dark:bg-black ${inter.className}`}>
        <Providers>

            <CartProvider>
              <NextIntlClientProvider locale={locale}>
                <Header />
                {children}
                <Footer />
                <ScrollToTop />
              </NextIntlClientProvider>
            </CartProvider>

        </Providers>
      </body>
    </html>
  );
}



