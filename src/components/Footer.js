export default function Footer() {
  return (
    <footer className="w-full border-t bg-white dark:bg-black shadow-inner mt-8">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Savya Gupta. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
