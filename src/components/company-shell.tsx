import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";

const tokenPattern = /(\/\/[^\n]*|'[^']*'|\$\w+|\b(?:namespace|foreach|as)\b|\b(?:Platform|build|integrate|engineer|deliver)\b|<\?php)/g;

function ColoredLine({ text }: { text: string }) {
  return text.split(tokenPattern).map((token, index) => {
    const color = token.startsWith("//") ? "text-code-comment"
      : token.startsWith("'") ? "text-code-string"
      : token.startsWith("$") ? "text-code-variable"
      : /^(namespace|foreach|as|<\?php)$/.test(token) ? "text-code-keyword"
      : /^(Platform|build|integrate|engineer|deliver)$/.test(token) ? "text-code-function"
      : "text-muted-foreground";
    return <span key={index} className={color}>{token}</span>;
  });
}

export function CompanyShell({ code }: { code: string }) {
  const [length, setLength] = useState(6);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout>;
    let position = 6;
    const type = () => {
      if (preference.matches) {
        setLength(code.length);
        return;
      }
      position = position >= code.length ? 6 : position + 1;
      setLength(position);
      timer = setTimeout(type, position === code.length ? 5000 : 28);
    };
    timer = setTimeout(type, 350);
    return () => clearTimeout(timer);
  }, [code]);

  const lines = code.slice(0, length).split("\n");
  return (
    <div className="mx-auto mt-9 w-full max-w-4xl text-left">
      <div className="flex items-center justify-between gap-4 border-y border-border/60 py-3 font-mono text-[11px] text-muted-foreground sm:text-xs">
        <span className="flex items-center gap-2"><Terminal className="size-4 text-primary" /> pandatechs / engineering.php</span>
        <span className="hidden sm:block">PHP · Laravel</span>
      </div>
      <div className="h-[300px] overflow-hidden py-5 font-mono text-[10px] leading-5 sm:text-sm" aria-hidden="true">
        {lines.map((line, index) => (
          <div key={index} className="flex min-h-5">
            <span className="w-8 shrink-0 select-none text-right text-code-comment/60 sm:w-10">{String(index + 1).padStart(2, "0")}</span>
            <pre className="ml-4 whitespace-pre-wrap break-words sm:ml-6"><ColoredLine text={line} />{index === lines.length - 1 && <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse-dot bg-primary align-middle motion-reduce:animate-none sm:h-4 sm:w-2" />}</pre>
          </div>
        ))}
      </div>
      <span className="sr-only">Pandatechs engineering: websites, POS, school, hospital and financial systems with bank and currency API integrations.</span>
    </div>
  );
}