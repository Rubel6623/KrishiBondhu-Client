"use client";

export default function SectionBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 transition-colors duration-500 ${className}`}>
      {/* Light Mode: Dark Creamy Base */}
      <div className="absolute inset-0 bg-cream-dark" />
      
      {/* Dark Mode: Hero Gradient */}
      <div className="absolute inset-0 opacity-0 dark:opacity-100 bg-gradient-to-br from-green-deep via-green-mid to-[#081e13] dark:from-[#05150d] dark:via-[#0a2415] dark:to-[#05150d] transition-opacity duration-500" />
    </div>
  );
}
