import ReviewForm from "./ReviewForm";

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  product?: string;
  date?: string;
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#111" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

async function getReviews(): Promise<Review[]> {
  try {
    // In production this hits the API; in static builds, we import directly
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10">
          {reviews.map((r) => (
            <div key={r.id} className="bg-[#f8f8f8] p-7">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <p className="text-[#111] text-sm leading-relaxed font-medium mb-5">
                &ldquo;{r.text}&rdquo;
              </p>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#111]">
                  {r.name}
                </span>
                {r.product && (
                  <span className="block text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                    {r.product}
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Review form card */}
          <ReviewForm />
        </div>

        {/* Rating summary */}
        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center gap-3">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <StarIcon key={i} />
            ))}
          </div>
          <span className="text-sm font-black text-[#111] tracking-tight">4.9</span>
          <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
            App Store · Early Access
          </span>
        </div>
      </div>
    </section>
  );
}
