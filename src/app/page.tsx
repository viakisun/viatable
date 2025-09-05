import React, { useState, useMemo } from 'react';
import { Search, LayoutGrid } from 'lucide-react';
import PageCard from '../components/PageCard';

// The __PAGES_MANIFEST__ global is injected by Vite.
// We declare it here for TypeScript to recognize it.
declare const __PAGES_MANIFEST__: PageMeta[];

interface PageMeta {
  id: string;
  route: string;
  title: string;
  summary:string;
  tags: string[];
}

const DashboardPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Use the injected global variable
  const manifest = __PAGES_MANIFEST__;

  const filteredPages = useMemo(() => {
    if (!searchQuery) {
      return manifest;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return manifest.filter((page: PageMeta) =>
      page.title.toLowerCase().includes(lowerCaseQuery) ||
      page.summary.toLowerCase().includes(lowerCaseQuery) ||
      page.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
    );
  }, [searchQuery, manifest]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <header className="text-center mb-16">
          <div className="flex justify-center items-center mb-4">
            <LayoutGrid className="w-10 h-10 text-slate-800 mr-4" />
            <h1 className="text-5xl font-bold text-slate-900">
              Viatable Component Gallery
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A curated collection of all React components and pages for the Viatable QR ordering application.
          </p>
        </header>

        {/* Search Bar */}
        <div className="mb-10">
          <div className="relative max-w-lg mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search components by name, summary, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-full leading-5 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition"
            />
          </div>
        </div>

        {/* Page Grid */}
        {filteredPages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPages.map((page: PageMeta) => (
              <PageCard key={page.id} {...page} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-500">No components found for your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
