import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import NewsArticleDetail from "@/src/components/news/NewsArticleDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <>
      <Header />
      <NewsArticleDetail articleId={id} />
      <Footer />
    </>
  );
}
