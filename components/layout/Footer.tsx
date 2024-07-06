import React from 'react'

export const Footer = () => {
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
      <p>
        Powered by &nbsp;
        <a
          href="https://frian.tistory.com/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Gyeom
        </a>
      </p>
    </footer>
  )
}
