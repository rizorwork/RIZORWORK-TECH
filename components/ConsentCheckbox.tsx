import React from 'react';

interface Props {
  id: string;
  text: string;
  checked: boolean;
  onChange: (id: string, checked: boolean) => void;
}

export const ConsentCheckbox: React.FC<Props> = ({ id, text, checked, onChange }) => {
  return (
    <div className="flex items-start space-x-3 py-2">
      <div className="flex items-center h-6">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(id, e.target.checked)}
          className="h-5 w-5 text-teal-600 focus:ring-teal-500 border-gray-300 rounded cursor-pointer"
        />
      </div>
      <div className="flex-1 text-sm text-gray-700">
        <label htmlFor={id} className="font-medium cursor-pointer select-none">
          {text}
        </label>
      </div>
    </div>
  );
};
