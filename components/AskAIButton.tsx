"use client";

interface AskAIButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function AskAIButton({ className, children }: AskAIButtonProps) {
  const handleClick = () => {
    window.dispatchEvent(new Event("openChat"));
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
