import Script from 'next/script';

export default function MiniTestimonial() {
  return (
    <blockquote className="max-w-3xl mx-auto text-center px-4 py-12">
      <div className="flex items-center before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200 before:me-6 after:ms-6 dark:before:border-neutral-700 dark:after:border-neutral-700">
        <span className="mx-5 font-serif text-2xl italic text-gray-800 dark:text-white">proverbes</span>
      </div>

      <p id="wolof-french-proverb" className="mt-6 whitespace-pre-line text-gray-800 dark:text-white sm:text-xl">
        Hasawân ây nà ci soj
        {'\n'}Le basilic (plante) est mauvais pour le rhume (le guérit)
      </p>

      <footer className="mt-6">
        <div className="text-sm text-gray-500 dark:text-neutral-400">Dictionnaire des proverbes wolof, Kobès Abiven</div>
      </footer>

      <Script src="/rotate-proverbs.js" strategy="afterInteractive" />
    </blockquote>
  );
}
