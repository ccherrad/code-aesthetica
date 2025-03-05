
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, CopyIcon } from 'lucide-react';

interface CodeFrameProps {
  code: string;
  language: string;
}

export const CodeFrame = ({ code, language }: CodeFrameProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 flex space-x-2">
        <div className="text-xs text-museum-caption px-2 py-1 bg-museum-subtle rounded-md">
          {language}
        </div>
        <motion.button 
          onClick={copyToClipboard}
          className="p-1 rounded-md bg-museum-subtle text-museum-accent hover:text-museum-foreground transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
        </motion.button>
      </div>
      <pre className="code-display text-sm mt-6">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeFrame;
