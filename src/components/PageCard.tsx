import React from 'react';
import { ArrowRight, Tag } from 'lucide-react';

interface PageCardProps {
  id: string;
  route: string;
  title: string;
  summary: string;
  tags: string[];
}

const PageCard: React.FC<PageCardProps> = ({ route, title, summary, tags }) => {
  return (
    <a
      href={route}
      className="group flex flex-col justify-between bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-300 ease-in-out"
    >
      <div className="p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">{title}</h2>
        <p className="text-sm text-slate-600 mb-4">{summary}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div key={tag} className="flex items-center bg-slate-100 rounded-full px-3 py-1 text-xs font-medium text-slate-700">
              <Tag className="w-3 h-3 mr-1.5" />
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 bg-slate-50 rounded-b-xl border-t border-slate-200 flex justify-end items-center">
        <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
          View Page
        </span>
        <ArrowRight className="w-4 h-4 ml-2 text-slate-500 group-hover:text-slate-900 group-hover:translate-x-1 transition-transform" />
      </div>
    </a>
  );
};

export default PageCard;
