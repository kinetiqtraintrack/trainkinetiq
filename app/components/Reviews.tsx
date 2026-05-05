import ReviewsSection from "./ReviewsSection";

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  product?: string;
  date?: string;
}

async function getReviews(): Promise<Review[]> {
  try {
    const data = await import("../../data/reviews.json");
    return data.default as Review[];
  } catch {
    return [];
  }
}

export default async function Reviews() {
  const reviews = await getReviews();

  return (
    <section className="bg-white px-6 py-14" id="reviews">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-8">
          <h2 className="text-[11px] font-black uppercase tracking-[0.22em] text-gray-400 mb-1">
            What People Say
          </h2>
          <p className="text-[clamp(1.6rem,4vw,2.4rem)] font-black tracking-tighter text-[#111] leading-tight uppercase">
            Reviews
          </p>
        </div>
        <ReviewsSection initialReviews={reviews} />
      </div>
    </section>
  );
}
