import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
      <p>
        Powered by &nbsp;
        <a
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Gyeom
        </a>
      </p>
    </footer>
  );
}
