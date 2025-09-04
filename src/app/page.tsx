import React, { useState, useMemo } from 'react';
import { Search, LayoutGrid } from 'lucide-react';
import PageCard from '../components/PageCard';
import manifest from '../../.generated/pages.manifest.json';

interface PageMeta {
  id: string;
  route: string;
  title: string;
  summary: string;
  tags: string[];
}

const DashboardPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

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
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center bg-white rounded-full p-1 pr-4 shadow-sm border border-slate-200 mb-4">
            <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center mr-3">
              <LayoutGrid className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-slate-800">Viatable Component Gallery</h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A curated collection of React components and pages built with Tailwind CSS.
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
