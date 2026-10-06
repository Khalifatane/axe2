const testimonials = [
  { name: 'Jessica T.', text: 'Our conversion rates jumped 35% after launching the new UI. The mobile-first approach was exactly what we needed.', avatar: '/images/photo-1492562080023-ab3db95bfbce.png' },
  { name: 'Lucas K.', text: 'From the first meeting to launch day, the process was professional and stress-free. The Preline components gave us a sleek, modern look.', avatar: '/images/photo-1531927557220-a9e23c1e4794.png' },
  { name: 'Ava M.', text: 'Working with this team was seamless. They took our vision and turned it into a responsive, beautiful site in record time.', avatar: '/images/photo-1541101767792-f9b2b1c4f127.png' },
  { name: 'Liam R.', text: 'Their understanding of design systems and attention to detail is top-notch. Our new site is faster and looks amazing on every device.', avatar: '/images/photo-1568048689711-5e0325cea8c0.png' },
  { name: 'Michael Davis', text: "I was impressed with the Preline UI team's ability to understand my needs and deliver high-quality work quickly.", avatar: '/images/photo-1568602471122-7832951cc4c5.png' },
  { name: 'Christina N.', text: "They built a fully custom UI that loads quickly and scales effortlessly. We've already recommended them to two other startups.", avatar: '/images/photo-1570654639102-bdd95efeca7a.png' },
  { name: 'Helen Y.', text: 'As a developer, I appreciated how clean and reusable the codebase was. Preline made it easy to hand off to our internal team.', avatar: '/images/photo-1601935111741-ae98b2b230b0.png' },
  { name: 'Daniel N.', text: 'We needed fast, flexible frontend and they delivered. Preline was the perfect fit for our growing platform.', avatar: '/images/photo-1659482634023-2c4fda99ac0c.png' },
];

export default function SlidingTestimonials() {
  const firstRow = testimonials.slice(0, 4);
  const secondRow = testimonials.slice(4);

  const renderRow = (row: typeof testimonials, reverse = false) => (
    <div className={`flex w-max gap-4 ${reverse ? 'animate-[testimonials-reverse_40s_linear_infinite]' : 'animate-[testimonials-marquee_40s_linear_infinite]'}`}>
      {[...row, ...row].map((testimonial, index) => (
        <article key={`${testimonial.name}-${index}`} className="h-[200px] w-[400px] shrink-0 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center gap-4">
            <img className="size-11 rounded-full object-cover" src={testimonial.avatar} alt="" />
            <p className="text-lg font-semibold text-gray-800 dark:text-neutral-200">{testimonial.name}</p>
          </div>
          <p className="mt-6 text-base leading-8 text-gray-500 dark:text-neutral-400">{testimonial.text}</p>
        </article>
      ))}
    </div>
  );

  return (
    <section className="relative w-full overflow-hidden bg-white py-10 dark:bg-neutral-950" aria-label="Testimonials">
      <div className="space-y-4">
        {renderRow(firstRow)}
        {renderRow(secondRow, true)}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent dark:from-neutral-950" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent dark:from-neutral-950" />
      <style>{`@keyframes testimonials-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } @keyframes testimonials-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }`}</style>
    </section>
  );
}
