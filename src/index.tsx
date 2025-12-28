import React, { useState } from 'react';

interface FilesProps { onClose: () => void; }

interface FileItem { name: string; type: 'folder' | 'file'; size?: string; modified: string; }

const MOCK_FILES: FileItem[] = [
  { name: 'Documents', type: 'folder', modified: 'Dec 28, 2024' },
  { name: 'Downloads', type: 'folder', modified: 'Dec 28, 2024' },
  { name: 'Pictures', type: 'folder', modified: 'Dec 27, 2024' },
  { name: 'Music', type: 'folder', modified: 'Dec 25, 2024' },
  { name: 'readme.txt', type: 'file', size: '2 KB', modified: 'Dec 28, 2024' },
  { name: 'notes.md', type: 'file', size: '4 KB', modified: 'Dec 27, 2024' },
];

const Files: React.FC<FilesProps> = ({ onClose }) => {
  const [path, setPath] = useState('/home/guest');
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col bg-gray-100">
      <div className="bg-gray-200 border-b border-gray-300 p-2 flex items-center gap-4">
        <button className="p-2 hover:bg-gray-300 rounded">←</button>
        <button className="p-2 hover:bg-gray-300 rounded">→</button>
        <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-gray-600">{path}</div>
        <button onClick={() => setView(view === 'grid' ? 'list' : 'grid')} className="p-2 hover:bg-gray-300 rounded">
          {view === 'grid' ? '☰' : '⊞'}
        </button>
      </div>
      <div className="flex flex-1">
        <div className="w-48 bg-gray-200 border-r border-gray-300 p-2">
          <div className="space-y-1">
            {['Home', 'Desktop', 'Documents', 'Downloads', 'Pictures', 'Music'].map(item => (
              <button key={item} className="w-full text-left px-2 py-1 rounded hover:bg-gray-300 text-sm flex items-center gap-2">
                <span>{item === 'Home' ? '🏠' : '📁'}</span>{item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 p-4">
          {view === 'list' ? (
            <table className="w-full text-sm">
              <thead><tr className="text-left text-gray-500 border-b"><th className="pb-2">Name</th><th className="pb-2">Size</th><th className="pb-2">Modified</th></tr></thead>
              <tbody>
                {MOCK_FILES.map(file => (
                  <tr key={file.name} onClick={() => setSelected(file.name)} className={`hover:bg-blue-100 cursor-pointer ${selected === file.name ? 'bg-blue-200' : ''}`}>
                    <td className="py-2 flex items-center gap-2"><span>{file.type === 'folder' ? '📁' : '📄'}</span>{file.name}</td>
                    <td className="py-2 text-gray-500">{file.size || '--'}</td>
                    <td className="py-2 text-gray-500">{file.modified}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="grid grid-cols-6 gap-4">
              {MOCK_FILES.map(file => (
                <div key={file.name} onClick={() => setSelected(file.name)} className={`flex flex-col items-center p-4 rounded hover:bg-blue-100 cursor-pointer ${selected === file.name ? 'bg-blue-200' : ''}`}>
                  <span className="text-4xl mb-2">{file.type === 'folder' ? '📁' : '📄'}</span>
                  <span className="text-xs text-center truncate w-full">{file.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-200 border-t border-gray-300 p-2 text-xs text-gray-600">
        {MOCK_FILES.length} items
      </div>
    </div>
  );
};

export default Files;
